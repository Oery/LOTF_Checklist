import requests
from bs4 import BeautifulSoup
import json

url = 'https://thelordsofthefallen.wiki.fextralife.com/Gestures'

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    gesture_containers = soup.find_all(class_="wiki_link")
    
    gestures = []

    for gesture_link in gesture_containers:
        
        img = gesture_link.find('img')
        if not img:
            continue
        
        if gesture_link and 'href' in gesture_link.attrs:
            name = gesture_link.get_text(strip=True)
            
            if name == "":
                continue
            
            wiki_link = 'https://thelordsofthefallen.wiki.fextralife.com' + gesture_link['href']
            gestures.append({
                "name": name,
                "description": "",
                "wiki_link": wiki_link
            })

    file_name = '../src/app/data/gestures.json'

    # Open the file in write mode and save the JSON data
    with open(file_name, 'w') as json_file:
        json.dump(gestures, json_file, indent=4)
        
    content = json.dumps(gestures, indent=4)
    print(content)
else:
    print(f'Failed to retrieve webpage content. Status code: {response.status_code}')
