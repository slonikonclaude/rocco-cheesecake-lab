# python exif-dates.py — EXIF DateTimeOriginal для всех фото из _data/photos/thumb/index.json.
# Качает только первые 96 КБ оригинала `=s0` (EXIF лежит в APP1 в начале файла) → _data/maps/photo-dates.json.
import json, io, urllib.request, concurrent.futures as cf
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True
idx = json.load(open("../photos/thumb/index.json", encoding="utf-8"))


def date_of(i_item):
    i, it = i_item
    req = urllib.request.Request(it["url"] + "=s0", headers={"Range": "bytes=0-98303", "User-Agent": "Mozilla/5.0"})
    try:
        data = urllib.request.urlopen(req, timeout=30).read()
        ex = Image.open(io.BytesIO(data)).getexif()
        sub = ex.get_ifd(0x8769) if ex else {}
        d = (sub or {}).get(36867) or ex.get(306)
        return {"i": i, "file": it["file"], "date": d, "make": ex.get(271), "model": ex.get(272)}
    except Exception as e:
        return {"i": i, "file": it["file"], "date": None, "err": str(e)[:80]}


with cf.ThreadPoolExecutor(12) as pool:
    out = sorted(pool.map(date_of, list(enumerate(idx))), key=lambda x: x["i"])
json.dump(out, open("../maps/photo-dates.json", "w", encoding="utf-8"), indent=1)
dated = [o for o in out if o.get("date")]
print("photos", len(out), "dated", len(dated), "errors", sum(1 for o in out if o.get("err")))
for o in sorted(dated, key=lambda o: o["date"], reverse=True)[:40]:
    print(o["i"], o["date"], o["file"], o.get("make") or "")
