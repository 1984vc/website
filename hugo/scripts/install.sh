#!/bin/bash

mkdir -p bin
cd bin
wget https://github.com/gohugoio/hugo/releases/download/v0.111.3/hugo_0.111.3_linux-amd64.tar.gz
tar xvf hugo_0.111.3_linux-amd64.tar.gz
rm *.tar.gz
cd ..