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

export interface TimeSeriesDataType {
  series: string;
  goal: string;
  target: string;
  indicator: string;
  seriesDescription: string;
  values: ValuesDataType[];
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
}

export interface TimeSeriesDataTypeWithId extends TimeSeriesDataType {
  id: string;
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
