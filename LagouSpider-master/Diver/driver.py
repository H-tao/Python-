from selenium import webdriver
from Config.settings import Settings
class Driver(object):
    def __init__(self, executable_path):
        self.executable_path = executable_path
        self.initialize()

    def initialize(self):
        # 无界面选项

        chrome_options = webdriver.ChromeOptions()
        if not Settings.SHOW_WINDOWS:
            chrome_options.add_argument('--headless')
            chrome_options.add_argument('--disable-gpu')  # 上面三行代码就是为了将Chrome不弹出界面，实现无界面爬取
        else:
            chrome_options = None

        # 添加代理IP 快代理：https://www.kuaidaili.com/ops/
        # chrome_options.add_argument("--proxy-server=http://27.154.34.146:39320")

        # 加载驱动
        self.driver = webdriver.Chrome(
            # 驱动安装路径
            executable_path = self.executable_path,
            options= chrome_options if chrome_options else None,
        )

    def quit(self):
        self.driver.quit()

    def restart(self):
        self.quit()
        self.initialize()