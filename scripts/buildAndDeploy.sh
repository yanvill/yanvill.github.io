#!/usr/bin/env sh

set -e

npm run build

cd dist
cp index.html 404.html

git init
git add -A
git commit -m "New Deployment"
git push -f git@github.com:yanvill/yanvill.github.io.git master:gh-pages

cd -