# -*- conding: UTF-8 -*-

import wordcloud
import matplotlib.pyplot as plt
import os
import re


def data_analysis(dataframe, figure_save_path):
    data = dataframe

    # 设置字体大小
    plt.rcParams.update({'font.size': 18})

    #### 薪资分析
    # 薪水一列是采用“最低-最高”的区间的方式进行表示的，这里我们将其转换成平均值，这里我们将工资中的‘k’、‘K’换成数字，便于计算。
    try:
        min_ = data['salary'].str.split('-').str[0].str.rstrip('k').str.rstrip('K').astype('float64') * 1000
        max_ = data['salary'].str.split('-').str[1].str.rstrip('k').str.rstrip('K').astype('float64') * 1000
        salary = (min_ + max_) * 0.5
    except:
        print('------------生成图形失败')
        return
    plt.hist(salary, 10, facecolor='r')
    plt.xlabel('工资', fontproperties='SimHei')
    plt.ylabel('公司数量', fontproperties='SimHei')
    plt.title('工资分布直方图', fontproperties='SimHei')
    print('统计岗位数:', len(data))
    plt.savefig(os.path.join(figure_save_path,"salary.png"))
    # plt.show()
    plt.close()


    #### 词云
    tags = data['tags']
    text = []
    for tag in tags:
        words = str(tag).split(sep='|')
        text.extend(words)
    string = str(text)
    font = r'C:\Windows\Fonts\SimHei.TTF'
    wc = wordcloud.WordCloud(font_path=font,
                             background_color='white',
                             width=640,
                             height=240,
                             )
    wc.generate(string)
    # wc.to_file("./static/images/wordcloud.png")  # 保存图片
    plt.imshow(wc)  # 用plt显示图片
    plt.axis('off') #不显示坐标轴
    plt.savefig(os.path.join(figure_save_path,"wordcloud.png"))
    # plt.show()
    plt.close()


    #### 公司规模饼图
    ex_list = [0, 0.02, 0.05, 0.10, 0.15, 0.20, 0.30, 0.40, 0.50, 0.70, 0.80, 1.00, 1.20, 1.50]
    _ = data['company_scale'].value_counts()
    plt.rcParams['font.sans-serif']=['SimHei'] # 用来正常显示中文标签
    plt.pie(_, labels = list(_.index), explode = ex_list[:len(_)], autopct = '%1.2f%%', startangle = 0)
    plt.title('各种公司规模占比')
    plt.axis('equal')
    # plt.rcParams.update({'font.size': 18})
    # plt.legend(fontsize='medium') # font size are xx-small, x-small, small, medium, large, x-large, xx-large, larger, smaller, None
    plt.savefig(os.path.join(figure_save_path,"company_scale.png"))
    # plt.show()
    plt.close()


    #### 公司类型饼图
    _ = data['company_type'].value_counts()
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
    plt.pie(_, labels = list(_.index), explode = ex_list[:len(_)], autopct = '%1.2f%%',startangle = 0)
    plt.title('各种公司类型占比')
    plt.axis('equal')
    plt.savefig(os.path.join(figure_save_path,"company_type.png"))
    # plt.show()
    plt.close()


    #### 学历要求饼图
    _ = data['education'].value_counts()
    plt.rcParams['font.sans-serif']=['SimHei'] # 用来正常显示中文标签
    plt.pie(_, labels = list(_.index), explode = ex_list[:len(_)], autopct = '%1.2f%%',startangle = 0)
    plt.title('学历要求')
    plt.axis('equal')
    plt.savefig(os.path.join(figure_save_path,"education.png"))
    # plt.show()
    plt.close()


    #### 经验要求饼图
    _ = data['work_experience'].value_counts()
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
    plt.pie(_, labels = list(_.index), explode = ex_list[:len(_)], autopct = '%1.2f%%',startangle = 0)
    plt.title('经验要求')
    plt.axis('equal')
    plt.savefig(os.path.join(figure_save_path,"work_experience.png"))
    # plt.show()
    plt.close()


    ## 城市数据
    # print(data['city'].value_counts())