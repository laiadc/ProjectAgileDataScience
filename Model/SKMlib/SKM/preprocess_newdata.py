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
    #numerical_columns = list(dataset._get_numeric_data().columns)
    numerical_columns = ['patient_phototype', 'T0_date', 'cutaneous_biopsy_breslow', 'cutaneous_biopsy_mitotic_index',
    'count_inv_prec_tumour','count_situ_prec_tumour', 'total_count_slnb_ldn','total_positives_slnb_ldn','MC1R',
    'age','specific_death','months_survival','LAB1300','LAB1301','LAB1307','LAB1309','LAB1311','LAB1313','LAB1314',
    'LAB1316','LAB2404','LAB2405','LAB2406','LAB2407','LAB2419','LAB2422','LAB2467','LAB2469','LAB2476','LAB2498',
    'LAB2544','LAB2679','LAB4176','neutrofils_per_limfocits','limfocits_per_monocits','LABGF_filtrat_glomerular',
    'missLymp','missLAB', 'missBIO','missBIO2','missNEU']

    #replace each value for the preprocessed one
    for column in dataset.columns:
        if column in numerical_columns:
            max_val = encoding_information[encoding_information['Feature'] == column]['Enc_info'].iloc[0]
            min_val = encoding_information[encoding_information['Feature'] == column]['Enc_info'].iloc[1]
            dataset[column] = dataset[column].astype(float)
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
