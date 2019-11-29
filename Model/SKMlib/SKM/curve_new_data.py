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



def get_predicted_curves(test_df):
  
  """
  This function returns x and y values to plot the survivorship curve of a test for a patient.
  @args:
   - test_df: a pandas.DataFrame containing the columns ['missLymp', 'missLAB', 'missBIO', 'missBIO2', 'missNEU']
   - path_to_model: string with the path to the model
  @returns:
   - curve_x: the x values for the survivorship curve. This indicates time in months.
   - curve_y: the y values for the survivorship curve. This indicates probability to survive.
  """

  n_tests = test_df.shape[0]

  x = []
  y = []

  #load model
  estimator_loaded = load_model('data/ExtraST_model.zip')

  #load features used by the model
  features = pd.read_csv("data/Features_ExtraST_model.csv").iloc[:,1]

  for i in range(n_tests):
    test = test_df.iloc[i]
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
    test = test[features.values]

    #Predict survival curve
    curve_y = estimator_loaded.predict_survival(test.values).flatten()
    curve_x = np.arange(1,len(curve_y)+1,1)

    x.append(curve_x)
    y.append(curve_y)

  return x, y


'''Example of use

test = pd.read_csv('data/test.csv')
test = test.iloc[0]

curve_x, curve_y = get_predicted_curves(test)

plt.plot(curve_x,curve_y)

'''