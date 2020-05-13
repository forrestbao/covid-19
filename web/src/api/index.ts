import Model from '../lib/svm_model'
import { svm_predict_with_model } from '../lib/svm_inference'

export const getSVMPredict = (
  input: number[]
): Promise<1 | -1> => {
  return new Promise((resolve) => {
    const res = svm_predict_with_model(
      // this is user's input, an array of N numbers
      [...input],


      // this is the raw string of pretrained model file
      Model.str_Model_Mild_Vs_Viral,

      // this is the scaling parameters N * 2
      Model.feature_scaling_string
    )
    resolve(res)
  })
}
