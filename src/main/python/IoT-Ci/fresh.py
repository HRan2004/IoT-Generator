import time
from ci import make_zip
import subprocess

dir_name = 'dist'
dict_path = '../../typescript/' + dir_name


if __name__ == '__main__':
    subprocess.call('cd ../../typescript && npx webpack', shell=True)
    time.sleep(0.1)
    make_zip(dict_path, 'upload/app.zip', dict_path + '/')
