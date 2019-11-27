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
import matplotlib.colors as colors
import matplotlib.cm as cmx
warnings.simplefilter('ignore')

from preprocess_newdata import preprocess_newdata
from pysurvival.utils import load_model


def get_predicted_curves(test_df, path_to_model):
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
  estimator_loaded = load_model(path_to_model)

  #load features used by the model
  features = pd.read_csv("trained_models/Features_RF_model.csv").iloc[:,1]

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

def plot_predicted_curve(test_df, path_to_model, filename):
  """
  This function plots the survivorship curve of a test for a patient.
  @args:
   - test_df: a pandas.DataFrame containing the columns ['missLymp', 'missLAB', 'missBIO', 'missBIO2', 'missNEU'].
   - path_to_model: string with the path to the model.
   - filename: The filename for the image. The path will be 'imgs/surv_curve_'+filename+'.png'.
  @returns:
   - fig: The figure object in case you want to do any modification.
  """

  fig = plt.figure(figsize=(20,10))
  xlim = 0
  n_tests = test_df.shape[0]

  jet = cm = plt.get_cmap('jet') 
  cNorm  = colors.Normalize(vmin=0, vmax=n_tests)
  scalarMap = cmx.ScalarMappable(norm=cNorm, cmap=jet)

  curve_x, curve_y = get_predicted_curves(test_df, path_to_model)

  for test in range(n_tests):
    x = curve_x[test]
    y = curve_y[test]
    plt.plot(x, y, '-', color=scalarMap.to_rgba(test))
    if xlim < x[-1]+1:
      xlim = x[-1]+1

  plt.legend(labels=['test_'+str(i) for i in range(n_tests)])
  plt.xlim((0, xlim))
  plt.title('Survivorship curve')
  plt.xlabel('Time (months)')
  plt.ylabel('Survival probability')
  plt.ylim((0,1.01))  
  plt.savefig('imgs/surv_curve_' + filename + '.png', dpi=300, transparent=False)
  plt.show()

  return fig

'''Example of use

test = pd.read_csv('data/test.csv') # dataset with the test patients
test = test.iloc[0] # select first patient
path_to_model = 'RF_model.zip' # path to model

fig = plot_predicted_curve(test, path_to_model, 'test_patient_00')

'''