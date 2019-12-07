import pandas as pd
from cleaning import missingData

def preprocess_newdata(dataset):
    '''
    This function takes a dataset in the form of a pandas DataFrame and returns
    another pandas DataFrame with the preprocessed data. By preprocessed data, we mean
    encoding (binary and target encoding) + normalization.
    Moreover, we convert the T0 column into numbers and remove the ID column.
    '''

    #deal with the T0 and ID columns

    dataset.T0_date = pd.to_datetime(dataset.T0_date).dt.year
    dataset.T0_date = dataset.T0_date.astype(float)

    #read the encoding information stored in the encoding_information.csv file
    encoding_information = pd.read_csv('data/encoding_information.csv')

    #determine the numerical columns
    numerical_columns = list(dataset._get_numeric_data().columns)

    #replace each value for the preprocessed one
    for column in dataset.columns:
        if column in numerical_columns:
            max_val = encoding_information[encoding_information['Feature'] == column]['Enc_info'].iloc[0]
            min_val = encoding_information[encoding_information['Feature'] == column]['Enc_info'].iloc[1]
            if max_val != 0:
                dataset[column] = (dataset[column]-min_val)/max_val
        else:
            aux = encoding_information[encoding_information['Feature'] == column]
            for i in range(len(aux)):
                val = aux.iloc[i][1]
                enc_info = aux.iloc[i][2]
                dataset[column].replace(val, enc_info, inplace=True)

    return dataset

    #dataset.to_csv(r'data/preprocessed_' + file_name, index=False)
