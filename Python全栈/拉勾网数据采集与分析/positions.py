from collections import defaultdict
import json, re
from copy import deepcopy
import os

def keyword_to_db_table():
    '''
    返回存储关键字数据所在的数据库名和表名
    :return:
    返回一个字典映射
    比如：{'Java': {'DB_NAME': '技术', 'TABLE_NAME': '后端开发'}, 'C++': {'DB_NAME': '技术', 'TABLE_NAME': '后端开发'}, ...}
    '''
    data_dict = read_positions()

    res = defaultdict(dict)
    d = {}
    all_positions = data_dict
    for big_category_name, sub_group in all_positions.items():
        d['DB_NAME'] = big_category_name
        for sub_category_name, keywords in sub_group.items():
            _ = deepcopy(d)
            _['TABLE_NAME'] = re.sub('/','或',sub_category_name)
            keywords = [i for k in keywords for i in k.split(sep='/', maxsplit=1)]
            for keyword in keywords:
                res[keyword] = _

    # for k, v in res.items():
    #     print(k, v)
    return res


def keyword_of_db_table():
    '''
    返回所有的数据库名、表名、关键字构成的集合
    :return: 一个列表
     比如：[{'DB_NAME': '游戏', 'TABLE_NAME': '运营或推广', 'keywords': ['游戏运营', '游戏编辑', '游戏推广', '手游推广', '页游推广']}, {'DB_NAME': '游戏', 'TABLE_NAME': '其他', 'keywords': ['游戏主播', '游戏陪练', '游戏体验', '电竞主持', '电竞讲师']}]
    '''
    data_dict = read_positions()

    d = {}
    list = []
    for big_category, sub_group in data_dict.items():
        d['DB_NAME'] = big_category
        for sub_category, keywords in sub_group.items():
            d['TABLE_NAME'] = re.sub('/','或',sub_category)
            d['keywords'] = [i for k in keywords for i in k.split(sep='/', maxsplit=1)]
            list.append(deepcopy(d))

    return list


def read_positions():
    project_dir = os.path.dirname(os.path.abspath(__file__))
    with open(f'{project_dir}/positions.txt', 'r', encoding='utf-8') as f:
        data = f.readline().strip()
        data_dict = json.loads(data)
        return data_dict


if __name__ == '__main__':
    d = keyword_to_db_table()
    print(d)
    print(keyword_of_db_table())

