# coding:UTF-8

from copy import deepcopy
from lxml import etree
import re,datetime


class DataProcess(object):
    cityNumMap = {"河池":246,"洋浦市":251,"宜春":145,"张家界":205,"辽阳":52,"濮阳":175,"阿拉善盟":42,"邵阳":202,"黑河":67,"安庆":118,"白银":318,"湘潭":200,"沧州":16,"梧州":238,"安顺":276,"淄博":150,"杭州":6,"赤峰":34,"铁岭":54,"海北藏族自治州":331,"福州":128,"天水":319,"舟山":106,"龙岩":136,"迪庆藏族自治州":296,"吴忠":339,"果洛藏族自治州":334,"乐山":261,"通化":74,"日照":158,"和田":348,"湘西土家族苗族自治州":211,"韶关":214,"宝鸡":300,"河源":227,"大庆":62,"日喀则地区":311,"泉州":132,"连云港":89,"邯郸":11,"攀枝花":254,"潮州":232,"石嘴山":338,"黄山":119,"保山":285,"南京":79,"克孜勒苏柯尔克孜自治州":355,"徐州":86,"湖州":102,"株洲":199,"安康":306,"柳州":236,"绍兴":103,"金昌":317,"重庆":5,"阿里地区":313,"营口":50,"玉溪":284,"伊春":63,"巴彦淖尔":41,"宁德":137,"葫芦岛":56,"庆阳":324,"辽源":73,"兰州":315,"遵义":275,"自贡":253,"常熟":82,"乌鲁木齐":342,"周口":182,"咸阳":301,"呼和浩特":31,"拉萨":308,"常德":204,"洛阳":169,"信阳":181,"莆田":130,"清远":229,"张掖":321,"北京":2,"佛山":218,"齐齐哈尔":58,"宣城":127,"嘉兴":101,"秦皇岛":10,"阿坝藏族羌族自治州":270,"恩施土家族苗族自治州":196,"汕尾":226,"楚雄彝族自治州":287,"思茅":290,"台湾":358,"眉山":263,"抚州":146,"德宏傣族景颇族自治州":292,"阿克苏地区":349,"景德镇":138,"铜川":299,"长春":70,"泰安":156,"鞍山":45,"海西蒙古族藏族自治州":336,"澳门":357,"阳江":228,"商洛":307,"全国":0,"鹤岗":60,"乌海":33,"上海":3,"吉林":71,"沈阳":44,"上饶":147,"益阳":206,"曲靖":283,"博尔塔拉蒙古自治州":347,"吉安":144,"永州":208,"常州":87,"广元":258,"巴中":268,"昌都地区":309,"克拉玛依":343,"朝阳":55,"新乡":173,"海东地区":330,"延边朝鲜族自治州":78,"巢湖":123,"临汾":28,"蚌埠":113,"南充":262,"昆明":282,"包头":32,"临沂":160,"渭南":302,"赣州":143,"聊城":162,"巴音郭楞蒙古自治州":353,"鹤壁":172,"牡丹江":66,"肇庆":223,"泉港区":133,"中卫":341,"温州":99,"山南地区":310,"榆林":305,"嘉峪关":316,"绥化":68,"成都":252,"广安":265,"太仓":97,"泰州":94,"阳泉":21,"淮北":116,"海宁":100,"长沙":198,"鹰潭":142,"毕节地区":279,"晋城":23,"盐城":91,"通辽":35,"本溪":47,"四平":72,"惠州":224,"铜仁地区":277,"云浮":234,"三门峡":178,"来宾":247,"焦作":174,"玉环县":109,"临沧":297,"烟台":153,"扬州":92,"白城":77,"苏州":80,"塔城地区":352,"南宁":235,"十堰":186,"吕梁":29,"阜新":51,"漳州":134,"厦门":129,"汉中":304,"丹东":48,"开封":168,"铜陵":117,"东莞":230,"石家庄":8,"德州":161,"佳木斯":64,"鄂州":189,"黔南布依族苗族自治州":281,"长治":22,"永济市":30,"昌吉回族自治州":346,"承德":15,"天津":4,"娄底":210,"莱芜":159,"平顶山":170,"荣成":166,"怀化":209,"甘南藏族自治州":328,"菏泽":164,"玉林":243,"阿勒泰地区":350,"淮南":114,"昆山":81,"七台河":65,"张家港":83,"芜湖":112,"抚顺":46,"三明":131,"定西":325,"滁州":120,"驻马店":183,"广州":213,"临夏回族自治州":327,"章丘":165,"郑州":167,"随州":195,"伊犁哈萨克自治州":354,"盘锦":53,"海口":249,"许昌":176,"朔州":24,"忻州":27,"荆州":192,"大兴安岭地区":69,"北海":239,"无锡":84,"枣庄":151,"晋中":25,"德阳":256,"哈尔滨":57,"淮安":90,"武威":320,"保定":13,"襄樊":188,"黄冈":193,"延安":303,"大理白族自治州":293,"喀什地区":351,"茂名":222,"锡林郭勒盟":39,"江门":220,"哈密地区":345,"漯河":177,"孝感":191,"湛江":221,"锦州":49,"唐山":9,"鸡西":59,"遂宁":259,"深圳":215,"内江":260,"红河哈尼族彝族自治州":288,"荆门":190,"汕头":217,"池州":126,"雅安":267,"郴州":207,"黔东南苗族侗族自治州":280,"乌兰察布":40,"南海区":219,"林芝地区":314,"张家口":14,"方家山":110,"襄阳":197,"资阳":269,"东营":152,"昭通":286,"亳州":125,"海南藏族自治州":333,"阜阳":121,"宁波":98,"贵港":242,"金华":104,"文山壮族苗族自治州":289,"贵阳":273,"潍坊":154,"西双版纳傣族自治州":291,"凉山彝族自治州":272,"合肥":111,"黔西南布依族苗族自治州":278,"商丘":180,"桂林":237,"珠海":216,"白山":75,"青岛":149,"大连":43,"吐鲁番地区":344,"威海":157,"丽水":108,"南昌":7,"邢台":12,"怒江傈僳族自治州":295,"新余":141,"酒泉":323,"香港":356,"马鞍山":115,"南通":88,"宜宾":264,"九江":140,"衢州":105,"武汉":184,"崇左":248,"海晏":1,"那曲地区":312,"银川":337,"六安":124,"南阳":179,"江阴":85,"三亚":250,"百色":244,"黄南藏族自治州":332,"黄石":185,"平凉":322,"太原":19,"安阳":171,"咸宁":194,"济南":148,"甘孜藏族自治州":271,"六盘水":274,"廊坊":17,"丽江":294,"玉树藏族自治州":335,"大同":20,"绵阳":257,"兴安盟":38,"靖江":95,"陇南":326,"衡水":18,"呼伦贝尔":37,"衡阳":201,"台州":107,"萍乡":139,"鄂尔多斯":36,"宿迁":96,"镇江":93,"揭阳":233,"钦州":241,"岳阳":203,"泸州":255,"松原":76,"中山":231,"防城港":240,"运城":26,"固原":340,"达州":266,"西宁":329,"宿州":122,"梅州":225,"贺州":245,"南平":135,"新加坡":359,"滨州":163,"宜昌":187,"西安":298,"双鸭山":61,"济宁":155,"石河子":212}
    companySizeNumMap = {"少于15人":1,"50-150人":3,"500-2000人":5,"不限":0,"150-500人":4,"2000人以上":6,"15-50人":2}
    financeStageNumMap = {"天使轮":2,"D轮及以上":6,"上市公司":7,"未融资":1,"不限":0,"C轮":5,"B轮":4,"不需要融资":8,"A轮":3}

    def sql_data_format(self):
        # 存储的数据格式
        sql_data = dict(
            # 搜索信息
            position_id = '', # 职位id
            keywords='',  # 职位搜索关键字
            detail_url='',  # 招聘详细页网址

            # 岗位相关信息
            position='',  # 职位名称（如：Python开发，Python实习生）
            tags='',  # 职位标签（如：电商、后端、大数据、数据挖掘、机器学习、HTML、CSS、Python）
            salary='',  # 职位薪资范围（如：7K-10K，10K-20K）
            job_type='',  # 工作性质（如：全职，实习，兼职）
            city='',  # 工作地点（如：北京-海淀，浙江-杭州）
            district='',  # 工作区域
            street='',  # 详细街道
            education='',  # 学历要求（如：初中及以下，高中/中技/中专，大专，本科，硕士，博士，无学历要求）
            work_experience='',  # 工作经验要求（如：在校生/应届生，1-3年，3-5年，无经验）
            release_date='',  # 发布日期（如：2020-1-20）
            description='',  # 职位描述

            # 公司相关信息
            company_name='',  # 招聘公司名称
            company_scale='',  # 公司规模（如：少于15人，15-50人）
            company_field='',  # 公司领域（如：互联网，金融，电子商务）
            company_type='',  # 公司性质（如：民营公司，上市公司，C轮，未融资）
            company_benefits='',  # 公司福利（如：行业领先,技术氛围浓,绩效奖金；五险一金，员工旅游，专业培训，年终奖金，弹性工作，定期体检）
        )
        return sql_data

    def get_code_by_city(self, city=None):
        """
        传入一个城市名，返回城市代码
        :param city: 中文城市名，如"全国","广州"
        :return:
            int，城市代码
            None，城市代码不存在
        """
        return self.cityNumMap.get(city)

    def process_page_source(self, page_source, href, keyword):
        html = etree.HTML(page_source)  # text解析成HTML
        sql_data = deepcopy(self.sql_data_format())

        # 搜索信息
        # href是<class 'lxml.etree._ElementUnicodeResult'>类型，需要编码为utf-8再解码为str
        detail_url = href if not html.xpath('//link[@rel="canonical"]/@href') else html.xpath('//link[@rel="canonical"]/@href')[0].encode('utf-8').decode()
        detail_url = detail_url.split(sep='?', maxsplit=1)[0]
        position_id = re.sub('[^\d]*', '', detail_url)
        sql_data['position_id'] = position_id
        sql_data['keywords'] = keyword  # 职位搜索关键字
        sql_data['detail_url'] = detail_url  # 招聘详细页网址

        # 岗位相关信息
        sql_data['position'] = self.get_one(html.xpath('//div[@class="job-name"]/h1/text()'))  # 职位名称（如：Python开发，Python实习生）
        tags = '|'.join(html.xpath('//ul[@class="position-label clearfix"]/li/text()'))
        sql_data['tags'] = tags  # 职位标签（如：电商、后端、大数据、数据挖掘、机器学习、HTML、CSS、Python）
        try:
            job_request = html.xpath('//dd[@class="job_request"]/h3/span/text()')
            job_request = [re.sub('[/\s]', '', x) for x in job_request]
            sql_data['salary'] = job_request[0]  # 职位薪资范围（如：7K-10K，10K-20K）
            sql_data['job_type'] = job_request[4]  # 工作性质（如：全职，实习，兼职）
            # sql_data['city'] = job_request[1]        # 工作地点（如：北京-海淀，浙江-杭州）
            sql_data['education'] = job_request[3]  # 学历要求（如：初中及以下，高中/中技/中专，大专，本科，硕士，博士，无学历要求）
            sql_data['work_experience'] = job_request[2][2:]  # 工作经验要求（如：在校生/应届生，1-3年，3-5年，无经验）
        except IndexError:
            print("获取信息失败页面", sql_data['detail_url'])
            failed_info = ' '.join(['\t\t\tFailed to Get Info: ', str(sql_data['detail_url'])])
            self.log.crawled_log(failed_info, newline=True)
            return
        addr = html.xpath('//div[@class="work_addr"]/a')
        sql_data['city'] = self.get_one(addr[0].xpath('text()'))
        sql_data['district'] = self.get_one(addr[1].xpath('text()'))
        sql_data['street'] = self.get_one(html.xpath('//input[@name="positionAddress"]/@value')) # 工作街道
        release_date = self.get_one(html.xpath('//p[@class="publish_time"]/text()'))
        release_date = release_date.split(sep=' ', maxsplit=1)[0].strip()
        sql_data['release_date'] = self.data_transform(release_date)  # 发布日期（如：2020-1-20）
        description = html.xpath('//div[@class="job-detail"]//text()')
        description = re.sub(r'[\s()"]+', '', ''.join(description))
        sql_data['description'] = description

        # 公司相关信息
        company_name = self.get_one(html.xpath('//h3[@class="fl"]/em/text()'))
        company_name = re.sub('\s', '', company_name)
        sql_data['company_name'] = company_name  # 招聘公司名称
        company_benefits = self.get_one(html.xpath('//dd[@class="job-advantage"]/p/text()'))
        sql_data['company_benefits'] = re.sub(r'[\s+、，,/；;]+', '|',
                                              company_benefits)  # 公司福利（如：行业领先,技术氛围浓,绩效奖金；五险一金，员工旅游，专业培训，年终奖金，弹性工作，定期体检）

        company_info = html.xpath('//h4[@class="c_feature_name"]/text()')
        company_info_label = html.xpath('//ul[@class="c_feature"]/li/span/text()')
        for index, label in enumerate(company_info_label):
            if index >= len(company_info):
                break
            if company_info_label[index] == '领域':
                sql_data['company_field'] = company_info[index]  # 公司领域（如：互联网，金融，电子商务）
            elif company_info_label[index] == '规模':
                sql_data['company_scale'] = company_info[index]  # 公司规模（如：少于15人，15-50人）
            elif company_info_label[index] == '发展阶段':
                sql_data['company_type'] = company_info[index]  # 公司性质（如：民营公司，上市公司，C轮，未融资）
            else:
                continue
            # elif company_info_label[index] == '公司主页':
            # company_url = company_info[index]                   # 公司主页

        return sql_data

    # def process_page_source(self, page_source, href, keyword):
    #     html = etree.HTML(page_source)  # text解析成HTML
    #     sql_data = deepcopy(self.sql_data_format())
    #
    #     # 搜索信息
    #     sql_data['keywords'] = keyword  # 职位搜索关键字
    #     # href是<class 'lxml.etree._ElementUnicodeResult'>类型，需要编码为utf-8再解码为str
    #     detail_url = href if not html.xpath('//link[@rel="canonical"]/@href') else html.xpath('//link[@rel="canonical"]/@href')[0].encode('utf-8').decode()
    #     sql_data['detail_url'] = detail_url.split(sep='?', maxsplit=1)[0]  # 招聘详细页网址
    #
    #     # 岗位相关信息
    #     sql_data['position'] = html.xpath('//div[@class="job-name"]/h1/text()')[0] if html.xpath(
    #         '//div[@class="job-name"]/h1/text()') else ""  # 职位名称（如：Python开发，Python实习生）
    #     tags = '|'.join(html.xpath('//ul[@class="position-label clearfix"]/li/text()'))
    #     sql_data['tags'] = tags  # 职位标签（如：电商、后端、大数据、数据挖掘、机器学习、HTML、CSS、Python）
    #     try:
    #         job_request = html.xpath('//dd[@class="job_request"]/h3/span/text()')
    #         job_request = [re.sub('[/\s]', '', x) for x in job_request]
    #         sql_data['salary'] = job_request[0]  # 职位薪资范围（如：7K-10K，10K-20K）
    #         sql_data['job_type'] = job_request[4]  # 工作性质（如：全职，实习，兼职）
    #         # sql_data['city'] = job_request[1]        # 工作地点（如：北京-海淀，浙江-杭州）
    #         sql_data['education'] = job_request[3]  # 学历要求（如：初中及以下，高中/中技/中专，大专，本科，硕士，博士，无学历要求）
    #         sql_data['work_experience'] = job_request[2][2:]  # 工作经验要求（如：在校生/应届生，1-3年，3-5年，无经验）
    #     except IndexError:
    #         print("获取信息失败页面", sql_data['detail_url'])
    #         failed_info = ' '.join(['\t\t\tFailed to Get Info: ', str(sql_data['detail_url'])])
    #         self.log.crawled_log(failed_info, newline=True)
    #         return
    #     addr = html.xpath('//div[@class="work_addr"]/a')
    #     sql_data['city'] = addr[0].xpath('text()')[0] if addr[0].xpath('text()') else ""
    #     sql_data['district'] = addr[1].xpath('text()')[0] if addr[1].xpath('text()') else ""
    #     sql_data['street'] = html.xpath('//input[@name="positionAddress"]/@value')[0] if html.xpath(
    #         '//input[@name="positionAddress"]/@value') else ""  # 工作街道
    #     release_date = html.xpath('//p[@class="publish_time"]/text()')[0] if html.xpath(
    #         '//p[@class="publish_time"]/text()') else ""
    #     release_date = release_date.split(sep=' ', maxsplit=1)[0].strip()
    #     sql_data['release_date'] = self.data_transform(release_date)  # 发布日期（如：2020-1-20）
    #     description = html.xpath('//div[@class="job-detail"]//text()')
    #     description = re.sub(r'[\s()"]+', '', ''.join(description))
    #     sql_data['description'] = description
    #
    #     # 公司相关信息
    #     company_name = html.xpath('//h3[@class="fl"]/em/text()')[0] if html.xpath('//h3[@class="fl"]/em/text()') else ""
    #     company_name = re.sub('\s', '', company_name)
    #     sql_data['company_name'] = company_name  # 招聘公司名称
    #     company_benefits = html.xpath('//dd[@class="job-advantage"]/p/text()')[0] if html.xpath(
    #         '//dd[@class="job-advantage"]/p/text()') else ""
    #     sql_data['company_benefits'] = re.sub(r'[\s+、，,/；;]+', '|',
    #                                           company_benefits)  # 公司福利（如：行业领先,技术氛围浓,绩效奖金；五险一金，员工旅游，专业培训，年终奖金，弹性工作，定期体检）
    #
    #     company_info = html.xpath('//h4[@class="c_feature_name"]/text()')
    #     company_info_label = html.xpath('//ul[@class="c_feature"]/li/span/text()')
    #     for index, label in enumerate(company_info_label):
    #         if index >= len(company_info):
    #             break
    #         if company_info_label[index] == '领域':
    #             sql_data['company_field'] = company_info[index]  # 公司领域（如：互联网，金融，电子商务）
    #         elif company_info_label[index] == '规模':
    #             sql_data['company_scale'] = company_info[index]  # 公司规模（如：少于15人，15-50人）
    #         elif company_info_label[index] == '发展阶段':
    #             sql_data['company_type'] = company_info[index]  # 公司性质（如：民营公司，上市公司，C轮，未融资）
    #         else:
    #             continue
    #         # elif company_info_label[index] == '公司主页':
    #         # company_url = company_info[index]                   # 公司主页
    #
    #     return sql_data

    # 将时间转为相同格式
    def data_transform(self, datetime_str):
        if len(re.findall(':', datetime_str)):
            return datetime.date.today()
        elif len(re.findall('-', datetime_str)):
            return datetime_str
        elif datetime_str == '1天前':
            return (datetime.date.today() + datetime.timedelta(days=-1)).strftime('%Y-%m-%d')
        elif datetime_str == '2天前':
            return (datetime.date.today() + datetime.timedelta(days=-2)).strftime('%Y-%m-%d')
        elif datetime_str == '3天前':
            return (datetime.date.today() + datetime.timedelta(days=-3)).strftime('%Y-%m-%d')
        else:
            return ''

    def get_one(self, obj, default=None):
        if not obj:
            return ""
        else:
            return obj[0]

if __name__ == '__main__':
    dm = DataProcess()
    data = ['全国','深圳','安徽','abc', 'string']
    for d in data:
        print(d, dm.get_code_by_city(d))