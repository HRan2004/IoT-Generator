import requests

token = '01h57d5fjfkmmzy704s1ddw5nq'

headers = {'token': token}
url = "https://gateway.jeejio.com/developer/apps/file"
payload = {}
f = open('./upload/app.zip', 'rb')
files = [('file', ('app.zip', f, 'application/zip'))]
result = requests.request("POST", url, headers=headers, data=payload, files=files).json()
f.close()
print(result)
if 'result' not in result:
    print('Upload Error - ', end='')
    print(result['message'])