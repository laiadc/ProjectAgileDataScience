#!/bin/bash

rm -rf .flaskEnv/
pyvenv-3.6 .flaskEnv
source  .flaskEnv/bin/activate
pip3.6 install --no-cache-dir --user pysurvival
pip3.6 install -r requirements.txt
pip3.6 install --user firebase-admin
sudo easy_install -U gunicorn
cp ../../Model/SKMlib/SKM . -r
source deactivate
