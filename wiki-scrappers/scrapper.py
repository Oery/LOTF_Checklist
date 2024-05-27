import json
from pprint import pprint
from bs4 import BeautifulSoup
import requests

class LOTFWikiScrapper:
    
    def __init__(self, item_name, item_url, ignore_list=[], subcategories=[]):
        self.item_name = item_name
        self.ignore_list = ignore_list
        
        if len(subcategories) > 0:
            self.items = {}
            for subcategory in subcategories:
                item_url = subcategory.get('url')
                url = f'https://thelordsofthefallen.wiki.fextralife.com/{item_url}'
                content = self.fetch(url)
                items = self.parse(content)
                self.items[subcategory.get('name')] = items
        else:
            url = f'https://thelordsofthefallen.wiki.fextralife.com/{item_url}'
            content = self.fetch(url)
            self.items = self.parse(content)
        
        self.save()

    def fetch(self, url):
        response = requests.get(url)
        if response.status_code != 200:
            print(f'Failed to retrieve webpage content. Status code: {response.status_code}')
            raise Exception('Failed to retrieve webpage content')
        return response.content
        
    def parse(self, content):
        soup = BeautifulSoup(content, 'html.parser')
        items_containers = soup.find_all(class_="wiki_link")
        
        items = []
        
        for item_container in items_containers:
            if not item_container.find('img'): continue
            if not 'href' in item_container.attrs: continue
            
            name = item_container.get_text(strip=True)
            if name in self.ignore_list: continue
            
            wiki_link = f'https://thelordsofthefallen.wiki.fextralife.com{item_container["href"]}'
            items.append({
                "name": name,
                "description": "",
                "wiki_link": wiki_link
            })
            
        return items
        
    def save(self):
        file_path = f'../src/app/data/{self.item_name}.json'
        with open(file_path, 'w') as json_file:
            json.dump(self.items, json_file, indent=4)
        pprint(self.items)
