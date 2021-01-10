from dateutil.relativedelta import relativedelta
import matplotlib.pyplot as plt
import datetime
import pylab as pl


# 封装操作
def relative_time(use_now=True, date_string=None, date_format=None, years=0, months=0, days=0, leapdays=0, weeks=0, hours=0, minutes=0, seconds=0, microseconds=0):
    """ 相对时间，相对于当前或者某一个时间的时间 """
    """
    relative_time(use_now=True)  # 现在
    relative_time(use_now=True, days=-1)  # 昨天的现在
    relative_time(use_now=True, years=-1)    # 一年前的现在
    relative_time(use_now=True, days=-1, months=-1)  # 上个月的前一天
    relative_time(use_now=False, date_string='2020-09-30 12:00:00', date_format="%Y-%m-%d %H:%M:%S", days=1)  # 2020-09-30 12:00:00后一天
    relative_time(use_now=False, date_string='2020-09-30', date_format="%Y-%m-%d", years=-1, weeks=2))  # 2020-09-30 前一年的后两星期
    
    使用详见: https://blog.csdn.net/Spade_/article/details/109170585
    """
    relative_delta = relativedelta(years=years, months=months, days=days, leapdays=leapdays, weeks=weeks, hours=hours,
                                   minutes=minutes, seconds=seconds, microseconds=microseconds)
    _date = datetime.datetime.now() if use_now else datetime.datetime.strptime(date_string, date_format)
    return (_date + relative_delta).strftime("%Y-%m-%d %H:%M:%S")


def draw_trend_chart(xs, ys, title):
    """ 根据数据绘制折线走势图 """
    plt.rcParams['font.sans-serif'] = ['SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    plt.plot(xs, ys)  # 根据数据绘制折线走势图
    plt.title(title)
    plt.show()


def draw_trend_and_withdraw(xs, ys, title, max_x, max_y, show_max_str, min_x, min_y, show_min_str,
                            withdraw, withdraw_x=None, withdraw_y=None, x_ticks_rotation=None):
    """ 根据数据绘制折线走势图和最大回撤信息 """
    """
    xs: x轴数组
    ys: y轴数组
    title: 走势图标题
    max_x, max_y: 最大回撤最高点的x值和y值
    min_x, min_y: 最大回撤最低点的x值和y值
    show_max_str: 最大回撤最高点的标记提示
    show_min_str: 最大回撤最低点的标记提示
    withdraw: 最大回撤值
    withdraw_x: 最大回撤值提示点的x值
    withdraw_y: 最大回撤值提示点的y值
    """
    plt.rcParams['font.sans-serif'] = ['SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    plt.plot(xs, ys)  # 根据数据绘制折线走势图
    plt.title(title)

    plt.scatter(min_x, min_y, color='r')  # 标记最低点
    plt.scatter(max_x, max_y, color='r')  # 标记最高点
    plt.annotate(show_min_str, xytext=(min_x, min_y), xy=(min_x, min_y))  # 标记提示
    plt.annotate(show_max_str, xytext=(max_x, max_y), xy=(max_x, max_y))  # 标记提示

    plt.plot([min_x, max_x], [min_y, max_y], color='b', linestyle='--')  # 连接最低净值点和最高净值点
    if withdraw_x is None or withdraw_y is None:
        plt.annotate(withdraw, xytext=((max_x + min_x) / 2, (max_y + min_y) / 2), xy=((max_x + min_x) / 2, (max_y + min_y) / 2))  # 标记提示
    else:
        plt.annotate(withdraw, xytext=(withdraw_x, withdraw_y), xy=(withdraw_x, withdraw_y))  # 标记提示

    if x_ticks_rotation is not None:    # 旋转 x 轴的标记
        pl.xticks(rotation=60)

    plt.show()


def _withdraw_with_high_low(arr):
    """ 传入一个数组，返回最大回撤和对应的最高点索引、最低点索引 """
    _dp = 0  # 使用 _dp 表示 i 点的最大回撤
    i_high = 0  # 遍历时，0 ~ i - 1 中最高的点的索引，注意是索引

    # 全局最大回撤和对应的最高点和最低点的索引，注意是索引
    g_withdraw, g_high, g_low = float('-inf'), -1, -1

    for i in range(1, len(arr)):
        # 注意：此处求的是
        if arr[i_high] < arr[i-1]:  # 若 0 ~ i - 1 中最高的点小于当前点
            i_high = i-1  # 0 ~ i - 1 中最高的点的索引

        _dp = arr[i_high] - arr[i]  # _dp 表示 i 点的最大回撤
        if _dp > g_withdraw:  # 找到新的最大回撤，更新三个值
            g_withdraw = _dp
            g_high = i_high
            g_low = i

    return g_withdraw, g_high, g_low


if __name__ == '__main__':
    today = relative_time(use_now=True)
    two_year_ago = relative_time(use_now=True, years=-2)

    xs = range(0, 9)
    arr = [3, 7, 2, 6, 4, 1, 9, 8, 5]
    _max, _min = 1, 5   # 最高点索引和最低点索引
    max_rate = 6        # 最大回撤
    draw_trend_chart(xs, arr, title=f'{arr}')
    draw_trend_and_withdraw(list(range(0, 9)), arr, f'{arr}', _max, arr[_max], f'最高点索引:{_max}',
                            _min, arr[_min], f'最低点索引:{_min}', max_rate)
