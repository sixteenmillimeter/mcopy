#!/bin/bash

convert -resize x32 -gravity center -crop 32x32+0+0 -flatten -colors 256 ./assets/icons/icon.png ./assets/icons/icon.ico
png2icns ./assets/icons/icon.icns ./assets/icons/icon.png
