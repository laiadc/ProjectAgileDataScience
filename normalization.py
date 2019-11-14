import pandas as pd
import numpy as np

def normalization(train, test):
    '''
    train and test are of type pandas DataFrame
    '''

    #find the columns where the normalization is going to be performed: desired_columns
    all_columns = train.columns
    all_columns = list(all_columns)
    all_columns.remove('ID')

    #Remove the binary ones
    desired_columns =[]
    for i in all_columns:
        num_diff_elem = len(train[i].unique())
        if num_diff_elem > 2:
            desired_columns.append(i)

    #perform the normalization
    for i in desired_columns:
        #train set
        max_val = np.max(train[i])
        min_val = np.min(train[i])
        train[i] = (train[i]-min_val)/max_val

        #test set
        max_val = np.max(test[i])
        min_val = np.min(test[i])
        test[i] = (test[i]-min_val)/max_val

    return train, test
