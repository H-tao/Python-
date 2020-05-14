from lagou_website.settings import BASE_DIR
from Utils.positions import keyword_of_db_table
import os


def make_dir():
    '''
    生成三级目录的示例
    :return:
    '''
    data = keyword_of_db_table()    # 读取三级字典

    BASE_PATH = os.path.join(BASE_DIR, 'static', 'images')
    for d in data:
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


if __name__ == '__main__':
    make_dir()