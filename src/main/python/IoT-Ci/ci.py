import json
import os
import time
import traceback

import datetime
from watchdog.observers import Observer
from watchdog.events import *

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

import requests
import zipfile

name = 'smart-work-place'
pid = '0188526d-3dca-c901-bb7e-d2dc594ad84d'
token = '01h1wqgq39jjtxk3v0zcrq7qwm'
path = './' + name
second_prevent = True


chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
driver = webdriver.Chrome(service=Service('chromedriver.exe'), options=chrome_options)
driver.get('https://developer.jeejio.com/#/application/debugger?id=%s&appName=Test' % pid)


def make_zip(base_dir, zip_name):
    zp = zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED)
    for dir_path, dir_name, file_names in os.walk(base_dir):
        for file_name in file_names:
            if file_name[-1] == '~':
                continue
            p = os.path.join(dir_path, file_name)
            zp.write(p, p.replace('\\', '/').replace(f'/{name}/', '/'))
    zp.close()

running = False

def main():
    global running
    if running:
        return
    running = True
    print('Making Zip...')
    make_zip(path, 'app.zip')

    print('Upload...')
    headers = {
        'token': token,
    }
    url = "https://gateway.jeejio.com/developer/apps/file"
    payload = {}
    files = [
        ('file', ('app.zip', open('./app.zip', 'rb'), 'application/zip'))
    ]
    result = requests.request("POST", url, headers=headers, data=payload, files=files).json()
    # print(json.dumps(result, indent=4))

    print('Fresh Project...')
    headers = {
        'token': token,
        'Content-Type': 'application/json',
    }
    url = 'https://gateway.jeejio.com/developer/apps/' + pid
    print(result)
    r = result['result']
    payload = json.dumps({
        'id': pid,
        'file': {
            'name': r['name'],
            'size': r['size'],
            'indexUri': r['indexUri'],
            'fileUrl': r['fileUrl'],
            'deviceVoList': r['deviceVoList'],
        }
    })
    result = requests.request("PUT", url, headers=headers, data=payload).json()
    # print(json.dumps(result, indent=4))

    print('Fresh Web Page...')
    driver.refresh()
    time.sleep(0.2)

    print('Click Run...')
    while True:
        try:
            btn = driver.find_element(By.XPATH, '//span[text()="运行"]')
            ActionChains(driver).move_to_element(btn).click().perform()
            print('Run Success.\n\n')
            time.sleep(1)
            running = False
            break
        except Exception as e:
            print('Loading')
            time.sleep(0.1)


modified_time = -1


def try_main():
    try:
        main()
    except Exception as e:
        traceback.print_exc()
        time.sleep(0.5)
        print('\n')
        global modified_time
        modified_time = -1


class FileEventHandler(FileSystemEventHandler):

    def __init__(self):
        FileSystemEventHandler.__init__(self)

    def on_moved(self, event):
        if event.is_directory:
            print("Directory moved from {0} to {1}".format(event.src_path, event.dest_path))
        else:
            print("File moved from {0} to {1}".format(event.src_path, event.dest_path))
        try_main()

    def on_created(self, event):
        if event.src_path[-1] == '~':
            return
        if event.is_directory:
            print("Directory created:{0}".format(event.src_path))
        else:
            print("File created:{0}".format(event.src_path))
        try_main()

    def on_deleted(self, event):
        if event.src_path[-1] == '~':
            return
        if event.is_directory:
            print("Directory deleted:{0}".format(event.src_path))
        else:
            print("File deleted:{0}".format(event.src_path))
        try_main()

    def on_modified(self, event):
        global modified_time
        if event.src_path[-1] == '~':
            return
        if event.is_directory:
            print("Directory modified:{0}".format(event.src_path))
        else:
            print("File modified:{0}".format(event.src_path))
        if second_prevent and time.time() - modified_time < 5:
            modified_time = -1
            print('\n')
            return
        modified_time = time.time()
        try_main()


if __name__ == '__main__':
    observer = Observer()
    event_handler = FileEventHandler()
    observer.schedule(event_handler, path, True)
    observer.start()
    observer.join()
