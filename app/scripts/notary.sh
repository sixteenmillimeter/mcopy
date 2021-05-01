#!/bin/bash

# Borrowed from 
# https://gist.github.com/lunixbochs/0ceeb23be5c3d5c6748165e61c6db493

PACKAGE=`cat package.json`
bundle=`echo "${PACKAGE}" | jq -r '.build.appId'`
username=`cat ./.appleId`
password=`cat ./.applePwd`
dmg="$2"
if [[ "$1" = "notarize" ]]; then
    xcrun altool --notarize-app --primary-bundle-id "$bundle" --username "$username" --password "$password" --file "$dmg" | tee "notarize.out"
elif [[ "$1" = "staple" ]]; then
    uuid=$(grep RequestUUID notarize.out | awk '{print $3}')
    [[ -z "$uuid" ]] && exit 1
    # wait up to 2 hours for notarization
    for i in $(seq 1 120); do
        for j in 1 2; do # check twice a minute
            sleep 30
            xcrun altool --notarization-info "$uuid" -u "$username" -p "$password" | tee "notarize-info.out"    
            if grep "You must specify a uuid" notarize-info.out &>/dev/null; then
                exit 1
            fi
            status=$(grep "Status:" notarize-info.out | awk '{print $2}')
            if [[ "$status" = "invalid" ]]; then
                exit 1
            fi
            if [[ "$status" = "success" ]]; then
                xcrun stapler staple "$dmg"
                exit 0
            fi
        done
    done
    echo "Notarization timed out."
    exit 1
else
    echo "Usage: $0 (notarize | staple) <dmg>"
    exit 1
fi