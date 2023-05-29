import { MethodologyDataType, MethodologyTypeData } from '../Types';

export const GetMethodologyObj = (
  methodologyType: MethodologyTypeData,
  normativeDirection: 'increase' | 'decrease' | 'not increase' | 'not decrease',
  targetValue?: number,
) => {
  const methodologyObj: MethodologyDataType | 'NA' =
    methodologyType === 'Not Available'
      ? 'NA'
      : methodologyType === 'Numerical'
      ? targetValue
        ? {
            normativeDirection,
            CAGRLimit: [0.01, 0.005, -0.01],
            trendMethodology: 'CAGRR',
            baselineYear: {
              all: 2015,
            },
            targetValue,
          }
        : {
            normativeDirection,
            CAGRLimit: [0.01, 0.005, -0.01],
            trendMethodology: 'CAGRA',
            baselineYear: {
              all: 2015,
            },
          }
      : methodologyType === 'Binary'
      ? {
          value: targetValue as number,
          trendMethodology: 'Binary',
          baselineYear: {
            all: 2015,
          },
        }
      : methodologyType === 'Likert'
      ? {
          targetValue,
          normativeDirection,
          trendMethodology: 'Likert',
          baselineYear: {
            all: 2015,
          },
        }
      : methodologyType === 'Doubling'
      ? {
          trendMethodology: 'Doubling',
          baselineYear: {
            all: 2015,
          },
        }
      : {
          trendMethodology: 'Halfing',
          baselineYear: {
            all: 2015,
          },
        };
  return methodologyObj;
};
