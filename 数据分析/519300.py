'''
数据来源：http://fund.eastmoney.com/519300.html?spm=search
天天基金官网：大成沪深300指数A 519300
'''

import pandas as pd
import datetime
from fengzhuang import relative_time, draw_trend_chart, _withdraw_with_high_low, draw_trend_and_withdraw

# 读取数据
df = pd.read_csv('大成沪深300指数A-519300.txt', sep='\t', header=None, names=['x', 'y', 'equityReturn'])
df.index = pd.to_datetime(df.x)     # 使用x时间列为索引列，定位快
df = df.drop(['x', 'equityReturn'], axis=1)  # 删除x列和equityReturn列。equityReturn表示权益回报，我们不关心。

draw_trend_chart(df.index, df.y, '大成沪深300指数A-519300走势图')


'''
计算每个月的最大回撤率
'''
# 存储各个月份的日期、最大回撤最高点的值和最低点的值、最大回撤、最大回撤率
res = []

# 先按年分组，再按月分组
for indexs, groupby_year_month in df.groupby([df.index.year, df.index.month]):
    _ = list(groupby_year_month['y'].values)  # 单个月份的净值列表

    # 求最大回撤率、最高点索引、最低点索引
    _withdraw, _max, _min = _withdraw_with_high_low(_)

    # t为一个月的五个值，分别是日期、最大回撤最高点的值和最低点的值、最大回撤、最大回撤率
    t = [groupby_year_month.index[0], _[_max], _[_min], _[_max] - _[_min], (_[_max] - _[_min]) / _[_max] * 100]

    # date、max、min、diff、rate
    res.append(t)

# 转DataFrame
result = pd.DataFrame(res, columns=["date", "max", "min", "diff", "rate"])
# 只保留年月
result['date'] = result['date'].apply(lambda x : datetime.datetime.strftime(x, "%Y-%m"))
# 日期列转为索引
result.index = pd.to_datetime(result['date'])
# 删除日期列
result = result.drop(['date'], axis=1)
print(result)


'''
1、以月为窗口，挑选一只基金or股票，查看它近2年最大回撤率；
'''
# 取近两年
today = relative_time(use_now=True)
two_year_ago = relative_time(use_now=True, years=-2)
near_two_year_df = result[(result.index >= two_year_ago)]

# 以月为窗口的最大回撤率
print(f'以月为窗口，近2年最大回撤率: {round(near_two_year_df["rate"].max(), 4)}%')

# 以月为窗口的回撤率绘图
draw_trend_chart(near_two_year_df.index, near_two_year_df['rate'], '大成沪深300指数A-519300 近两年的月回撤率')


'''
2、找到从08年-至今的金融危机时间段，并呈现在这些危机时间段内，该基金or股票的历次回撤率。；
'''
crisis_start = datetime.datetime(2007, 1, 1)    # 金融危机开始  2007-01-01 00:00:00
crisis_end = datetime.datetime(2009, 8, 1)      # 结束  2009-08-01 00:00:00
crisis_df = df[(df.index >= crisis_start) & (df.index <= crisis_end)]   # 选取 2007-01-01 到 2009-08-01 的 日期和净值

_ =  list(crisis_df['y'].values)  # 各个月份的y值列表

# 求最大回撤率、最高点索引、最低点索引
_withdraw, _max, _min = _withdraw_with_high_low(_)

rate = round((_[_max] - _[_min]) / _[_max] * 100, 4)
print('\n08金融危机时间段:\n最高点净值:', _[_max], '\t最低点净值:', _[_min], '\t回撤', (_[_max] - _[_min]))
print(f'最大回撤率: {rate}%')

'''
绘图前，先取得三个点，最低点、最高点、最低和最高中间的点，求得三个点在图中对应的x值y值用于绘图
'''
min = crisis_df[crisis_df.y == _[_min]]     # 最低点，包括时间和净值
max = crisis_df[crisis_df.y == _[_max]]     # 最高点，包括时间和净值

min_x = min.index
max_x = max.index
min_y = list(min.y)[0]      # 取第一个
max_y = list(max.y)[0]
min_date = datetime.datetime.strftime(list(min.index)[0], '%Y-%m-%d')   # 日期索引转为字符串日期
max_date = datetime.datetime.strftime(list(max.index)[0], '%Y-%m-%d')

show_min = '['+str(min_date)+' '+ str(min_y)+']'
show_max = '['+str(max_date)+' '+ str(max_y)+']'

# 中间点
tips = crisis_df[crisis_df.index == '2008-03-03']      # 取 2008-03-03 作为图中最大回撤提示的标记点

# 绘图
draw_trend_and_withdraw(crisis_df.index, crisis_df.y, '2008年金融危机最大回撤率',
                        max_x, max_y, show_max, min_x, min_y, show_min,
                        f'{rate}%', tips.index, tips.y, 60)
