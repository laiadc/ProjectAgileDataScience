import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def compute_statistics(test):
	features = pd.read_csv("trained_models/Features_RF_model.csv").iloc[:,1]
	train = pd.read_csv('data/train.csv')
	features = list(set(train.columns).intersection(set(features))) # filter those that are not on the dataset
	features = [features[x] for x in np.where((train[features].dtypes == 'float64').tolist())[0]] #get features which are numeral

	fig = plt.figure(figsize=(100, 30))
	plt.subplots_adjust(wspace=1, hspace=1)

	for i, ft in enumerate(features):
	    ax = plt.subplot(4,10,i+1)
	    data_train = train[ft].to_numpy()
	    data_train = data_train[~np.isnan(data_train)]
	    
	    ax = sns.distplot(data_train, axlabel=ft, ax=ax)
	    ymin, ymax = ax.get_ylim()
	    ax.plot([test[ft], test[ft]], [ymin, ymax], 'r-')

	plt.show()

