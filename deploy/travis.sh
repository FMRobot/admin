#!/usr/bin/env bash
    npm install
    if [ $? != 0 ]; then
        echo 'NPM INSTALL FAILED'
        quit
    fi
    echo $PWD
