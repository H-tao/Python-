# -*- conding: UTF-8 -*-
'''
对MySQL数据库操作的封装
'''
from Utils import positions
import pymysql
from collections import defaultdict
import pandas
from recruit_website.settings import DATABASES

class MysqlClient(object):
    def __init__(self):
        self.db_table = positions.keyword_to_db_table()
        # 为每一个数据库建立一个连接
        self.connectPool = defaultdict(dict)

    def get_jobs(self, keyword, page=1, num=10):
        name = self._get_db_table_name(keyword)
        if name is None:
            return None
        db_name = name['DB_NAME']
        table_name = name['TABLE_NAME']

        # 获取数据库连接
        conn = self._connect(db_name)
        # 选择数据库
        conn.select_db(db_name)

        start_num = page * num - num
        sql_select = f'select id, position, salary, city, education, work_experience, tags, company_name, company_scale, company_field, company_type, company_benefits, detail_url, district from {table_name} where keywords="{keyword}" limit {start_num}, {num}'
        df = pandas.read_sql(sql_select, conn)
        return df

        # cursor = conn.cursor()
        # cursor.execute(sql_select)
        # data = cursor.fetchall()
        # cursor.close()
        # return data

    def get_total_num(self, keyword):
        name = self._get_db_table_name(keyword)
        if name is None:
            return 0
        db_name = name['DB_NAME']
        table_name = name['TABLE_NAME']

        # 获取数据库连接
        conn = self._connect(db_name)
        # 选择数据库
        conn.select_db(db_name)

        # 查询
        sql_total = f'select * from {table_name} where keywords="{keyword}"'
        cursor = conn.cursor()
        data_count = cursor.execute(sql_total)
        cursor.close()

        return data_count

    def _connect(self, db_name):
        # 连接已经存在，直接返回
        if self.connectPool[db_name]:
            conn = self.connectPool[db_name]
            try:
                conn.ping()
            except:
                conn = self._new_connect()
                self.connectPool[db_name] = conn
        else:
            conn = self._new_connect()
            self.connectPool[db_name] = conn
        return conn


    def _new_connect(self):
        # 否则建立新连接
        conn = pymysql.Connection(
            host= DATABASES['MYSQL']['HOST'],
            port= DATABASES['MYSQL']['PORT'],
            user= DATABASES['MYSQL']['USER'],
            password= DATABASES['MYSQL']['PASSWORD'],
            charset= DATABASES['MYSQL']['CHARSET'],
        )
        return conn


    def _get_db_table_name(self, keyword):
        return self.db_table[keyword] if self.db_table[keyword] else None


    def get_all(self, keyword):
        name = self._get_db_table_name(keyword)
        if name is None:
            return [['获取数据失败，查无此关键字']]
        db_name = name['DB_NAME']
        table_name = name['TABLE_NAME']

        # 获取数据库连接
        conn = self._connect(db_name)
        # 选择数据库
        conn.select_db(db_name)

        sql_select = f'select id, position, salary, city, education, work_experience, tags, company_name, company_scale, company_field, company_type, company_benefits, detail_url, district from {table_name} where keywords="{keyword}"'
        df = pandas.read_sql(sql_select, conn)
        return df


if __name__ == '__main__':
    c = MysqlClient()
    # keywords = ['HTML5', 'Android', 'iOS', 'WP', '移动开发其它']
    # for k in keywords:
    #     print(c.get_jobs(k))
    df = c.get_jobs('HTML5')
    print(df)
