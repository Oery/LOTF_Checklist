import requests
from bs4 import BeautifulSoup
import json

url = 'https://thelordsofthefallen.wiki.fextralife.com/Bosses'

response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    boss_containers = soup.find_all(class_="wiki_link")
    
    bosses = []

    for boss_link in boss_containers:
        
        img = boss_link.find('img')
        if not img:
            continue
        
        if boss_link and 'href' in boss_link.attrs:
            name = boss_link.get_text(strip=True)
            
            if name == "":
                continue
            
            # They're part of the Bringer of Stillness boss
            if name in ['Bringer of Nullity', 'Bringer of Silence', '.']:
                continue
            
            wiki_link = 'https://thelordsofthefallen.wiki.fextralife.com' + boss_link['href']
            bosses.append({
                "name": name,
                "description": "",
                "wiki_link": wiki_link
            })

    file_name = '../src/app/data/bosses.json'

    # Open the file in write mode and save the JSON data
    with open(file_name, 'w') as json_file:
        json.dump(bosses, json_file, indent=4)
        
    content = json.dumps(bosses, indent=4)
    print(content)
else:
    print(f'Failed to retrieve webpage content. Status code: {response.status_code}')
