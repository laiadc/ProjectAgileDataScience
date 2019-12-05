import pandas as pd
import numpy as np
import warnings
import matplotlib.pyplot as plt
warnings.simplefilter('ignore')
from preprocess_newdata import preprocess_newdata
from pysurvival.utils import load_model
from pysurvival.models.survival_forest import ExtraSurvivalTreesModel
from cleaning import missingData



def identify_risk_group(cutaneous_biopsy_ulceration, scenario, cutaneous_biopsy_histological_subtype, cutaneous_biopsy_breslow,
    total_count_slnb_ldn, visceral_metastasis_location,total_positives_slnb_ldn,patient_hair_color,
    cutaneous_biopsy_lymphatic_invasion,patient_eye_color,cutaneous_biopsy_mitotic_index,age,
    patient_phototype, cutaneous_biopsy_satellitosis, MC1R,cutaneous_biopsy_vascular_invasion,
    cutaneous_biopsy_regression,LAB2419,T0_date,LAB2406,LAB1307,patient_gender,LAB2469,LAB2544,
    neutrofils_per_limfocits,cutaneous_biopsy_neurotropism,LAB2467,LAB1309,primary_tumour_location_coded,
    LAB2476,LAB2679,LAB2404, cutaneous_biopsy_predominant_cell_type, LAB2407,LAB1301,LAB2498, thr_file):
    """
    This function returns the group of risk of the given set of patients test_df
    given as a dataframe. The variable thr_file gives the vsc file storing the
    thresholds information.
    For instance, it can be called:
    identify_risk_group(pd.read_csv('data/train.csv'), 'thresholds.csv')
    """

    ############# Preprocess data according to the model #############

    #load model
    estimator_loaded = load_model('trained_models/ExtraST_model.zip')

    #load features used by the model
    features = pd.read_csv('trained_models/Features_ExtraST_model.csv').iloc[:,1]

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

    #Target encoding + normalization
    test_df = preprocess_newdata(test_df)

    #Select only the features used by the classifier
    test_df = test_df[features.values]

    ############# Identify risk group #############

    #read risk encoding information
    thr_info = pd.read_csv(thr_file)
    thr_12 = thr_info['Threshold1-2'][0]
    thr_23 = thr_info['Threshold2-3'][0]
    norm_info = thr_info['Normalization_max'][0]

    #get the risk for each patient
    risk = estimator_loaded.predict_risk(test_df)

    #normalize the risk
    risk = np.log(risk)/norm_info

    #identify the risk group
    risk_group = np.zeros([len(risk)])
    for i in range(len(risk)):
        if risk[i]<thr_12:
            risk_group[i] = int(1)
        elif thr_12 < risk[i] < thr_23:
            risk_group[i] = int(2)
        else:
            risk_group[i] = int(3)

    return risk_group
