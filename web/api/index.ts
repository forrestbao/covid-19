import Model from '../lib/svm_model'
import { svm_predict_with_model } from '../lib/svm_inference'

export const getSVMPredict = (
  input: [number, number, number, number, number, number, number, number, number, number, number, number]
): Promise<1 | -1> => {
  return new Promise((resolve) => {
    const res = svm_predict_with_model(
      // this is user's input, an array of 12 numbers
      [...input],
      // this is an array of minimum values of each dimension from svm-scale
      Model.feature_min_Model_Severe_Vs_Mild,
      // this is an array of maximux values of each dimension from svm-scale
      Model.feature_max_Model_Severe_Vs_Mild,
      // this is the raw string of pretrained model file
      Model.str_Model_Severe_Vs_Mild
    )
    resolve(res)
  })
}
