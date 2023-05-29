import { InputNumber, Radio } from 'antd';
import { useState } from 'react';
import sortBy from 'lodash.sortby';
import {
  FormDataType,
  MethodologyDataType,
  MethodologyTypeData,
  TimeSeriesDataTypeWithId,
} from '../Types';
import { CheckUndefinedOrNull } from '../Utils/CheckUndefinedOrNull';
import { GetMethodologyObj } from '../Utils/GetMethodologyObj';

interface Props {
  data: TimeSeriesDataTypeWithId;
  setEditMode: (_d: boolean) => void;
  updateData: (_d: TimeSeriesDataTypeWithId) => void;
}

export function SeriesEditMode(props: Props) {
  const { data, setEditMode, updateData } = props;
  const [values, setValues] = useState<FormDataType[]>(
    data.values.map((d, i) => ({ ...d, id: i })),
  );
  const [error, setError] = useState(false);
  const [methodologyType, setMethodologyType] = useState<MethodologyTypeData>(
    data.methodology === 'NA'
      ? 'Not Available'
      : data.methodology.trendMethodology === 'Binary'
      ? 'Binary'
      : data.methodology.trendMethodology === 'Likert'
      ? 'Likert'
      : data.methodology.trendMethodology === 'Halfing'
      ? 'Halfing'
      : data.methodology.trendMethodology === 'Doubling'
      ? 'Doubling'
      : 'Numerical',
  );

  const [normativeDirection, setNormativeDirection] = useState(
    data.methodology !== 'NA'
      ? data.methodology.normativeDirection || 'increase'
      : 'increase',
  );

  const [targetValue, setTargetValue] = useState(
    data.methodology !== 'NA'
      ? data.methodology.trendMethodology === 'Binary' ||
        data.methodology.trendMethodology === 'Likert' ||
        data.methodology.trendMethodology === 'CAGRR'
        ? data.methodology.targetValue || data.methodology.value
        : undefined
      : undefined,
  );
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
    <>
      <div className='margin-bottom-07'>
        <h6 className='undp-typography margin-bottom-02'>Series Description</h6>
        <p className='undp-typography'>{data.seriesDescription}</p>
        <div className='flex-div flex-wrap margin-top-05'>
          {data.Sex ? (
            <div className='undp-chip'>
              Sex: <span className='bold'>{data.Sex}</span>
            </div>
          ) : null}
          {data.Age ? (
            <div className='undp-chip'>
              Age: <span className='bold'>{data.Age}</span>
            </div>
          ) : null}
          {data.Location ? (
            <div className='undp-chip'>
              Location: <span className='bold'>{data.Location}</span>
            </div>
          ) : null}
          {data.Quantile ? (
            <div className='undp-chip'>
              Quantile: <span className='bold'>{data.Quantile}</span>
            </div>
          ) : null}
          {data['Name of international institution'] ? (
            <div className='undp-chip'>
              Name of international institution:{' '}
              <span className='bold'>
                {data['Name of international institution']}
              </span>
            </div>
          ) : null}
          {data['Type of product'] ? (
            <div className='undp-chip'>
              Type of product:{' '}
              <span className='bold'>{data['Type of product']}</span>
            </div>
          ) : null}
          {data['Food Waste Sector'] ? (
            <div className='undp-chip'>
              Food waste sector:{' '}
              <span className='bold'>{data['Food Waste Sector']}</span>
            </div>
          ) : null}
          {data.Activity ? (
            <div className='undp-chip'>
              Activity: <span className='bold'>{data.Activity}</span>
            </div>
          ) : null}
          {data['Level of requirement'] ? (
            <div className='undp-chip'>
              Level of requirement:{' '}
              <span className='bold'>{data['Level of requirement']}</span>
            </div>
          ) : null}
          {data['Frequency of Chlorophyll-a concentration'] ? (
            <div className='undp-chip'>
              Frequency of Chlorophyll-a concentration:{' '}
              <span className='bold'>
                {data['Frequency of Chlorophyll-a concentration']}
              </span>
            </div>
          ) : null}
          {data['Mountain Elevation'] ? (
            <div className='undp-chip'>
              Mountain Elevation:{' '}
              <span className='bold'>{data['Mountain Elevation']}</span>
            </div>
          ) : null}
          {data['Type of speed'] ? (
            <div className='undp-chip'>
              Type of speed:{' '}
              <span className='bold'>{data['Type of speed']}</span>
            </div>
          ) : null}
          {data['Name of non-communicable disease'] ? (
            <div className='undp-chip'>
              Name of non-communicable disease:{' '}
              <span className='bold'>
                {data['Name of non-communicable disease']}
              </span>
            </div>
          ) : null}
          {data['Type of occupation'] ? (
            <div className='undp-chip'>
              Type of occupation:{' '}
              <span className='bold'>{data['Type of occupation']}</span>
            </div>
          ) : null}
          {data['IHR Capacity'] ? (
            <div className='undp-chip'>
              IHR Capacity: <span className='bold'>{data['IHR Capacity']}</span>
            </div>
          ) : null}
          {data['Education level'] ? (
            <div className='undp-chip'>
              Education level:{' '}
              <span className='bold'>{data['Education level']}</span>
            </div>
          ) : null}
          {data['Type of skill'] ? (
            <div className='undp-chip'>
              Type of skill:{' '}
              <span className='bold'>{data['Type of skill']}</span>
            </div>
          ) : null}
          {data['Level/Status'] ? (
            <div className='undp-chip'>
              Level/Status: <span className='bold'>{data['Level/Status']}</span>
            </div>
          ) : null}
          {data['Deviation Level'] ? (
            <div className='undp-chip'>
              Deviation Level:{' '}
              <span className='bold'>{data['Deviation Level']}</span>
            </div>
          ) : null}
          {data['Mode of transportation'] ? (
            <div className='undp-chip'>
              Mode of transportation:{' '}
              <span className='bold'>{data['Mode of transportation']}</span>
            </div>
          ) : null}
          {data['Type of renewable technology'] ? (
            <div className='undp-chip'>
              Type of renewable technology:{' '}
              <span className='bold'>
                {data['Type of renewable technology']}
              </span>
            </div>
          ) : null}
          {data['Fiscal intervention stage'] ? (
            <div className='undp-chip'>
              Fiscal intervention stage:{' '}
              <span className='bold'>{data['Fiscal intervention stage']}</span>
            </div>
          ) : null}
          {data.Counterpart ? (
            <div className='undp-chip'>
              Counterpart: <span className='bold'>{data.Counterpart}</span>
            </div>
          ) : null}
          {data.Cities ? (
            <div className='undp-chip'>
              Cities: <span className='bold'>{data.Cities}</span>
            </div>
          ) : null}
          {data['Sampling Stations'] ? (
            <div className='undp-chip'>
              Sampling Stations:{' '}
              <span className='bold'>{data['Sampling Stations']}</span>
            </div>
          ) : null}
        </div>
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
          setError(false);
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
          {error ? (
            <InputNumber
              className='undp-input margin-bottom-07'
              style={{ width: 'calc(50% - 1rem)' }}
              value={targetValue === undefined ? null : targetValue}
              onChange={e => {
                setTargetValue(e === null ? undefined : e);
              }}
              status='error'
            />
          ) : (
            <InputNumber
              className='undp-input margin-bottom-07'
              style={{ width: 'calc(50% - 1rem)' }}
              value={targetValue === undefined ? null : targetValue}
              onChange={e => {
                setTargetValue(e === null ? undefined : e);
              }}
            />
          )}
        </>
      ) : null}
      <button
        type='button'
        className='undp-button button-secondary button-arrow'
        onClick={() => {
          if (methodologyType === 'Binary' || methodologyType === 'Likert') {
            if (CheckUndefinedOrNull(targetValue)) {
              setError(true);
            } else {
              setEditMode(false);
              const methodologyObj: MethodologyDataType | 'NA' =
                GetMethodologyObj(
                  methodologyType,
                  normativeDirection,
                  targetValue,
                );
              const updatedData: TimeSeriesDataTypeWithId = {
                ...data,
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
            }
          } else {
            setEditMode(false);
            const methodologyObj: MethodologyDataType | 'NA' =
              GetMethodologyObj(
                methodologyType,
                normativeDirection,
                targetValue,
              );
            const updatedData: TimeSeriesDataTypeWithId = {
              ...data,
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
          }
        }}
      >
        Save Data & Methodology
      </button>
    </>
  );
}
