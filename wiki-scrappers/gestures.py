import requests
from bs4 import BeautifulSoup
import json

item_file_name = 'gestures'
item_url = 'Gestures'

response = requests.get(f'https://thelordsofthefallen.wiki.fextralife.com/{item_url}')

if response.status_code != 200:
    print(f'Failed to retrieve webpage content. Status code: {response.status_code}')
    raise Exception('Failed to retrieve webpage content')

soup = BeautifulSoup(response.content, 'html.parser')
items_containers = soup.find_all(class_="wiki_link")

items = []

for item_container in items_containers:
    if not item_container.find('img'): continue
    if not 'href' in item_container.attrs: continue
    
    name = item_container.get_text(strip=True)
    if name == "": continue
    
    wiki_link = f'https://thelordsofthefallen.wiki.fextralife.com{item_container["href"]}'
    items.append({
        "name": name,
        "description": "",
        "wiki_link": wiki_link
    })

# Open the file in write mode and save the JSON data
with open( f'../src/app/data/{item_file_name}.json', 'w') as json_file:
    json.dump(items, json_file, indent=4)
    
content = json.dumps(items, indent=4)
print(content)
