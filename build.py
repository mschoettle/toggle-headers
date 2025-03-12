import json
import zipfile
from pathlib import Path

BUILD_DIR = Path('build/')

with Path('manifest.json').open() as fd:
    manifest = json.load(fd)

version = manifest['version']
name = manifest['name'].lower().replace(' ', '-')
target = BUILD_DIR.joinpath(f'{name}-{version}.xpi')

print(f'Building {name} v{version}...')

with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as zip:
    zip.write('background.js')
    zip.write('LICENSE')
    zip.write('manifest.json')
    zip.write('schema.json')
    zip.write('toggle-headers.js')
    zip.write('_locales/de/messages.json')
    zip.write('_locales/en/messages.json')

print(f'Wrote to file {target}')
