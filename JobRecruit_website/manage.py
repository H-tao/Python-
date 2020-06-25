    #!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from multiprocessing import Process

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lagou_website.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

def execute_cmd():
    print('celery_handler starting')
    os.system('celery -A celery_tasks.handler worker -l info -P eventlet')

if __name__ == '__main__':
    main()
    # p_main = Process(target=main)
    # p_celery = Process(target=execute_cmd)
    #
    # p_main.start()
    # p_celery.start()
    #
    # p_main.join()
    # p_celery.join()


