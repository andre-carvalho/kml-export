#!/bin/bash
# This script is used to load raw data as from "My Maps" share link.
#
# Swap shared link below by own link.
URL='https://drive.google.com/open?id=[your ID here]&usp=sharing'

# The raw data is write into this directory
DIR=raw-data

curl $URL -L -H 'pragma: no-cache' \
-H 'accept-encoding: gzip, deflate, br' -H 'accept-language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' \
-H 'upgrade-insecure-requests: 1' \
-H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36' \
-H 'x-chrome-uma-enabled: 1' -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' \
-H 'cache-control: no-cache' -H 'authority: www.google.com' \
-H 'x-client-data: CIW2yQEIprbJAQj6nMoBCKmdygEIqKPKAQ==' --compressed --output $DIR/page.txt ;

result=$(grep -o -P '(?<=_pageData = ").*(?=";)' $DIR/page.txt)
rm $DIR/page.txt

final="var jsdata='$result';"
echo $final > $DIR/data.js
