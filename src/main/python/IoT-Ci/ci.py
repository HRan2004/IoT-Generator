import json
import os
import time
import traceback

from watchdog.observers import Observer
from watchdog.events import *

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

import requests
import zipfile


username = '10281991589'
password = '2486vbnm'

project_name = 'Test'
pid = '0188526d-3dca-c901-bb7e-d2dc594ad84d'


dir_name = 'dist'
path = '../../typescript/' + dir_name

second_prevent = True
use_zip = False
fresh = './upload'


running = False
driver = None
token = ''
modified_time = -1


def make_zip(base_dir, zip_name, mn):
    zp = zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED)
    for dir_path, dir_name, file_names in os.walk(base_dir):
        for file_name in file_names:
            if file_name[-1] == '~':
                continue
            p = os.path.join(dir_path, file_name)
            tp = p.replace('\\', '/').replace(mn, '/')
            # print(f'Zip: {p} -> {tp}\n')
            zp.write(p, tp)
    zp.close()


def while_do(func):
    while True:
        try:
            func()
            break
        except Exception as e:
            # traceback.print_exc()
            print('Loading...')
            time.sleep(0.3)


def click_element(tag, text):
    def func():
        btn = driver.find_element(By.XPATH, f'//{tag}[text()="{text}"]')
        ActionChains(driver).move_to_element(btn).click().perform()
    while_do(func)


def main():
    global running
    if running:
        return
    running = True
    if use_zip:
        print('Making Zip...')
        make_zip(path, 'upload.zip', path + '/')

    print('Upload...')
    headers = {
        'token': token,
    }
    url = "https://gateway.jeejio.com/developer/apps/file"
    payload = {}
    f = open('upload.zip', 'rb')
    files = [
        ('file', ('app.zip', f, 'application/zip'))
    ]
    result = requests.request("POST", url, headers=headers, data=payload, files=files).json()
    f.close()
    # print(json.dumps(result, indent=4))

    print('Fresh Project...')
    headers = {
        'token': token,
        'Content-Type': 'application/json',
    }
    url = 'https://gateway.jeejio.com/developer/apps/' + pid
    print(result)
    if 'result' not in result:
        print('Upload Error')
        running = False
        return
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
    click_element('span', '运行')
    print('Run Success.\n\n')
    running = False


def try_main():
    try:
        main()
    except Exception as e:
        traceback.print_exc()
        time.sleep(0.5)
        print('\n')
        global modified_time
        global running
        running = False
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
        if second_prevent and time.time() - modified_time < 10:
            modified_time = -1
            print('\n')
            return
        modified_time = time.time()
        try_main()


def login():
    global token
    url = 'https://gateway.jeejio.com/user/login'
    payload = json.dumps({
        'phone': username,
        'password': password,
        'loginType': 0,
    })
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Content-Length': '59',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'https://developer.jeejio.com',
        'Platform': '1',
        'Referer': 'https://developer.jeejio.com/',
        'Sec-Ch-Ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }
    response = requests.request("POST", url, headers=headers, data=payload).json()
    print('Login: ' + str(response["code"]))
    token = response['result']['token']
    print('Token: ' + token)

    while_do(lambda: driver.find_element(By.XPATH, '//input[@placeholder="请输入手机号"]').send_keys(username))
    while_do(lambda: driver.find_element(By.XPATH, '//input[@placeholder="请输入密码"]').send_keys(password))
    click_element('span', '登录')
    click_element('span', f' {project_name} ')


if __name__ == '__main__':
    chrome_options = Options()
    chrome_options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(service=Service('chromedriver.exe'), options=chrome_options)
    driver.get('https://developer.jeejio.com/#/application/debugger?id=%s&appName=%s' % (pid, project_name))
    login()
    observer = Observer()
    event_handler = FileEventHandler()
    if fresh is None:
        fresh = path
    observer.schedule(event_handler, fresh, True)
    observer.start()
    observer.join()
