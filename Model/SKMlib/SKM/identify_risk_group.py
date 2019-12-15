import pandas as pd
import numpy as np
import warnings
import matplotlib.pyplot as plt
warnings.simplefilter('ignore')
from .preprocess_newdata import preprocess_newdata
from pysurvival.utils import load_model
from pysurvival.models.survival_forest import ExtraSurvivalTreesModel
#from .cleaning import missingData



def identify_risk_group(cutaneous_biopsy_ulceration, scenario, cutaneous_biopsy_histological_subtype, cutaneous_biopsy_breslow,
    total_count_slnb_ldn, visceral_metastasis_location,total_positives_slnb_ldn,patient_hair_color,
    cutaneous_biopsy_lymphatic_invasion,patient_eye_color,cutaneous_biopsy_mitotic_index,age,
    patient_phototype, cutaneous_biopsy_satellitosis, MC1R,cutaneous_biopsy_vascular_invasion,
    cutaneous_biopsy_regression,LAB2419,T0_date,LAB2406,LAB1307,patient_gender,LAB2469,LAB2544,
    neutrofils_per_limfocits,cutaneous_biopsy_neurotropism,LAB2467,LAB1309,primary_tumour_location_coded,
    LAB2476,LAB2679,LAB2404, cutaneous_biopsy_predominant_cell_type, LAB2407,LAB1301,LAB2498):
    """
    This function returns the group of risk of the given set of patients test_df
    given as a dataframe. The variable thr_file gives the vsc file storing the
    thresholds information.
    """

    ############# Preprocess data according to the model #############

    #load model
    estimator_loaded = load_model('data/ExtraST_model.zip')

    #load features used by the model
    features = pd.read_csv('data/Features_ExtraST_model.csv').iloc[:,1]

    missBIO2=0

    test_df = pd.DataFrame([[cutaneous_biopsy_ulceration, scenario, cutaneous_biopsy_histological_subtype,   cutaneous_biopsy_breslow,
        total_count_slnb_ldn, visceral_metastasis_location,total_positives_slnb_ldn,patient_hair_color,
        cutaneous_biopsy_lymphatic_invasion,patient_eye_color,cutaneous_biopsy_mitotic_index,age,
        patient_phototype, cutaneous_biopsy_satellitosis, MC1R,cutaneous_biopsy_vascular_invasion,
        cutaneous_biopsy_regression,LAB2419,T0_date,missBIO2,LAB2406,LAB1307,patient_gender,LAB2469,LAB2544,
        neutrofils_per_limfocits,cutaneous_biopsy_neurotropism,LAB2467,LAB1309,primary_tumour_location_coded,
        LAB2476,LAB2679,LAB2404, cutaneous_biopsy_predominant_cell_type, LAB2407,LAB1301,LAB2498]], columns=features)

    #Fill missing columns (corresponding to missing values)
    test_df.fillna(0, inplace=True)

    #Select only the features used by the classifier
    test_df = test_df[features.values]

    #Target encoding + normalization
    test_df = preprocess_newdata(test_df)

    ############# Identify risk group #############

    #read risk encoding information
    thr_info = pd.read_csv('data/thresholds.csv')
    thr_12 = thr_info['Threshold1-2'][0]
    thr_23 = thr_info['Threshold2-3'][0]
    norm_info = thr_info['Normalization_max'][0]

    #get the risk for each patient
    risk = estimator_loaded.predict_risk(test_df)

    #normalize the risk
    risk = np.log(risk)/norm_info

    #identify the risk group
    if risk<thr_12:
        risk_group = int(1)
    elif thr_12 < risk < thr_23:
        risk_group = int(2)
    else:
        risk_group = int(3)

    return risk_group


"""
Example of use
identify_risk_group('absent', 'scenario1','superficial_spreading', 0.5, float('NaN'),float('NaN'),float('NaN'),
                    'brown', 'absent','brown',0,35.5,2.0,'absent',0,'absent', float('NaN'),float('NaN'),
                    '2003-11-07',14,0.8,'female',181,1.4,0.3652,'absent',1,2.19,'lower limbs',99,0.04,20,
                    float('NaN'),0.3,244,71)
"""

def identify_risk_group_df(test_df, estimator_loaded):
     ############# Identify risk group #############

    #read risk encoding information
    thr_info = pd.read_csv('data/thresholds.csv')
    thr_12 = thr_info['Threshold1-2'][0]
    thr_23 = thr_info['Threshold2-3'][0]
    norm_info = thr_info['Normalization_max'][0]

    #get the risk for each patient
    risk = estimator_loaded.predict_risk(test_df)

    #normalize the risk
    risk = np.log(risk)/norm_info

    #identify the risk group
    if risk<thr_12:
        risk_group = int(1)
    elif thr_12 < risk < thr_23:
        risk_group = int(2)
    else:
        risk_group = int(3)

    return risk_group
    
