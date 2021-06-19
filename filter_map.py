import json, urllib.request

def get_usa_data(url):
    converted = json.loads(urllib.request.urlopen(url).read().decode())
    filtered = []  # 1hr average period of reading
    for value in converted['results']:
        for reading in value['measurements']:
            filtered.append([value['city'], value['coordinates']['latitude'], value['coordinates']['longitude'], reading['value'], reading['unit'], reading['parameter']])
    return json.dumps(filtered)
