import { Input, InputNumber, Modal, Radio, Select } from 'antd';
import { useState } from 'react';
import sortBy from 'lodash.sortby';
import {
  FormDataType,
  MethodologyDataType,
  MethodologyTypeData,
  NormativeDirectionDataType,
  TimeSeriesDataTypeWithId,
} from '../Types';

interface Props {
  indicatorList: string[];
  setAddSeriesModalVisible: (_d: boolean) => void;
  indexNo: number;
  updateData: (_d: TimeSeriesDataTypeWithId) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckUndefinedOrNull = (d: any) => {
  if (d === undefined || d === null) return true;
  return false;
};

const getMethodologyObj = (
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

const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';

  for (let i = 0; i < 3; i += 1) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  randomString += '_';

  for (let i = 0; i < 3; i += 1) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  randomString += '_';
  for (let i = 0; i < 4; i += 1) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomString;
};

export function AddSeries(props: Props) {
  const { indicatorList, setAddSeriesModalVisible, indexNo, updateData } =
    props;
  const [values, setValues] = useState<FormDataType[]>([]);
  const [clicked, setClicked] = useState(false);
  const [seriesDescription, setSeriesDescription] = useState('');
  const [methodologyType, setMethodologyType] =
    useState<MethodologyTypeData>('Not Available');

  const [normativeDirection, setNormativeDirection] =
    useState<NormativeDirectionDataType>('increase');
  const [selectedIndicator, setSelectedIndicator] = useState<
    string | undefined
  >(undefined);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const methodologyOptions = [
    'Not Available',
    'Numerical',
    'Binary',
    'Likert',
    'Halfing',
    'Doubling',
  ];

  const updateObject = (
    id: number,
    newName: number,
    objKey: 'value' | 'year',
  ) => {
    const updatedArray = values.map(obj => {
      if (obj.id === id) {
        if (objKey === 'value') return { ...obj, value: newName };
        return { ...obj, year: newName };
      }
      return obj;
    });

    setValues(updatedArray); // Update the state with the new array
  };

  return (
    <Modal
      className='undp-modal'
      open
      onCancel={() => {
        setAddSeriesModalVisible(false);
      }}
      onOk={() => {
        setAddSeriesModalVisible(false);
      }}
      width='80vw'
    >
      <div className='margin-bottom-07'>
        <p className='label'>Series Description</p>
        {clicked ? (
          seriesDescription ? (
            <Input
              className='undp-input'
              style={{ width: '100%' }}
              value={seriesDescription}
              onChange={e => {
                setSeriesDescription(e.target.value);
              }}
            />
          ) : (
            <Input
              className='undp-input'
              style={{ width: '100%' }}
              value={seriesDescription}
              onChange={e => {
                setSeriesDescription(e.target.value);
              }}
              status='error'
            />
          )
        ) : (
          <Input
            className='undp-input'
            style={{ width: '100%' }}
            value={seriesDescription}
            onChange={e => {
              setSeriesDescription(e.target.value);
            }}
          />
        )}
      </div>
      <div className='margin-bottom-07'>
        <p className='label'>Select indicator</p>
        {clicked ? (
          selectedIndicator ? (
            <Select
              className='undp-select'
              defaultValue='Select an indicator'
              value={selectedIndicator}
              onChange={e => {
                setSelectedIndicator(e);
              }}
            >
              {indicatorList.map((d, i) => (
                <Select.Option className='undp-select-option' value={d} key={i}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Select
              className='undp-select'
              defaultValue='Select an indicator'
              value={selectedIndicator}
              onChange={e => {
                setSelectedIndicator(e);
              }}
              status='error'
            >
              {indicatorList.map((d, i) => (
                <Select.Option className='undp-select-option' value={d} key={i}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          )
        ) : (
          <Select
            className='undp-select'
            defaultValue='Select an indicator'
            value={selectedIndicator}
            onChange={e => {
              setSelectedIndicator(e);
            }}
          >
            {indicatorList.map((d, i) => (
              <Select.Option className='undp-select-option' value={d} key={i}>
                {d}
              </Select.Option>
            ))}
          </Select>
        )}
      </div>
      <hr className='undp-style margin-bottom-07' />
      <div>
        <h5 className='undp-typography margin-bottom-07'>Update Data</h5>
        <div className='flex-div margin-bottom-03'>
          <h6
            className='undp-typography margin-bottom-02'
            style={{ width: 'calc(50% - 1rem)' }}
          >
            Year
          </h6>
          <h6
            className='undp-typography margin-bottom-02'
            style={{ width: 'calc(50% - 1rem)' }}
          >
            Value
          </h6>
        </div>
        {values.map((d, i) => (
          <div
            key={i}
            className='flex-div margin-bottom-05 felx-vert-align-center'
          >
            <InputNumber
              className='undp-input'
              style={{ width: 'calc(50% - 1rem)' }}
              value={d.year}
              onChange={e => {
                updateObject(d.id, e as number, 'year');
              }}
            />
            <InputNumber
              className='undp-input'
              style={{ width: 'calc(50% - 1rem)' }}
              value={d.value}
              onChange={e => {
                updateObject(d.id, e as number, 'value');
              }}
            />
            <button
              type='button'
              className='undp-button button-tertiary'
              onClick={() => {
                setValues([...values].filter(el => el.id !== d.id));
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          className='undp-button button-tertiary'
          onClick={() => {
            const newValue: FormDataType = {
              id: values.length,
            };
            setValues([...values, newValue]);
          }}
        >
          Add new value
        </button>
      </div>
      <hr className='undp-style margin-bottom-07' />
      <h5 className='undp-typography margin-bottom-07'>Update Methodology</h5>
      <p className='label'>Methodology Type</p>
      <Radio.Group
        className='undp-button-radio margin-bottom-07'
        onChange={d => {
          setMethodologyType(d.target.value);
        }}
        value={methodologyType}
      >
        {methodologyOptions.map((d, i) => (
          <Radio.Button className='undp-radio' key={i} value={d}>
            {d}
          </Radio.Button>
        ))}
      </Radio.Group>
      {methodologyType === 'Likert' || methodologyType === 'Numerical' ? (
        <>
          <p className='label'>Normative Direction</p>
          <Radio.Group
            className='undp-button-radio margin-bottom-07'
            onChange={d => {
              setNormativeDirection(d.target.value);
            }}
            value={normativeDirection}
          >
            <Radio className='undp-radio' value='increase'>
              increase
            </Radio>
            <Radio className='undp-radio' value='not decrease'>
              not decrease
            </Radio>
            <Radio className='undp-radio' value='decrease'>
              decrease
            </Radio>
            <Radio className='undp-radio' value='not increase'>
              not increase
            </Radio>
          </Radio.Group>
        </>
      ) : null}
      {methodologyType === 'Likert' ||
      methodologyType === 'Numerical' ||
      methodologyType === 'Binary' ? (
        <>
          <p className='label'>Target value</p>
          {clicked ? (
            CheckUndefinedOrNull(targetValue) ? (
              <InputNumber
                className='undp-input margin-bottom-07'
                style={{ width: 'calc(50% - 1rem)' }}
                value={targetValue}
                onChange={e => {
                  setTargetValue(e);
                }}
                status='error'
              />
            ) : (
              <InputNumber
                className='undp-input margin-bottom-07'
                style={{ width: 'calc(50% - 1rem)' }}
                value={targetValue}
                onChange={e => {
                  setTargetValue(e);
                }}
              />
            )
          ) : (
            <InputNumber
              className='undp-input margin-bottom-07'
              style={{ width: 'calc(50% - 1rem)' }}
              value={targetValue}
              onChange={e => {
                setTargetValue(e);
              }}
            />
          )}
        </>
      ) : null}
      <button
        type='button'
        className='undp-button button-secondary button-arrow'
        onClick={() => {
          setClicked(true);
          if (selectedIndicator && seriesDescription) {
            if (methodologyType === 'Binary' || methodologyType === 'Likert') {
              if (!CheckUndefinedOrNull(targetValue)) {
                const methodologyObj: MethodologyDataType | 'NA' =
                  getMethodologyObj(
                    methodologyType,
                    normativeDirection,
                    targetValue || undefined,
                  );
                const updatedData: TimeSeriesDataTypeWithId = {
                  'Reporting Type': 'G',
                  series: generateRandomString(),
                  seriesDescription,
                  id: `series_id_${indexNo}`,
                  goal: `${
                    selectedIndicator.replaceAll('Indicator ', '').split('.')[0]
                  }`,
                  target: `${
                    selectedIndicator.replaceAll('Indicator ', '').split('.')[0]
                  }.${
                    selectedIndicator.replaceAll('Indicator ', '').split('.')[1]
                  }`,
                  indicator: selectedIndicator.replaceAll('Indicator ', ''),
                  values: sortBy(
                    values
                      .filter(
                        d =>
                          !CheckUndefinedOrNull(d.value) &&
                          !CheckUndefinedOrNull(d.year),
                      )
                      .map(d => ({
                        value: d.value as number,
                        year: d.year as number,
                        label: d.label,
                      })),
                    'year',
                  ),
                  methodology: methodologyObj,
                };
                updateData(updatedData);
                setAddSeriesModalVisible(false);
              }
            } else {
              const methodologyObj: MethodologyDataType | 'NA' =
                getMethodologyObj(
                  methodologyType,
                  normativeDirection,
                  targetValue || undefined,
                );
              const updatedData: TimeSeriesDataTypeWithId = {
                'Reporting Type': 'G',
                series: generateRandomString(),
                seriesDescription,
                id: `series_id_${indexNo}`,
                goal: `${
                  selectedIndicator.replaceAll('Indicator ', '').split('.')[0]
                }`,
                target: `${
                  selectedIndicator.replaceAll('Indicator ', '').split('.')[0]
                }.${
                  selectedIndicator.replaceAll('Indicator ', '').split('.')[1]
                }`,
                indicator: selectedIndicator.replaceAll('Indicator ', ''),
                values: sortBy(
                  values
                    .filter(
                      d =>
                        !CheckUndefinedOrNull(d.value) &&
                        !CheckUndefinedOrNull(d.year),
                    )
                    .map(d => ({
                      value: d.value as number,
                      year: d.year as number,
                      label: d.label,
                    })),
                  'year',
                ),
                methodology: methodologyObj,
              };
              updateData(updatedData);
              setAddSeriesModalVisible(false);
            }
          }
        }}
      >
        Save Data & Methodology
      </button>
    </Modal>
  );
}
