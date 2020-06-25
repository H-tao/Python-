from multiprocessing import Process, Semaphore, Lock, Queue, Pool
import json
from copy import deepcopy
import os
import re


class All():
    def __init__(self, all_positions=None, processor_num=4):
        self.all_positinos = self.read_positions() if all_positions is None else all_positions
        self.processor_num = processor_num
        self.queue = Queue()

    def make_queue(self):
        d = {}
        for big_category, sub_group in self.all_positinos.items():
            # if big_category != '游戏':  # 只爬取设计
            #     continue
            d['DB_NAME'] = big_category
            for sub_category, keywords in sub_group.items():
                d['TABLE_NAME'] = re.sub('/','或',sub_category)
                d['keywords'] = [i.strip() for k in keywords for i in k.split(sep='/', maxsplit=1)]
                self.queue.put(deepcopy(d))

        self.cmd_queue = Queue()
        while not self.queue.empty():
            d = self.queue.get()
            cmd_str = f'python {os.getcwd()}\caller_args.py -d {d["DB_NAME"]} -t {d["TABLE_NAME"]} -k {" ".join(d["keywords"])}'
            print(cmd_str)
            self.cmd_queue.put(deepcopy(cmd_str))

    def get_positions_queue(self):
        self.make_queue()
        return self.cmd_queue

    def read_positions(self):
        with open('./Positions/positions.txt', 'r', encoding='utf-8') as f:
            data = f.readline().strip()
            dict = json.loads(data)
            return dict

    def run(self):
        cmd_queue = self.get_positions_queue()
        # while not cmd_queue.empty():
        #     print(cmd_queue.get())
        lock = Lock()
        for i in range(self.processor_num):
            l = LagouProcess(lock, cmd_queue)
            l.start()

class LagouProcess(Process):
    def __init__(self, lock, queue):
        super().__init__()
        self.lock = lock
        self.cmd_queue = queue

    def execute_cmd(self, cmd_str):
        os.system(cmd_str)

    def run(self):
        while not self.cmd_queue.empty():
            self.execute_cmd(self.cmd_queue.get())

if __name__ == '__main__':
    a= All(processor_num = 3)
    a.run()
    # print(os.getcwd())

