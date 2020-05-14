# -*- conding: UTF-8 -*-

from Utils.positions import keyword_of_db_table
from Utils.data_analyse import data_analysis
from lagou_website.settings import BASE_DIR
from DB.MysqlClient import MysqlClient
import os

KEYWORD = '机器学习'

def generate_fig():
    c = MysqlClient()
    d_t_k = keyword_of_db_table()
    BASE_PATH = os.path.join(BASE_DIR, 'static', 'images')
    for d in d_t_k:
        if d['DB_NAME'] == '销售':
            continue

        # 一级目录 大分类
        first_path = os.path.join(BASE_PATH, d['DB_NAME'])
        if not os.path.exists(first_path):
            os.mkdir(first_path)

        # 二级目录 小分类
        second_path = os.path.join(first_path, d['TABLE_NAME'])
        if not os.path.exists(second_path):
            os.mkdir(second_path)

        # 三级目录 关键字
        keywords = d['keywords']
        for kw in keywords:
            third_path = os.path.join(second_path, kw)
            if not os.path.exists(third_path):
                os.mkdir(third_path)
            df = c.get_all(kw)
            print('keyword:', kw)
            if(not df.empty):
                data_analysis(df, third_path)


if __name__ == '__main__':
    c = MysqlClient()
    df = c.get_all(KEYWORD)
    data_analysis(df, './static/images')

    # generate_fig()

