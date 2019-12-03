# -*- coding: utf-8 -*-
"""
Created on Thu Nov 21 18:10:54 2019

File to get the survival curve for a new patient

@author: Laia Domingo Colomer
"""

import pandas as pd
import numpy as np
import warnings
warnings.simplefilter('ignore')

from preprocess_newdata import preprocess_newdata
from pysurvival.utils import load_model



def get_predicted_curves(cutaneous_biopsy_ulceration, scenario, cutaneous_biopsy_histological_subtype, cutaneous_biopsy_breslow,
    total_count_slnb_ldn, visceral_metastasis_location,total_positives_slnb_ldn,patient_hair_color,
    cutaneous_biopsy_lymphatic_invasion,patient_eye_color,cutaneous_biopsy_mitotic_index,age,
    patient_phototype, cutaneous_biopsy_satellitosis, MC1R,cutaneous_biopsy_vascular_invasion,
    cutaneous_biopsy_regression,LAB2419,T0_date,LAB2406,LAB1307,patient_gender,LAB2469,LAB2544,
    neutrofils_per_limfocits,cutaneous_biopsy_neurotropism,LAB2467,LAB1309,primary_tumour_location_coded,
    LAB2476,LAB2679,LAB2404, cutaneous_biopsy_predominant_cell_type, LAB2407,LAB1301,LAB2498):
  
    """
    This function returns x and y values to plot the survivorship curve of a test for a patient.
    @args:
    -cutaneous_biopsy_ulceration...LAB2498: numerical variables from the patient and tests 
    @returns:
    - curve_x: the x values for the survivorship curve. This indicates time in months.
    - curve_y: the y values for the survivorship curve. This indicates probability to survive.
    """

   

    #load model
    estimator_loaded = load_model('data/ExtraST_model.zip')

    #load features used by the model
    features = pd.read_csv("data/Features_ExtraST_model.csv").iloc[:,1]
    
    missBIO2=0
    
    test = pd.DataFrame([[cutaneous_biopsy_ulceration, scenario, cutaneous_biopsy_histological_subtype,   cutaneous_biopsy_breslow,
        total_count_slnb_ldn, visceral_metastasis_location,total_positives_slnb_ldn,patient_hair_color,
        cutaneous_biopsy_lymphatic_invasion,patient_eye_color,cutaneous_biopsy_mitotic_index,age,
        patient_phototype, cutaneous_biopsy_satellitosis, MC1R,cutaneous_biopsy_vascular_invasion,
        cutaneous_biopsy_regression,LAB2419,T0_date,missBIO2,LAB2406,LAB1307,patient_gender,LAB2469,LAB2544,
        neutrofils_per_limfocits,cutaneous_biopsy_neurotropism,LAB2467,LAB1309,primary_tumour_location_coded,
        LAB2476,LAB2679,LAB2404, cutaneous_biopsy_predominant_cell_type, LAB2407,LAB1301,LAB2498]], columns=features)

    n_tests = test.shape[0]
    #Fill missing columns (corresponding to missing values)
    test.fillna(0, inplace=True)

    #Target encoding + normalization
    test = preprocess_newdata(test)

    #Select only the features used by the classifier
    test = test[features.values]

    #Predict survival curve
    curve_y = estimator_loaded.predict_survival(test.values).flatten()
    curve_x = np.arange(1,len(curve_y)+1,1)

    return curve_x, curve_y



'''Example of use

curve_x,curve_y = get_predicted_curves('absent', 'scenario1','superficial_spreading', '0.5',
                 float('NaN'),float('NaN'),float('NaN'),
                 'brown', 'absent','brown',
                 0,35.5,2.0,'absent',0,'absent', float('NaN'),float('NaN'), '2003-11-07', 
                 14,0.8,'female',181,1.4,0.3652,
                 'absent',1,2.19,'lower limbs',99,0.04,20,float('NaN'),0.3,244,71)

plt.plot(curve_x,curve_y)

'''