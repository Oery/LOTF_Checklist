from scrapper import LOTFWikiScrapper

data = [
    {
        'name': 'rings',
        'url': 'Rings',
    },
    {
        'name': 'gestures',
        'url': 'Gestures',
    },
    {
        'name': 'bosses',
        'url': 'Bosses',
        'ignore_list': [
            'Bringer of Nullity',
            'Bringer of Silence',
            '.',
            ''
        ],
    },
    {
        'name': 'umbral-eyes',
        'url': 'Umbral+Eyes',
    },
]

if __name__ == '__main__':
    for item in data:
        name = item.get('name')
        url = item.get('url')
        ignore_list = item.get('ignore_list', [])
        
        LOTFWikiScrapper(name, url, ignore_list)
        print(f'Scrapped {name}')
