#!/bin/bash

electron-packager . mcopy --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=../dist --version-string.CompanyName="sixteenmillimeter.com" --version-string.FileDescription="Open Source Optical Printer Platform" --version-string.ProductName="mcopy"