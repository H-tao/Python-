from lxml import etree
import re

class Xpath():
    # 搜索信息
    keyword = ''  # 职位搜索关键字
    detail_url = '//link[@rel="canonical"]/@href'  # 招聘详细页网址

    # 岗位相关信息
    position = '//div[@class="job-name"]/h1/text()'  # 职位名称（如：Python开发，Python实习生）
    tags = '//ul[@class="position-label clearfix"]/li/text()'  # 职位标签（如：电商、后端、大数据、数据挖掘、机器学习、HTML、CSS、Python）

    job_request = '//dd[@class="job_request"]/h3'
    salary = '//dd[@class="job_request"]/h3/span[0]/text()'  # 职位薪资范围（如：7K-10K，10K-20K）
    job_type = '//dd[@class="job_request"]/h3/span[4]/text()'  # 工作性质（如：全职，实习，兼职）
    education = '//dd[@class="job_request"]/h3/span[3]/text()'  # 学历要求（如：初中及以下，高中/中技/中专，大专，本科，硕士，博士，无学历要求）
    work_experience = '//dd[@class="job_request"]/h3/span[2]/text()'  # 工作经验要求（如：在校生/应届生，1-3年，3-5年，无经验）

    addr = '//div[@class="work_addr"]/a'
    city = './text()'      # 工作地点（如：北京-海淀，浙江-杭州）
    district = './text()'  # 工作区域
    street = '//input[@name="positionAddress"]/@value'     # 详细街道
    release_date = '//p[@class="publish_time"]/text()'  # 发布日期（如：2020-1-20）
    description = '//div[@class="job-detail"]//text()'  # 职位描述

    # 公司相关信息
    company_name = '//h3[@class="fl"]/em/text()'  # 招聘公司名称
    company_info = '//h4[@class="c_feature_name"]/text()'
    company_info_label = '//ul[@class="c_feature"]/li/span/text()'
    company_scale = ''  # 公司规模（如：少于15人，15-50人）
    company_field = ''  # 公司领域（如：互联网，金融，电子商务）
    company_type = ''  # 公司性质（如：民营公司，上市公司，C轮，未融资）
    company_benefits = '//dd[@class="job-advantage"]/p/text()'  # 公司福利（如：行业领先,技术氛围浓,绩效奖金；五险一金，员工旅游，专业培训，年终奖金，弹性工作，定期体检）

class XpathEnhance():
    def __init__(self,page_source=None):
        if page_source:
            self.html_x = etree.HTML(page_source)

    def get_one(self,xpath_str,index=0, pattern=None, repl='',html_x=None,default=''):
        if not html_x: html_x = self.html_x
        xpath_rets = html_x.xpath(xpath_str)
        if len(xpath_rets) > index:
            if pattern != None:
                return re.sub(pattern, repl, xpath_rets[index])
            return xpath_rets[index]
        else:
            return default

    def get_all(self,xpath_str, html_x=None):
        if not html_x: html_x = self.html_x
        xpath_rets = html_x.xpath(xpath_str)
        return xpath_rets

    def get_join(self,xpath_str,join_str=',',html_x= None,default=''):
        if not html_x: html_x = self.html_x
        xpath_rets = html_x.xpath(xpath_str)
        if xpath_rets:
            ret = join_str.join(xpath_rets)
            return ret
        else:
            return default