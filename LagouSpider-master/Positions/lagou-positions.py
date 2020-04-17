from selenium import webdriver
from lxml import etree as le
import re
import os, time
import json

class Xpath():
    MENU_BOX_XPATH = '//div[@class="menu_box"]'
    CATEGORIE = './/div[@class="category-list"]/h2/text()'
    MENU_SUB_XPATH = './/div[@class="menu_sub dn"]/dl'
    SUB_CATEGORIE = './dt/span/text()'
    POSITIONS = './dd//h3/text()'

class XpathGetter():
    def __init__(self, page_source=None):
        if page_source:
            self.html_x = le.HTML(page_source)

    def get_one(self, xpath_str, html_x=None, pattern=None, repl=None, default=''):
        if html_x is None: html_x = self.html_x
        xpath_rets = html_x.xpath(xpath_str)
        if pattern is None:
            return xpath_rets[0] if xpath_rets else default
        else:
            return re.sub(pattern=pattern, repl=repl, string=xpath_rets[0]) if xpath_rets else default

    def get_all(self, xpath_str, html_x=None):
        if html_x is None: html_x = self.html_x
        xpath_rets = html_x.xpath(xpath_str)
        return xpath_rets

    def get_join(self, xpath_str, join_str=',', html_x=None, default=''):
        if html_x is None: html_x = self.html_x
        xpath_rets = html_x.xpath(xpath_str)
        if xpath_rets:
            ret = join_str.join(xpath_rets)
            return ret
        else:
            return default

def getSource():
    driver = webdriver.Chrome(
        executable_path= 'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe'
    )
    driver.get('https://www.lagou.com')

    source = driver.page_source

    with open('lagou.html', 'w', encoding='utf-8') as f:
        f.write(source)

def get_data():
    with open('lagou.html', 'r', encoding='utf-8') as f:
        source = f.read()

    all_positions = {}
    xg = XpathGetter(page_source=source)
    menu_box_x_s = xg.get_all(xpath_str=Xpath.MENU_BOX_XPATH)
    for box_x in menu_box_x_s:
        category = xg.get_one(html_x=box_x, xpath_str=Xpath.CATEGORIE, pattern='\s', repl='')
        # print(category)
        sub_s_x = xg.get_all(html_x=box_x, xpath_str=Xpath.MENU_SUB_XPATH)
        sub_categories = {}
        for sub_x in sub_s_x:
            sub_category = xg.get_one(html_x=sub_x, xpath_str=Xpath.SUB_CATEGORIE)
            positions = xg.get_all(html_x=sub_x, xpath_str=Xpath.POSITIONS)
            sub_categories[sub_category] = positions
            # print('\t', sub_category)
            # print('\t\t', positions)
        all_positions[category] = sub_categories

    print(all_positions)
    # print(all_positions['技术']['后端开发'])
    # write_to_file(all_positions)


    # pool = Pool(4)
    # lock = Lock()
    # # pool.map()
    # for big_category_name, sub_group in all_positions.items():
    #     # print(big_category_name)
    #     if big_category_name == '技术':
    #         continue
    #     for sub_cate_name, pos_s in sub_group.items():
    #         # print('\t',sub_cate_name)
    #         # print('\t\t', pos_s)
    #         print('-'*40)
    #         lp = LagouProcess(lock, big_category=big_category_name, sub_category=sub_cate_name, positions=pos_s)
    #         lp.start()
    #     print('*'*80)
    #     time.sleep(10)

def write_to_file(all_positions):
    f = open('./positions.txt', 'a+', encoding='utf-8')
    f.write(str(json.dumps(all_positions,ensure_ascii=False)))
    for big_category_name, sub_group in all_positions.items():
        info = os.linesep + big_category_name
        f.write(info)
        # print(big_category_name)
        for sub_cate_name, pos_s in sub_group.items():
            info = ''.join([os.linesep, '\t', sub_cate_name, os.linesep, '\t\t', str(pos_s)])
            f.write(info)
            # print('\t',sub_cate_name)-
            # print('\t\t', pos_s)
    f.close()

def readline():
    with open('./positions.txt', 'r', encoding='utf-8') as f:
        data = f.readline().strip()
        print(type(data), data)
        dict = json.loads(data)
        print(type(dict),dict)


if __name__ == '__main__':
    # get_data()
    readline()
