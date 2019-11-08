import pandas as pd
import datetime


def binary_encoding(train, test):
    '''
    train and test are of type pandas DataFrame
    '''

    #Columns where we want to perform the binary_encoding
    target_columns = ['cutaneous_biopsy_associated_nevus','cutaneous_biopsy_lymphatic_invasion','cutaneous_biopsy_vascular_invasion','cutaneous_biopsy_ulceration','cutaneous_biopsy_neurotropism','cutaneous_biopsy_satellitosis']

    #perform binary encoding in patient_gender
    elements = train['patient_gender'].unique()
    train['patient_gender'].replace({elements[0] : 0, elements[1] : 1},inplace=True)
    test['patient_gender'].replace({elements[0] : 0, elements[1] : 1},inplace=True)


    #perform the binary encoding
    for i in target_columns:
        train[i].replace({'present' : 1, 'absent' : 0, 'Unknown': 0},inplace=True)
        test[i].replace({'present' : 1, 'absent' : 0, 'Unknown': 0},inplace=True)

    return train, test



def target_encoding(train, test):
    '''
    train and test are of type pandas DataFrame
    '''

    #Find the columns where we want to perform the target encoding
    target_columns = list(set(train.columns) - set(train._get_numeric_data().columns))
    categorical_columns.remove(['T0_date','ID','patient_gender'])

    #perform the target_encoding
    for column in target_columns:
        group = train[[column,'months_survival']].groupby(column).mean()
        for i in range(len(group['months_survival'])):
            train[column].replace(group['months_survival'].index[i],group['months_survival'][i], inplace=True)
            test[column].replace(group['months_survival'].index[i],group['months_survival'][i], inplace=True)

    return train, test
