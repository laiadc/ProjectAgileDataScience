#!/bin/bash

rm SKM/ -r
cp ../../Model/SKMlib/SKM . -r
source  .flaskEnv/bin/activate
export FLASK_APP=server.py
python3.6 -m flask run --host=0.0.0.0 --cert=adhoc
source deactivate
