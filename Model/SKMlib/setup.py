# -*- coding: utf-8 -*-
"""
Created on Fri Nov 22 15:48:41 2019

Setup file 
@author: Laia Domingo Colomer

"""
from setuptools import setup, find_packages

setup(
    name='SkinCancerModel',
    version='0.1.0',
    description='Skin cancer Model to predict the survival curve of patients.',
    author='Agile Data Science Team 1',
    url='https://github.com/laiadc/ProjectAgileDataScience',
    packages=find_packages(include=['SKM', 'SKM.*']),
    install_requires=[
        'pysurvival',
        'pandas',
        'numpy',
        'matplotlib',
        'warnings',
    ],
    package_data={'SKM': ['data/encoding_information.csv'],
                  'SKM': ['data/Features_RF_model.csv'],
                  'SKM': ['data/RF_model.zip']}
)
