import json
import random
from pathlib import Path

import requests
from atproto import Client, client_utils
import os

all_lingos = list(Path("src/content/lingos").glob("*.json"))

random_lingo = random.choice(all_lingos)
with open(random_lingo, "r") as f:
    random_lingo_data = json.load(f)
random_lingo_definition = random.choice(random_lingo_data["definitions"])

# fmt: off
themes = [
    "slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber",
    "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue",
    "indigo", "violet", "purple", "fuchsia", "pink", "rose",
]
# fmt: on

langs = [random_lingo_definition["language"]]
url = f'https://techlingo.fyi/{random_lingo_data["slug"]}/{langs[0]}'

data = {
    "theme": random.choice(themes),
    "title": random_lingo_data["term"],
    "description": random_lingo_definition["definition"],
    "path": url,
}

image = requests.get(f"https://og.techlingo.fyi/api", params=data)

message = f'{random_lingo_data["term"]}: {random_lingo_definition["definition"]}'

tb = client_utils.TextBuilder()
tb.text(message)
tb.text("\n\n")
tb.link(url, url)

client = Client()
client.login("techlingo.fyi", os.environ["BLUESKY_PASSWORD"])

client.send_image(tb, image=image.content, image_alt=message, langs=langs)
