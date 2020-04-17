from lxml import etree
import time, random
from Diver.driver import Driver
from Config.settings import Settings
from Utils.url_dupefilter import UrlDupefilter
from DB.data_store import DataStore
from Utils.data_process import DataProcess
from log.log import Log
from copy import deepcopy
import threading

# 多线程封装
class LagouThreading(threading.Thread):
    def __init__(self, keywords, citys):
        threading.Thread.__init__(self)
        self.keywords = keywords
        self.sp = LagouSpider(self.keywords, citys)

    def run(self):
        time.sleep(2)
        print(f'Threading: {threading.current_thread()} ,keyword {self.keywords}')
        self.sp.run()

# 爬虫封装
class LagouSpider(Driver):
    # 当前关键字、城市、页数、页下正在爬取的索引节点
    current_keyword = ''
    current_city = ''
    current_page = 0
    current_detail_page_index = 0

    # 每一个{ 职位,城市 } 的总职位数、爬取数、爬取失败数
    total_position_num = ''
    total_crawled_num = 0


    def __init__(self, keywords, citys, settings=Settings):
        self.keywords = keywords
        self.citys = citys
        self.settings = settings

        # 初始化WebDriver
        super().__init__(executable_path=self.settings.executable_path)

        # URL去重过滤器
        self.dont_filter = self.settings.DONT_FILTER  # 是否不过滤
        self.dupefilter = UrlDupefilter()
        # 数据清洗
        self.data_processor = DataProcess()
        # 存储器
        self.storer = DataStore()
        # 日志
        self.log = Log()

    def run(self):
        self.log.start_log()    # 开始爬取的日志

        # 所有关键词
        for key in self.keywords:
            self.log.crawled_log(key, newline=True)
            print(key)
            self.current_keyword = key
            # 所有城市
            for city_name in self.citys:
                city_code = self.data_processor.get_code_by_city(city_name)
                url = f'https://www.lagou.com/jobs/list_{key}/p-city_{city_code}?px=default#filterBox'

                # 准备爬取的城市，输出，并写入日志
                print("="*40, city_name, city_code, "="*40)
                self.log.crawled_log(f'\t{city_name}', newline=True)

                self.current_page = 1
                self.current_city = city_name
                self.total_crawled_num = 0

                self.parse_urls(url)


    # ｛关键字，城市｝
    def parse_urls(self ,url):
        self.driver.get(url)
        self.test = 0
        # 遍历，直到没有下一页
        while True:
            self.random_sleep(1,2)
            source = self.driver.page_source

            # 处理广告
            self.process_ad()
            # 第一页处理
            self.process_first_page(source)

            # 遍历列表页
            self.parse_list_page(source)
            self.random_sleep(2,6)

            # 下一页处理
            if not self.next_page():
                break
            self.random_sleep(3, 8)

            # TODO: 调试专用，爬取｛关键词，城市｝的3页
            # if self.current_page == 3:
            #     break


    # 处理列表页：｛关键词，城市｝
    def parse_list_page(self, source):
        html = etree.HTML(source)
        hrefs = html.xpath('//a[@class="position_link"]/@href')
        # positionids = html.xpath("//ul[@class='item_con_list']/li/@data-positionid")
        # 一个关键词、一座城市下的所有职位信息的链接
        for i, href in enumerate(hrefs):
            href = str(href).split(sep='?',maxsplit=1)[0]   # 对URL进行处理
            # URL去重，否则插入
            if not self.dont_filter and self.dupefilter.url_seen(href):
                print(i, href, '已经存在------')
                continue
            else:
                # 爬取详情页页面
                self.parse_detail_page(href)
                self.random_sleep(2, 5)
            self.current_detail_page_index = i
            self.total_crawled_num += 1

            # TODO: 调试专用，爬取每个列表页下一个职位信息
            # break

    # 处理详情页
    def parse_detail_page(self, href):
        try:
            # 打开详情页
            self.driver.execute_script(f'window.open("{href}");')
            # 切换至详情页
            self.driver.switch_to.window(self.driver.window_handles[1])
        except:
            print("爬取失败页面", href)
            failed_info = ' '.join(['\t\t\tFailed Crawl: ', str(self.current_page), str(self.current_detail_page_index), str(href)])
            self.log.crawled_log(failed_info, newline=True)
            return

        # 获取详情页源码
        self.random_sleep(1,2)
        source = self.driver.page_source

        # 存储数据
        dict = self.data_processor.process_page_source(source, href, deepcopy(self.current_keyword))
        # 取得存储信息
        info = self.storer.store_to_mysql(dict)
        # 如果存储数据出现错误
        if None != info:
            self.log.crawled_log(info, newline=True)

        # 关闭详情页
        self.driver.close()
        # 切换至列表页
        self.driver.switch_to.window(self.driver.window_handles[0])


    def process_ad(self):
        # 尝试单击广告，如果被拦截或者无广告，尝试五次，间接睡眠等待，然后跳过循环
        while self.current_page == 1 and self.test != 3:
            try:
                body_btn = self.driver.find_element_by_xpath('//div[@class="body-btn"]')
                body_btn.click()
                self.test = 0
            except:
                self.test += 1


    def process_first_page(self, source):
        # 第一页则写日志
        if self.current_page == 1:
            # 获取｛关键词，城市｝下的总职位数
            try:
                self.total_position_num = etree.HTML(source).xpath('//a[@id="tab_pos"]/span/text()')[0]
            except:
                self.total_position_num = ''
            # 写日志
            log_info = ''.join(['\t', 'Positions: ', str(self.total_position_num)])
            self.log.crawled_log(log_info)


    def next_page(self):
        # 爬取下一页，没有下一页则爬取到了尾页
        try:
            next_btn = self.driver.find_element_by_xpath('//div[@class="pager_container"]/span[@class="pager_next "]')
            next_btn.click()
            self.current_page += 1
        # 是则结束，写日志
        except:
            print("*" * 40, self.current_keyword, self.current_city, "爬取结束")
            self.log.finish_log(self.total_crawled_num)
            return False
        return True

    def random_sleep(self, min_time = 1, max_time = 1):
        n = float(random.randint(min_time, max_time)) / Settings.SPEED
        time.sleep(n)
        return n


if __name__=='__main__':
    keywords = ['JAVA工程师']   # 指定要查询的关键字
    citys = ['全国']  # 指定要查询的城市
    sp = LagouSpider(keywords=keywords, citys=citys)
    sp.run()