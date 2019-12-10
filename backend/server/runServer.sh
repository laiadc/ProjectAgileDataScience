#!/bin/bash

source  .flaskEnv/bin/activate
export FLASK_APP=server.py
python3.6 -m flask run --host=0.0.0.0 
source deactivate
