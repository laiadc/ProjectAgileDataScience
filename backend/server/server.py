from flask import Flask, json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from SKM import get_predicted_curves
import os



cred = credentials.Certificate("./firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

os.chdir(os.getcwd()+'/SKM')


app = Flask(__name__)
#app.run(host='0.0.0.0')

@app.route('/test/<testId>')
def test_process(testId):
    print("testid: ", testId)
    db = firestore.client()
    test_model = db.collection(u'tests').document(testId)
    
    try:
        doc = test_model.get()
        test_dict = doc.to_dict()
        try:
            del test_dict['test_date']
        except:
            pass
        try: 
            del test_dict['id']
        except:
            pass
        try:
            del test_dict['isProcessed']
        except:
            pass
        try:
            del test_dict['patientId']
        except:
            pass
        try: 
            del test_dict['predictedCurvePoints']
        except:
            pass
        print(test_dict)
        curve_x, curve_y = get_predicted_curves(**test_dict)
        print('length', len(curve_y.tolist()), len(curve_x.tolist()) )
        test_model.set({
            'isProcessed': True,
            'predictedCurvePoints': curve_y.tolist()
        }, merge=True)
        print(curve_y)
    except Exception as e:
        print(u'No such document!', e)
    
    response = app.response_class(
        response={},
        status=200,
        mimetype='application/json'
    )
    return response
