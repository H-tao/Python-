import pymysql
import redis
from pymysql.err import Warning

'''
1. 指定：数据库名、表名、是否去重（数据库、表不存在时，自动创建）
2. 在__init__配置mysql和redis数据库，默认本地数据库、root、密码123456
'''
class Settings(object):
    DATABASE_NAME = 'test'     # 数据库名
    TABLE_NAME = 'it'     # 表名
    DONT_FILTER = False  # 是否对已经爬取过的url进行过滤，默认False过滤，改为True则不过滤
    SHOW_WINDOWS = False
    SPEED = 1
    executable_path = 'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe'

    START = True
    def __init__(self):
        if self.START:
            # 用于存储数据mysql数据库
            self.mysql_conn = pymysql.Connection(
                host='localhost',
                port=3306,
                user='root',
                password='123456',
                database=None,
                charset='utf8',
            )
            # 新建数据库和表
            self.create_db_and_table()
            self.mysql_conn.select_db(self.DATABASE_NAME)

            # 去重的数据库
            # 连接本地Redis数据库1，不填则默认为0
            self.redis_db = redis.StrictRedis(host='127.0.0.1', port=6379, db=1)

            self.START = False

    def create_db_and_table(self):
        cs = self.mysql_conn.cursor()
        create_db_sql = f'create database IF NOT EXISTS {self.DATABASE_NAME};'
        user_db = f'use {self.DATABASE_NAME};'
        create_table_sql = f'''create table IF NOT EXISTS {self.TABLE_NAME}(
                id int primary key auto_increment,

                # 搜索信息
                keywords varchar(20),      # 职位搜索关键字
                detail_url varchar(100),   # 招聘详细页网址

                # 岗位相关信息
                position varchar(40),      # 职位名称(如:Python开发,Python实习生)
                tags varchar(50),          # 职位标签(如:电商|后端|大数据|数据挖掘|机器学习|HTML|CSS|Python)
                salary varchar(10),        # 职位薪资范围(如:7K-10K,10K-20K)
                job_type varchar(10),      # 工作性质(如:全职,实习,兼职)
                city varchar(10),          # 工作地点(如:北京-海淀,浙江-杭州)
                district varchar(10),      # 工作区域
                street varchar(40),        # 详细街道
                education varchar(10),     # 学历要求(如:初中及以下,高中/中技/中专,大专,本科,硕士,博士,无学历要求)
                work_experience varchar(10),    # 工作经验要求(如:在校生/应届生,1-3年,3-5年,无经验)
                release_date varchar(12),       # 发布日期(如:2020-1-20)
                description varchar(2000),       # 职位描述

                # 公司相关信息
                company_name varchar(40),      # 招聘公司名称
                company_scale varchar(20),     # 公司规模(如:少于15人,15-50人)
                company_field varchar(20),     # 公司领域(如:互联网,金融,电子商务)
                company_type varchar(10),      # 公司性质(如:民营公司,上市公司,C轮,未融资)
                company_benefits varchar(100)   # 公司福利(如:行业领先,技术氛围浓,绩效奖金;五险一金,员工旅游,专业培训,年终奖金,弹性工作,定期体检)
        );'''
        try:
            cs.execute(create_db_sql)
        except Warning:
            print(f"{self.DATABASE_NAME} 数据库已经存在========")
        cs.execute(user_db)
        try:
            cs.execute(create_table_sql)
        except Warning:
            print(f"{self.TABLE_NAME} 表已经存在========")
        self.mysql_conn.commit()
        # print(create_table_sql)

    def get_mysql_connect(self):
        return self.mysql_conn

    def get_redis_connect(self):
        return self.redis_db

    def db_exists(self, cursor, db_name):
        pass

    def tabel_exists(self, cursor, table_name):
        pass