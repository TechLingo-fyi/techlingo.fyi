import json
import random
from pathlib import Path

import requests
from atproto import Client, client_utils, models
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


client = Client()
client.login("techlingo.fyi", os.environ["BLUESKY_PASSWORD"])

image_blob = client.upload_blob(image.content)

main = models.AppBskyEmbedExternal.Main(
    external=models.AppBskyEmbedExternal.External(
        description=random_lingo_definition["definition"], title=random_lingo_data["term"], uri=url, thumb=image_blob.blob
    )
)

tb = client_utils.TextBuilder()

tb.link(random_lingo_data["term"], url)
tb.text(": ")
tb.text(random_lingo_definition["definition"])

message = f'{random_lingo_data["term"]}: {random_lingo_definition["definition"]}'

client.send_post(tb, embed=main)

