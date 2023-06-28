export type StatusType = 'On Track' | 'Identified Gap' | 'For Review';

export interface IndicatorStatusType {
  goal: string;
  target: string;
  indicator: string;
  status: StatusType | null;
}
export interface TargetStatusType {
  goal: string;
  target: string;
  status: StatusType | null;
}

export interface GoalStatusType {
  goal: number;
  noOfIndicatorsWithData: number;
  status: StatusType | null;
}

export interface ValuesDataType {
  year: number;
  value: number;
  label?: string;
  addedByCO?: boolean;
}

export interface MethodologyDataType {
  targetValue?: number;
  value?: number;
  normativeDirection?:
    | 'increase'
    | 'decrease'
    | 'not increase'
    | 'not decrease';
  CAGRLimit?: number[];
  trendMethodology:
    | 'CAGRR'
    | 'CAGRA'
    | 'Binary'
    | 'Likert'
    | 'AARRR'
    | 'CAGRR+AARRR'
    | 'Doubling'
    | 'Halfing'
    | 'SpecialGINI';
  baselineYear: {
    all: number;
  };
}

export interface TimeSeriesDataTypeWOValue {
  series: string;
  goal: string;
  target: string;
  indicator: string;
  seriesDescription: string;
  currentLevelAssessment?: 'string';
  methodology: MethodologyDataType | 'NA';
  Age?: string;
  Location?: string;
  Sex?: string;
  'Reporting Type'?: string;
  Quantile?: string;
  'Name of international institution'?: string;
  'Type of product'?: string;
  'Food Waste Sector'?: string;
  Activity?: string;
  'Level of requirement'?: string;
  'Frequency of Chlorophyll-a concentration'?: string;
  'Mountain Elevation'?: string;
  'Type of speed'?: string;
  'Name of non-communicable disease'?: string;
  'Type of occupation'?: string;
  'IHR Capacity'?: string;
  'Education level'?: string;
  'Type of skill'?: string;
  'Level/Status'?: string;
  'Deviation Level'?: string;
  'Mode of transportation'?: string;
  'Type of renewable technology'?: string;
  'Fiscal intervention stage'?: string;
  Counterpart?: string;
  Cities?: string;
  'Sampling Stations'?: string;
  status?:
    | 'Target Achieved'
    | 'On Track'
    | 'Target Not Achieved'
    | 'Fair progress but acceleration needed'
    | 'Limited or No Progress'
    | 'Insufficient Data'
    | 'No Data After 2015'
    | 'Deterioration';
  'Custodian_Agency(ies)': string;
  'Partner_Agency(ies)': string;
  Tier_Classification: string;
}

export interface TimeSeriesDataType extends TimeSeriesDataTypeWOValue {
  values: ValuesDataType[];
}

export interface CountryDataType {
  countryCode: string;
  goalStatus: GoalStatusType[];
  targetStatus: TargetStatusType[];
  indicatorStatus: IndicatorStatusType[];
  tsData: TimeSeriesDataType[];
}

export interface FormDataType {
  year?: number;
  value?: number;
  label?: string;
  id: number;
  addedByCO: boolean;
}

export interface TimeSeriesDataTypeWithId extends TimeSeriesDataTypeWOValue {
  id: string;
  values: FormDataType[];
  comment?: string;
  'Additional Source'?: string;
}

export type MethodologyTypeData =
  | 'Not Available'
  | 'Binary'
  | 'Likert'
  | 'Halfing'
  | 'Doubling'
  | 'Numerical';

export type KeyToRemoveData = 'currentLevelAssessment' | 'id' | 'status';

export type NormativeDirectionDataType =
  | 'increase'
  | 'decrease'
  | 'not increase'
  | 'not decrease';

export interface TargetsDataType {
  Target: string;
  'Target Description': string;
  Indicators: {
    Indicator: string;
    'Indicator Description': string;
  }[];
}
