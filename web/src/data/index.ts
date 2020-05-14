import { Unit } from '../components/UnitDisplay'

type FeatureBase = {
  name: string
}

interface Feature extends FeatureBase {
  type: 'base'
}

interface Gender extends FeatureBase {
  type: 'gender'
}

type FeatureInput = ((Feature & { unit: Unit }) | Gender) & {
  error: boolean
}

export const formData: FeatureInput[] = [
  { type: 'base', name: 'Count of White blood cell (WBC)', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'Hemoglobin (HGB)', error: false, unit: 'g/L' },
  { type: 'base', name: 'Platelet', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'Neutrophil percentage', error: false, unit: '%' },
  { type: 'base', name: 'Neutrophil count', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'Lymphocyte percentage', error: false, unit: '%' },
  { type: 'base', name: 'Lymphocyte count', error: false, unit: '10<sup>3</sup>/mL' },
  { type: 'base', name: 'C-reaction protein (CRP)', error: false, unit: 'mg/L' },
  {
    type: 'base',
    name: 'Total bilirubin (TBL)',
    error: false,
    unit: [['umol/L', value => (value / 17.1036)], ['mg/dL']]
  },
  {
    type: 'base',
    name: 'Blood urea nitrogen (BUN)',
    error: false,
    unit: [['mmol/L', value => (value / 0.3571)], ['mg/dL']]
  },
  { type: 'base', name: 'Creatinine', error: false, unit: [['umol/L', value => (value / 88.417)], ['mg/dL']] },
  { type: 'base', name: 'Lactate dehydrogenase (LDH)', error: false, unit: 'U/L' },
  { type: 'base', name: 'D-dimer', error: false, unit: 'mg/L' },
  { type: 'base', name: 'Age', error: false, unit: '' },
  { type: 'gender', name: 'Gender', error: false }
]
