#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AGILE DATA SCIENCE PROJECT
MISSING IMPUTAION

@author: Laia Domingo Colomer
"""

import pandas as pd
import numpy as np
import warnings
warnings.simplefilter('ignore')

from missingpy import KNNImputer
#pip install missingpy

def imputeKNN (data, k):
    imputer = KNNImputer(n_neighbors=k)
    X = imputer.fit_transform(data) 
    return pd.DataFrame(X)

def missingData(data):
    #Drop slnb_ldn_location_total becuse it has too many missing
    data.drop("slnb_ldn_location_total",axis=1, inplace=True)
    
    #Missing lymp nodes
    #create a new variable for missing lymp
    lymp = [ "total_count_slnb_ldn", "total_positives_slnb_ldn"]
    missLymp = pd.DataFrame({'missLymp':np.zeros(data.shape[0])})

    aux = data[lymp]
    miss = aux.apply(lambda x: np.sum(pd.isnull(x)), axis=1)
    missLymp[miss==3] = 1
    
    #Replace missing values with 0
    aux2 = aux[miss==3]
    aux2.fillna(0, inplace=True)
    aux[miss==3] = aux2

    data[lymp] = aux
    data['missLymp'] = missLymp.values

    #The patients with scenario= scenario1 have had no lymp node biopsy, then we set the biopsy parameters to 0
    aux = data[data.scenario=="scenario1"]
    aux[lymp]=0
    data[data.scenario=="scenario1"]  = aux

    #Missing LAB variables
    #create a new variable for missing LAB
    LAB = ["LAB1300","LAB1301","LAB1307","LAB1309","LAB1311","LAB1313","LAB1314",
              "LAB1316","LAB2404","LAB2405", "LAB2406","LAB2407","LAB2419","LAB2422" ,"LAB2467",                               
              "LAB2469" ,"LAB2476","LAB2498" ,"LAB2544","LAB2679" , "LAB4176" ]

    missLAB = pd.DataFrame({'missLAB':np.zeros(data.shape[0])})

    aux = data[LAB]
    miss = aux.apply(lambda x: np.sum(pd.isnull(x)), axis=1)
    missLAB[miss==21] = 1
    
    #Replace missing values with 0
    aux2 = aux[miss==21]
    aux2.fillna(0, inplace=True)
    aux[miss==21] = aux2

    data[LAB] = aux
    data['missLAB'] = missLAB.values
    
    #Missing biopsy data
    #create a new variable for biopsy data
    BIO = ["cutaneous_biopsy_satellitosis","cutaneous_biopsy_vascular_invasion",
                    "cutaneous_biopsy_neurotropism",
                    "cutaneous_biopsy_lymphatic_invasion","cutaneous_biopsy_mitotic_index" ]

    missBIO = pd.DataFrame({'missBIO':np.zeros(data.shape[0])})

    aux = data[BIO]
    miss = aux.apply(lambda x: np.sum(pd.isnull(x)), axis=1)
    missBIO[miss>3] = 1
    aux2 = aux[miss>3]
    #Replace missing values with Unknown
    aux2.fillna("Unknown", inplace=True)
    aux[miss>3] = aux2

    data[BIO] = aux
    data['missBIO'] = missBIO.values

    #Missing biopsy data 2
    #create a new variable for biopsy data
    BIO2 = ["cutaneous_biopsy_regression","cutaneous_biopsy_associated_nevus",
                    "cutaneous_biopsy_predominant_cell_type"]

    missBIO2 = pd.DataFrame({'missBIO2':np.zeros(data.shape[0])})

    aux = data[BIO2]
    miss = aux.apply(lambda x: np.sum(pd.isnull(x)), axis=1)
    missBIO2[miss==3] = 1
    #Replace missing values with Unknown
    aux2 = aux[miss==3]
    aux2.fillna("Unknown", inplace=True)
    aux[miss==3] = aux2

    data[BIO2] = aux
    data['missBIO2'] = missBIO2.values

    #Missing visceral metastasis location
    data.visceral_metastasis_location = data.visceral_metastasis_location.fillna("None")
    
    #Missing M1CR
    data.MC1R = data.MC1R.fillna(1)
    #Fill mitotic index
    data.cutaneous_biopsy_mitotic_index = data.cutaneous_biopsy_mitotic_index.fillna(0)
    #Missing count_inv_prec_tumour and count_sity_prec_tumour
    data.count_inv_prec_tumour = data.count_inv_prec_tumour.fillna(0)
    data.count_situ_prec_tumour = data.count_situ_prec_tumour.fillna(0)
    
    #Missing Neutrofil
    #create a new variable for biopsy data
    NEU = ["neutrofils_per_limfocits","limfocits_per_monocits",
                     "LABGF_filtrat_glomerular" ]

    missNEU = pd.DataFrame({'missNEU':np.zeros(data.shape[0])})

    aux = data[NEU]
    miss = aux.apply(lambda x: np.sum(pd.isnull(x)), axis=1)
    missNEU[miss==3] = 1
    #Fill missing with 0
    aux2 = aux[miss==3]
    aux2.fillna(0, inplace=True)
    aux[miss==3] = aux2

    data[NEU] = aux
    data['missNEU'] = missNEU.values

    #missing personal data
    personal = ['patient_eye_color','patient_hair_color','patient_phototype']

    aux = data[personal]
    miss = aux.apply(lambda x: np.sum(pd.isnull(x)), axis=1)

    aux2 = aux[miss>=3]
    #fill with 0/other
    aux2.patient_phototype.fillna(0, inplace=True)
    aux2.patient_eye_color.fillna("other", inplace=True)
    aux2.patient_hair_color.fillna("other", inplace=True)
    aux[miss>=3] = aux2

    data[personal] = aux
    
    #Fill na of primary_tumour_location_coded and scenario
    data.primary_tumour_location_coded = data.primary_tumour_location_coded.fillna('other')
    data.scenario = data.scenario.fillna("scenario1")
    
    #Missing data imputation: We use KNN imputation to impute the values which have some missing but not all
    # for each cathegory
    data[LAB] = imputeKNN(data[LAB],5)

    data[lymp] = imputeKNN(data[lymp],5)
    
    data[NEU] = imputeKNN(data[NEU],5)
    
    #For the cathegorical variables we need to convert tu dummies, do KNN imputation and then revert dummies
    aux = imputeKNN(pd.get_dummies(data[personal]),5)
    aux.columns = pd.get_dummies(data[personal]).columns
    eye_color = ['patient_eye_color_black','patient_eye_color_blue', 'patient_eye_color_brown',
           'patient_eye_color_green', 'patient_eye_color_other']
    hair_color = ['patient_hair_color_black', 'patient_hair_color_blond','patient_hair_color_brown',
                  'patient_hair_color_other','patient_hair_color_red']

    aux2 = aux[eye_color]
    aux2.columns = ["black","blue","brown","green","other"] 
    eye = aux2.apply(lambda x: np.argmax(x), axis=1)

    aux2 = aux[hair_color]
    aux2.columns = ["black","blond","brown","other","red"] 
    hair = aux2.apply(lambda x: np.argmax(x), axis=1)

    patient_phototype = aux.patient_phototype
    
    data.patient_eye_color = eye
    data.patient_hair_color = hair
    data.patient_phototype = patient_phototype
    
    Biopsy = ['cutaneous_biopsy_ulceration',
       'cutaneous_biopsy_satellitosis', 'cutaneous_biopsy_vascular_invasion',
       'cutaneous_biopsy_neurotropism', 'cutaneous_biopsy_lymphatic_invasion',
       'cutaneous_biopsy_predominant_cell_type',
       'cutaneous_biopsy_associated_nevus', 
       'cutaneous_biopsy_histological_subtype', 'cutaneous_biopsy_regression']

    aux = imputeKNN(pd.get_dummies(data[Biopsy]),5)
    aux.columns = pd.get_dummies(data[Biopsy]).columns

    b1 = ['cutaneous_biopsy_satellitosis_Unknown','cutaneous_biopsy_satellitosis_absent',
          'cutaneous_biopsy_satellitosis_present']
    aux2 = aux[b1]
    aux2.columns = ["Unknown","absent","present"] 
    data.cutaneous_biopsy_satellitosis = aux2.apply(lambda x: np.argmax(x), axis=1)

    b2 = ['cutaneous_biopsy_vascular_invasion_Unknown',
           'cutaneous_biopsy_vascular_invasion_absent',
           'cutaneous_biopsy_vascular_invasion_present']

    aux2 = aux[b2]
    aux2.columns = ["Unknown","absent","present"] 
    data.cutaneous_biopsy_vascular_invasion = aux2.apply(lambda x: np.argmax(x), axis=1)

    b3 = ['cutaneous_biopsy_neurotropism_Unknown',
           'cutaneous_biopsy_neurotropism_absent',
           'cutaneous_biopsy_neurotropism_present']
    aux2 = aux[b3]
    aux2.columns = ["Unknown","absent","present"] 
    data.cutaneous_biopsy_neurotropism = aux2.apply(lambda x: np.argmax(x), axis=1)

    b4 = ['cutaneous_biopsy_lymphatic_invasion_Unknown',
           'cutaneous_biopsy_lymphatic_invasion_absent',
           'cutaneous_biopsy_lymphatic_invasion_present']
    aux2 = aux[b4]
    aux2.columns = ["Unknown","Absent","Present"] 
    data.cutaneous_biopsy_lymphatic_invasion = aux2.apply(lambda x: np.argmax(x), axis=1)

    b5 = ['cutaneous_biopsy_regression_absent',
           'cutaneous_biopsy_regression_extensive',
           'cutaneous_biopsy_regression_partial']

    aux2 = aux[b5]
    aux2.columns = ["Unknown","absent","present"] 
    data.cutaneous_biopsy_regression = aux2.apply(lambda x: np.argmax(x), axis=1)

    b6 = ['cutaneous_biopsy_associated_nevus_Unknown',
           'cutaneous_biopsy_associated_nevus_absent',
           'cutaneous_biopsy_associated_nevus_present']
    aux2 = aux[b6]
    aux2.columns = ["Unknown","absent","present"] 
    data.cutaneous_biopsy_associated_nevus = aux2.apply(lambda x: np.argmax(x), axis=1)


    b7 = ['cutaneous_biopsy_ulceration_absent',
           'cutaneous_biopsy_ulceration_present']

    aux2 = aux[b7]
    aux2.columns = ["absent","present"] 
    data.cutaneous_biopsy_ulceration = aux2.apply(lambda x: np.argmax(x), axis=1)

    b8 = ['cutaneous_biopsy_satellitosis_Unknown',
           'cutaneous_biopsy_satellitosis_absent',
           'cutaneous_biopsy_satellitosis_present']
    aux2 = aux[b8]
    aux2.columns = ["Unknown","absent","present"] 
    data.cutaneous_biopsy_satellitosis = aux2.apply(lambda x: np.argmax(x), axis=1)


    b9 = ['cutaneous_biopsy_predominant_cell_type_Unknown',
           'cutaneous_biopsy_predominant_cell_type_epitheloid',
           'cutaneous_biopsy_predominant_cell_type_fusocellular',
           'cutaneous_biopsy_predominant_cell_type_other',
           'cutaneous_biopsy_predominant_cell_type_pleomorphic',
           'cutaneous_biopsy_predominant_cell_type_sarcomatoid',
           'cutaneous_biopsy_predominant_cell_type_small_cell']#,
           #'cutaneous_biopsy_predominant_cell_type_spindle']

    aux2 = aux[b9]
    aux2.columns = ["Unknown", "epitheloid","fusocellular", "other", "plemorphic",
                    "sarcomathoid", "small_cell"]#, "spindle"] 
    data.cutaneous_biopsy_predominant_cell_type = aux2.apply(lambda x: np.argmax(x), axis=1)

    b10 = ['cutaneous_biopsy_histological_subtype_acral_lentiginous',
           'cutaneous_biopsy_histological_subtype_desmoplastic',
           'cutaneous_biopsy_histological_subtype_lentiginous_malignant',
           'cutaneous_biopsy_histological_subtype_mucosal',
           'cutaneous_biopsy_histological_subtype_nevoid',
           'cutaneous_biopsy_histological_subtype_nodular',
           'cutaneous_biopsy_histological_subtype_other',
           'cutaneous_biopsy_histological_subtype_spitzoid',
           'cutaneous_biopsy_histological_subtype_superficial_spreading']

    aux2 = aux[b10]
    aux2.columns = ["acral_lentiginous", "desmoplastic","lentiginous_malignant", "mocosal", "nevoid",
                   "nodular", "other", "spitzoid", "superficial_spreading"] 
    data.cutaneous_biopsy_histological_subtype = aux2.apply(lambda x: np.argmax(x), axis=1)
    
    return data
