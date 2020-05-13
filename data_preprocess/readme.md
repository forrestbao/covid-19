# Setup for COVID-19 SVM web portal

## Dataset

"mild_vs_viral.svmlight" is used to generate the SVM model.

## Generate the SVM model 

1. Copy and paste the "mild_vs_viral.svmlight" file into "data_preprocess" folder.

2. Generate the scaled training dataset by running 

```
svm-scale -s scaled_parameters.txt mild_vs_viral.svmlight  > mild_vs_viral.scaled
```

and make sure that scaled_parameters.txt is generated successfully.

3. Train the model by running

```
svm-train -w1 86  -w-1 208 -t 2 -c 64 -g 0.0009765625 -b 1 mild_vs_viral.scaled  output.txt
```

which uses the parameters "C=64, g=0.0009765625" from Table 3. Remember to remove "-v 2" to disable cross validation. Make sure that the final model file "output.txt" is generated succesfully.

## Import parameters and models to web portal

1. Copy and paste the whole string of model file "output.txt" into svm_model.tsx and replace the string assigned to "str_Model_Mild_Vs_Viral";

2. Copy and paste scaling parameters file "scaled_parameters.txt" from line 3 to the end and replace the string assigend to "feature_scaling_string".

