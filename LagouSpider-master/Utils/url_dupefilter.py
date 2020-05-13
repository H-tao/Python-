
from Config.settings import Settings
import hashlib
import pandas
from w3lib.url import canonicalize_url
from scrapy.utils.python import to_bytes


class UrlDupefilter(Settings):
    def __init__(self, col='position_id'):
        super().__init__()
        # key的名字，里面的内容随便写，这里的key相当于字典名称，而不是key值。为了后面引用而建的
        self.redis_set = self.TABLE_NAME
        self.cursor = self.mysql_conn.cursor()
        self.redis_db.flushdb()     # 清空原数据库数据
        # 加载数据到Redis
        sql_select = f'select {col} from {self.TABLE_NAME}' # MySQL查询语句
        df = pandas.read_sql(sql_select, self.mysql_conn)
        # print(df[col].to_numpy())
        for url in df[col].to_numpy():
            # redis插入set数据
            fp = self.url_fingerprint(url)
            self.redis_db.sadd(self.redis_set, fp)

    def url_seen(self, url):
        """
        比较预爬取的url是否在Redis数据库中，不存在则插入Redis数据库
        :param url: 将要爬取的url
        :return: 返回True则表示该url已经被爬取过；返回False则相反，并插入Redis数据库
        """
        fp = self.url_fingerprint(url)
        added = self.redis_db.sadd(self.redis_set, fp)
        return added == 0


    def url_fingerprint(self, url):
        """
        根据一个Url返回指纹
        :param url: 要处理的url
        :return: 返回指纹
        """
        fp = hashlib.sha1()
        fp.update(to_bytes(canonicalize_url(url)))
        return fp.hexdigest()