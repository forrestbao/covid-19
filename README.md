# Triaging moderate COVID-19 and other viral pneumonia from routine blood tests

[![github pages](https://github.com/forrestbao/covid-19/workflows/github%20pages/badge.svg)](https://forrestbao.github.io/covid-19/)

## Ready-to-use trained models 
Trained SVM models are placed under [models](./models) folders. 

**Scikit-learn's SVC model**: The scaler and estimator are pickled into a pickle file. Suppose `X_raw` below is an array-like variable representing a 1x15 feature vector. Then this can be your Python snippet: 
```python3
import pickle
[scaler, estimator] = pickle.load(open('sklearn_scaler_and_model.p', 'rb'))
X_scaled = scaler.transform(X_raw)
estimator.predict(X_scaled)

```

**libsvm model**: The scaler file is `mild_vs_viral.scaler` and the model file is `mild_vs_viral.model`.  Suppose a 15-d feature vector is placed in a file `test.input` in svmlight format. Then this can be your commands: 
```shell
svm-scale -r mild_vs_viral.scaler test.input > test.scaled
svm-predict test.scaled mild_vs_viral.model test.prediction_output 
```

The scaler file is loaded via the `-r` option when scaling data in `svm-scale`. The model file is loaded as a mandatory argument when making predictions in `svm-predict`. 
