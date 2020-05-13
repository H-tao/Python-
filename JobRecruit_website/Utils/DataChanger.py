'''
修改所有网站的数据库和表的示例：
1.添加position_id字段
2.为position_id字段赋值
'''

from Utils.positions import keyword_of_db_table
import pymysql


def change(DB_NAME, TABLE_NAME):
    conn = pymysql.Connection(
        host='localhost',
        port=3306,
        user='root',
        password='123456',
        charset='utf8',
        db=DB_NAME
    )
    conn.select_db(DB_NAME)
    cursor = conn.cursor()

    sql_add_column = f'alter table {TABLE_NAME} add position_id varchar(10) after id;'
    sql_change = f'update {TABLE_NAME} set position_id=substring(detail_url, 28, 7) where id<=20000;'
    info = cursor.execute(sql_add_column)
    print(info)
    info = cursor.execute(sql_change)
    print(info)
    conn.commit()

if __name__ == '__main__':
    list = keyword_of_db_table()
    print(list)
    # for i in list:
    #     change(i['DB_NAME'], i['TABLE_NAME'])

    # change('lagou', 'restart')


