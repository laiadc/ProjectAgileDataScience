import pandas as pd
from cleaning import missingData

def csv_encodings(file_name):
    '''
    The file must be a csv stored in the folder called 'data' in the same direcory as this python file
    This function creates a csv file containing the encodings of the features and stores it in the 'data' folder
    '''

    dataset = pd.read_csv("data/"+file_name)

    #missing inputation
    dataset = missingData(dataset)

    #deal with the T0 and ID columns
    dataset.T0_date = pd.to_datetime(dataset.T0_date).dt.year
    dataset.T0_date = dataset.T0_date.astype(float)
    dataset.drop(['ID'], axis = 1, inplace=True)

    ############################## ENCODINGS ##############################

    #determine the categorical and numerical columns
    numerical_columns = list(dataset._get_numeric_data().columns)
    numerical_columns.append('cutaneous_biopsy_mitotic_index')
    categorical_columns = list(set(dataset.columns) - set(numerical_columns))
    categorical_columns_binary = ['patient_gender','cutaneous_biopsy_associated_nevus','cutaneous_biopsy_lymphatic_invasion','cutaneous_biopsy_vascular_invasion','cutaneous_biopsy_ulceration','cutaneous_biopsy_neurotropism','cutaneous_biopsy_satellitosis']
    categorical_columns_target = [col for col in categorical_columns if col not in categorical_columns_binary]

    #create the dataframe containing the encoding information regarding the binary features
    for column in categorical_columns_binary:
        if column == 'patient_gender':
            data = [[column,'female',1], [column,'male',0]]
            df = pd.DataFrame(data, columns = ['Feature','Values','Enc_info'])

        else:
            data = [[column,'present',1],[column,'absent',0],[column,'Unknown',0]]
            df_aux = pd.DataFrame(data, columns = ['Feature','Values','Enc_info'])
            df = pd.concat([df, df_aux], ignore_index=True)

    #create the dataframe containing the encoding information regarding the non-binary features
    for column in categorical_columns_target:
        group = dataset[[column,'months_survival']].groupby(column).mean()
        max_val = max(group['months_survival'])
        min_val = min(group['months_survival'])
        for i in range(len(group['months_survival'])):
            data = [[column, group['months_survival'].index[i], (group['months_survival'][i]-min_val)/max_val]]
            df_aux = pd.DataFrame(data, columns = ['Feature','Values','Enc_info'])
            df = pd.concat([df, df_aux], ignore_index=True)

    #create the dataframe containing the encoding information regarding the numerical features
    for column in numerical_columns:
        if column != 'cutaneous_biopsy_mitotic_index':
            data = [[column, 'max', max(dataset[column])],[column, 'min', min(dataset[column])]]
        else:
            dataset_aux = dataset[dataset.cutaneous_biopsy_mitotic_index != 'Unknown']['cutaneous_biopsy_mitotic_index']
            data = [[column, 'max', max(dataset_aux)],[column, 'min', min(dataset_aux)]]
        df_aux = pd.DataFrame(data, columns = ['Feature', 'Values', 'Enc_info'])
        df = pd.concat([df, df_aux], ignore_index=True)

    df.to_csv(r'data/encoding_information.csv', index=False)
