'''
数据来源：http://fund.eastmoney.com/519300.html?spm=search
天天基金官网：大成沪深300指数A 519300
'''

import matplotlib.pyplot as plt
import pandas as pd
import datetime
import pylab as pl

# 读取数据
df = pd.read_csv('大成沪深300指数A-519300.txt', sep='\t', header=None, names=['x', 'y', 'equityReturn'])
df.index = pd.to_datetime(df.x)     # 使用x时间列为索引列，定位快
df = df.drop(['x'], axis=1)  # 删除x列

plt.rcParams['font.sans-serif']=['SimHei']
plt.rcParams['axes.unicode_minus'] = False
plt.plot(df.index, df.y) # 根据数据绘制原走势图
plt.title('大成沪深300指数A-519300走势图')
plt.show()


'''
计算每个月的最大回撤率
'''
res = []

# 先按年分组，再按月分组
for indexs, groupby_year_month in df.groupby([df.index.year, df.index.month]):
    _ = list(groupby_year_month['y'].values)  # 各个月份的y值列表

    # 寻找最大回撤率
    _min = 1  # 最低点索引
    _max = 0  # 最高点索引
    for i, y in enumerate(_):
        if y < _[_min]:
            _min = i
        if y > _[_max]:
            _max = i

    # 如果最低点的索引大于最高点的索引，找到最大撤回率
    if _min > _max:
        pass
    # 否则，重新寻找最低点前的最高点
    else:
        _max = 0
        for i in range(_min):
            if (_[i] > _[_max]):
                _max = i

    t = [groupby_year_month.index[0], _[_max], _[_min], _[_max] - _[_min], (_[_max] - _[_min]) / _[_max] * 100]
    res.append(t)

# 转DataFrame
result = pd.DataFrame(res, columns=["date", "max", "min", "diff", "rate"])
# 只保留年月
result['date'] = result['date'].apply(lambda x : datetime.datetime.strftime(x, "%Y-%m"))
# 日期列转为索引
result.index = pd.to_datetime(result['date'])
# 删除日期列
result = result.drop(['date'], axis=1)


'''
1、以月为窗口，挑选一只基金or股票，查看它近2年最大回撤率；
'''
# 取近两年
today = datetime.date.today()
two_year_ago = datetime.datetime(today.year - 2, today.month - 1, today.day)
near_two_year_df = result[(result.index >= two_year_ago)]

# 以月为窗口的最大回撤率
print(f'以月为窗口，近2年最大回撤率: {round(near_two_year_df["rate"].max(), 4)}%')

# 以月为窗口的回撤率绘图
plt.plot(near_two_year_df.index, near_two_year_df['rate'])
plt.title('大成沪深300指数A-519300 近两年的月回撤率')
plt.show()


'''
2、找到从08年-至今的金融危机时间段，并呈现在这些危机时间段内，该基金or股票的历次回撤率。；
'''
crisis_start = datetime.datetime(2007, 1, 1)    # 金融危机开始
crisis_end = datetime.datetime(2009, 8, 1)      # 结束
crisis_df = df[(df.index >= crisis_start) & (df.index <= crisis_end)]

_ =  list(crisis_df['y'].values)  # 各个月份的y值列表

# 寻找最大回撤率
_min = 1  # 最低点索引
_max = 0  # 最高点索引
for i, y in enumerate(_):
    if y < _[_min]:
        _min = i
    if y > _[_max]:
        _max = i

# 如果最低点的索引大于最高点的索引，找到最大撤回率
if _min > _max:
    pass
#         print(True)
# 否则，重新寻找最低点前的最高点
else:
    _max = 0
    for i in range(_min):
        if(_[i] > _[_max]):
            _max = i

rate = round((_[_max] - _[_min]) / _[_max] * 100, 4)
print('\n08金融危机时间段:\n最高点净值:', _[_max], '\t最低点净值:', _[_min], '\t回撤', (_[_max] - _[_min]))
print(f'最大回撤率: {rate}%')

'''
绘图
'''
min = crisis_df[crisis_df.y == _[_min]]
max = crisis_df[crisis_df.y == _[_max]]
min_date = datetime.datetime.strftime(list(min.index)[0], '%Y-%m-%d')
max_date = datetime.datetime.strftime(list(max.index)[0], '%Y-%m-%d')
min_y = list(min.y)[0]
max_y = list(max.y)[0]
show_min = '['+str(min_date)+' '+ str(min_y)+']'
show_max = '['+str(max_date)+' '+ str(max_y)+']'
plt.plot(crisis_df.index, crisis_df.y)      # 绘制折线图
plt.annotate(show_min, xytext=(min_date, min_y), xy=(min_date, min_y))  # 标记提示
plt.annotate(show_max, xytext=(max_date, max_y), xy=(max_date, max_y))  # 标记提示
plt.scatter(min_date, min_y, color='r')     # 标记最低点
plt.scatter(max_date, max_y, color='r')     # 标记最高点
plt.plot([])
plt.plot([min.index, max.index],[min_y, max_y], color='b', linestyle='--')  # 连接最低净值点和最高净值点
tips = crisis_df[crisis_df.index == '2008-03-03']
plt.annotate(f'   {rate}%', xytext=(tips.index, tips.y), xy=(tips.index, tips.y))  # 标记提示
plt.title('2008年金融危机最大回撤率')
pl.xticks(rotation=60)
plt.show()