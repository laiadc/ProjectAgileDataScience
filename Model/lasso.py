#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
import warnings
warnings.simplefilter('ignore')

from sklearn.linear_model import Ridge, RidgeCV, ElasticNet, LassoCV, LassoLarsCV
from sklearn.model_selection import cross_val_score


def rmse_cv(model, X_train, y_train):
    rmse = np.sqrt(cross_val_score(model, X_train, y_train, scoring='accuracy', cv = 5))
    return(rmse)

def Lasso_importance(X_train, y_train):

    '''
    This function returns the Lasso coefficients for the given training and test sets.
    Moreover, it says how many coefficients were set to 0 and it displays a bar plot
    displaying the values of the coefficient for 20 features. The first 10 features are
    the ones with lower coefficients (sorted in an ascending way). The other 10 are
    the ones with higher coefficients (also sorted in an ascending way).
    '''

    model_lasso = LassoCV(alphas = [1, 0.1, 0.001, 0.0005],random_state=42).fit(X_train, y_train)
   # print('RMSE :',rmse_cv(model_lasso, X_train, y_train).mean())
    coef = pd.Series(model_lasso.coef_, index = X_train.columns)
    print("Lasso set coefficient equal to 0 to " +  str(sum(coef == 0)) + " features out of " + str(len(coef)))

    #Plot the importance of the coef.
    imp_coef = pd.concat([coef.sort_values().head(10),
                     coef.sort_values().tail(10)])
    matplotlib.rcParams['figure.figsize'] = (8.0, 10.0)
    imp_coef.plot(kind = "barh")
    plt.title("Coefficients in the Lasso Model")
    return coef
