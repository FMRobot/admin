#!/usr/bin/env bash
    echo "SERVER.SH have been executed";
    quit;
    npm install;
    if [ $? != 0 ]; then
        echo 'NPM INSTALL FAILED';
        quit;
    fi
    echo "DEPLOY COMPLETED";
