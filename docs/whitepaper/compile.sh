#!/bin/bash

set -e

pandoc README.md -o mcopy_whitepaper.pdf --filter pandoc-citeproc --pdf-engine=pdflatex --template=template.tex
pandoc README.md -o index.html --filter pandoc-citeproc