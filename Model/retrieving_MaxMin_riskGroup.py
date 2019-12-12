import pandas as pd
import numpy as np
import warnings
import matplotlib.pyplot as plt
warnings.simplefilter('ignore')
from preprocess_newdata import preprocess_newdata
from pysurvival.utils import load_model
from pysurvival.models.survival_forest import ExtraSurvivalTreesModel



def retrieving_MaxMin_riskGroup(risk_group, data_path = 'data/train.csv'):
    """
    This function retrieves the survival curve of the patient with maximum and minimum
    risk for the risk_group specified in the input.
    risk_group can be 1, 2 or 3
    The output is: times (domain of the curve), survival_curve_min (curve of the
    minimum risk patient) and survival_curve_max (curve of the maximum risk patient)
    """

    ############# Preprocess data according to the model #############

    #load model
    estimator_loaded = load_model('data/ExtraST_model.zip')

    #load features used by the model
    features = pd.read_csv('data/Features_ExtraST_model.csv').iloc[:,1]
    features.drop(features[features == 'missBIO2'].index, inplace = True)

    #read the dataset
    test_df = pd.read_csv(data_path)

    #Select only the features used by the classifier
    test_df = test_df[features]

    #Fill missing columns (corresponding to missing values)
    test_df.fillna(0, inplace=True)

    #Target encoding + normalization
    test_df = preprocess_newdata(test_df)

    #read risk encoding information
    thr_info = pd.read_csv('data/thresholds.csv')
    thr_12 = thr_info['Threshold1-2'][0]
    thr_23 = thr_info['Threshold2-3'][0]
    norm_info = thr_info['Normalization_max'][0]

    #get the risk of the patients
    risk = estimator_loaded.predict_risk(test_df)
    risk = np.log(risk)/norm_info

    #cluster the patients according to their risk group
    if risk_group == 1:
        patient_index = np.where(risk < thr_12)[0]
    elif risk_group == 2:
        patient_index = np.where((thr_12 < risk) & (risk < thr_23))[0]
    else:
        patient_index = np.where(risk>thr_23)[0]

    #get the index of the patient with maximum and minimum risk within each group
    aux = np.argmax(risk[patient_index])
    maximum_patient = patient_index[aux]
    aux = np.argmin(risk[patient_index])
    minimum_patient = patient_index[aux]

    survival_curve_min = estimator_loaded.predict_survival(test_df.iloc[minimum_patient]).flatten()
    survival_curve_max = estimator_loaded.predict_survival(test_df.iloc[maximum_patient]).flatten()
    times = np.arange(survival_curve_max.shape[0])

    return  times, survival_curve_min, survival_curve_max


    """
    Working example:
    times, survival_curve_min, survival_curve_max = retrieving_MaxMin_riskGroup(3)
    """
