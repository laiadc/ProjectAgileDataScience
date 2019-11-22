# -*- coding: utf-8 -*-
"""
Created on Thu Nov 21 18:10:54 2019

File to get the survival curve for a new patient

@author: Laia Domingo Colomer
"""

import pandas as pd
import numpy as np
import warnings
import matplotlib.pyplot as plt
warnings.simplefilter('ignore')

from preprocess_newdata import preprocess_newdata
from pysurvival.utils import load_model


def get_predicted_curves(test, path_to_model):
  #Fill missing columns (corresponding to missing values)
  missCols = pd.DataFrame([[0,0,0,0,0]],columns = ['missLymp', 'missLAB', 'missBIO',
        'missBIO2', 'missNEU'])
  aux = pd.concat([test,missCols.T], axis=1)
  test = aux.iloc[:,0].T
  test.fillna(0, inplace=True)
  test = test.to_frame().T

  #Target encoding + normalization
  test = preprocess_newdata(test)

  #Select only the features used by the classifier
  features = pd.read_csv("Features_RF_model.csv").iloc[:,1]
  test = test[features.values]

  #load model
  estimator_loaded = load_model(path_to_model)

  #Predict survival curve
  curve_y = estimator_loaded.predict_survival(test.values).flatten()
  curve_x = np.arange(1,len(curve_y)+1,1)

  return curve_x, curve_y


'''Example of use

test = pd.read_csv('data/test.csv')
test = test.iloc[0]
path_to_model = '/content/ProjectAgileDataScience/RF_model.zip'

curve_x, curve_y = get_predicted_curves(test, path_to_model)

plt.plot(curve_x,curve_y)

'''