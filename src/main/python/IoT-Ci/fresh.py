from ci import make_zip
import subprocess

name = 'dist'
dict_path = '../../typescript/' + name


if __name__ == '__main__':
    subprocess.call('cd ../../typescript && npx webpack', shell=True)
    make_zip(dict_path, 'upload/app.zip', dict_path + '/')
