import zipfile
import os
from ci import make_zip
import subprocess

name = 'dict'
dict_path = '../../typescript/' + name


if __name__ == '__main__':
    subprocess.call('cd ../../typescript && npx tsc', shell=True)
    make_zip(dict_path, 'upload.zip', name)
