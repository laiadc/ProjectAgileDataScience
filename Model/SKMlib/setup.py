# -*- coding: utf-8 -*-
"""
Created on Fri Nov 22 15:48:41 2019

Setup file 
@author: Laia Domingo Colomer

"""
from setuptools import setup, find_packages

setup(
    name='SKM',
    version='0.1.0',
    description='Skin cancer Model to predict the survival curve of patients.',
    author='Agile Data Science Team 1',
    url='https://github.com/laiadc/ProjectAgileDataScience',
    packages=find_packages(),
    install_requires=[
        'pysurvival',
        'pandas',
        'numpy',
        'matplotlib',
        'missingpy'
    ],
    package_data={'SKM': ['data/encoding_information.csv'],
                  'SKM': ['data/Features_ExtraST_model.csv'],
                  'SKM': ['data/ExtraST_model.zip'],
		  'SKM': ['data/thresholds.csv']}
)
