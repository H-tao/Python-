
import datetime

class Log(object):

    def start_log(self):
        # 将当前时间写入日志
        current_time = datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d %H:%M:%S')
        info = f'\n{current_time} {"="*80}'
        self.crawled_log(info, newline=True)    # 将当前时间写入日志


    def finish_log(self, total_crawled_num):
        current_time = datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d %H:%M:%S')
        log_info = f'\t\tTotal Crawled: {total_crawled_num}\tFinished-Point' \
                   f'\n{current_time}{"=" * 80}'
        self.crawled_log(log_info, newline=True)


    def crawled_log(self, info, newline=False):
        with open('crawled_log.txt', 'a+', encoding='utf-8') as f:
            if newline:
                f.write('\n')
            try:
                f.write(info)
            except SyntaxError:  # 出现编码错误
                f.write(SyntaxError.text)


if __name__ == '__main__':
    l = Log()
    l.crawled_log('wwww')