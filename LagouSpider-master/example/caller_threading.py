# -*- coding: UTF-8 -*-

from Spider.lagou import LagouThreading
import time
import sys

'''
多线程示例，默认配置一个线程爬取一个关键字
如命令行执行：
$ python caller_threading.py C++ JAVA PHP
'''

if __name__ == '__main__':
    keywords = sys.argv[1:] # 关键字列表
    citys = ['全国']  # 指定要查询的城市

    # 每个线程爬取一个职位
    for key in keywords:
        t = LagouThreading(keywords=[key], citys=citys)
        t.start()
        time.sleep(2)





