from scrapper import LOTFWikiScrapper

data = [
    {
        'name': 'weapons',
        'subcategories': [
            { 'name': 'axes', 'url': 'Axes' },
            { 'name': 'bows', 'url': 'Bows' },
            { 'name': 'catalysts', 'url': 'Catalysts' },
            { 'name': 'crossbows', 'url': 'Crossbows' },
            { 'name': 'daggers', 'url': 'Daggers' },
            { 'name': 'fists', 'url': 'Fists' },
            { 'name': 'flails', 'url': 'Flails' },
            { 'name': 'grand_axes', 'url': 'Grand+Axes' },
            { 'name': 'grand_hammers', 'url': 'Grand+Hammers' },
            { 'name': 'grand_swords', 'url': 'Grand+Swords' },
            { 'name': 'hammers', 'url': 'Hammers' },
            { 'name': 'long_swords', 'url': 'Long+Swords' },
            { 'name': 'polearms', 'url': 'Polearms' },
            { 'name': 'short_swords', 'url': 'Short+Swords' },
            { 'name': 'spears', 'url': 'Spears' },
            { 'name': 'shields', 'url': 'Shields' },
            { 'name': 'ammunitions', 'url': 'Ammunition' },
        ]
    },
    {
        'name': 'armors',
        'subcategories': [
            { 'name': 'helmets', 'url': 'Helms' },
            { 'name': 'chestplates', 'url': 'Chest+Armor' },
            { 'name': 'gauntlets', 'url': 'Gauntlets' },
            { 'name': 'legs', 'url': 'Leg+Armor' },
        ]
    },
    {
        #  Spells parser is broken and will contain both spells + catalysts + Spells categories
        'name': 'spells',
        'subcategories': [
            { 'name': 'radiant', 'url': 'Radiant+Spells' },
            { 'name': 'inferno', 'url': 'Inferno+Spells' },
            { 'name': 'umbral', 'url': 'Umbral+Spells' },
        ]
    },
    {
        'name': 'pendants',
        'url': 'Pendants',
    },
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
        'name': 'umbral_eyes',
        'url': 'Umbral+Eyes',
    }
]

if __name__ == '__main__':
    for item in data:
        name = item.get('name')
        url = item.get('url')
        subcategories = item.get('subcategories', [])
        ignore_list = item.get('ignore_list', [])
        
        LOTFWikiScrapper(name, url, ignore_list=ignore_list, subcategories=subcategories)
        print(f'Scrapped {name}')
