from pymysql.err import Error as MysqlError
from Config.settings import Settings

class DataStore(Settings):

    def __init__(self):
        super().__init__()

    def store_to_mysql(self, dict_data):
        """
        将dict存储到MySQL
        :param dict_data: 数据
        :return:
            None：存储成功
            failed_info：存储出现问题，返回存储失败的url和SQL语句
        """
        # 获得mysql的光标对象
        cs = self.mysql_conn.cursor()

        #### 构建mysql插入语句
        sql_column = ','.join([key for key in dict_data.keys()])
        sql_value = ','.join([f'"{dict_data[key]}"' for key in dict_data.keys()])
        sql_str = f'insert into {self.TABLE_NAME} ({sql_column}) value ({sql_value});'
        print(sql_value)

        try:
            # 执行sql语句
            cs.execute(sql_str)
            # 提交执行
            self.mysql_conn.commit()
            return None
        # except ProgrammingError:
        except MysqlError:
            print("存储失败页面", dict_data['detail_url'])
            failed_info = ' '.join(['\t\t\tFailed Store: ',
                                    str(dict_data['detail_url']), '\n\t\t\t\tSQL: ', sql_str])
            return failed_info

    def store_to_mongodb(self, data):
        pass
