import { Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import { FormDataType, TimeSeriesDataTypeWithId } from '../Types';
import { CheckUndefinedOrNull } from '../Utils/CheckUndefinedOrNull';

interface Props {
  data: TimeSeriesDataTypeWithId;
  setEditMode: (_d: boolean) => void;
  indicatorList: string[];
  updateData: (_d: TimeSeriesDataTypeWithId) => void;
}

export function SeriesEditMode(props: Props) {
  const { data, setEditMode, updateData, indicatorList } = props;
  const [values, setValues] = useState<FormDataType[]>(
    data.values.map((d, i) => ({ ...d, id: i })),
  );
  const [duplicateValue, setDuplicateValue] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(
    `Indicator ${data.indicator}`,
  );
  const [comment, setComment] = useState(data.comment || '');
  const [sourceInfo, setSourceInfo] = useState(data['Additional Source'] || '');
  const [clicked, setClicked] = useState(false);
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
        setEditMode(false);
      }}
      onOk={() => {
        setEditMode(false);
      }}
      width='80vw'
    >
      <>
        <div className='margin-bottom-07'>
          <h6 className='undp-typography margin-bottom-02'>
            Series Description
          </h6>
          <p className='undp-typography'>{data.seriesDescription}</p>
          <div className='margin-bottom-07'>
            <p className='label'>Select indicator</p>
            <Select
              className='undp-select'
              defaultValue='Select an indicator'
              value={selectedIndicator}
              disabled={!data.series.includes('[GOV]')}
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
          </div>
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
                IHR Capacity:{' '}
                <span className='bold'>{data['IHR Capacity']}</span>
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
                Level/Status:{' '}
                <span className='bold'>{data['Level/Status']}</span>
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
                <span className='bold'>
                  {data['Fiscal intervention stage']}
                </span>
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
            <div
              className='undp-button button-tertiary'
              style={{ color: 'var(--white)', cursor: 'default' }}
            >
              Remove
            </div>
          </div>
          {values.map((d, i) => (
            <div
              key={i}
              className='flex-div margin-bottom-05 flex-vert-align-center'
            >
              <InputNumber
                className='undp-input'
                style={{ width: 'calc(50% - 1rem)' }}
                disabled={!d.addedByCO}
                value={d.year}
                onChange={e => {
                  updateObject(d.id, e as number, 'year');
                }}
              />
              <InputNumber
                className='undp-input'
                style={{ width: 'calc(50% - 1rem)' }}
                disabled={!d.addedByCO}
                value={d.value}
                onChange={e => {
                  updateObject(d.id, e as number, 'value');
                }}
              />
              <button
                type='button'
                className={`undp-button button-tertiary ${
                  d.addedByCO ? '' : 'disabled'
                }`}
                disabled={!d.addedByCO}
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
                addedByCO: true,
              };
              setValues([...values, newValue]);
            }}
          >
            Add new value
          </button>
          <div className='margin-top-05'>
            <p className='label'>Add source for data added</p>
            {clicked && sourceInfo === '' ? (
              <Input
                value={sourceInfo}
                className='undp-input'
                placeholder='add source for data here'
                onChange={e => {
                  setSourceInfo(e.target.value || '');
                }}
                status='error'
              />
            ) : (
              <Input
                value={sourceInfo}
                className='undp-input'
                placeholder='add source for data here'
                onChange={e => {
                  setSourceInfo(e.target.value || '');
                }}
              />
            )}
          </div>
          <div className='margin-top-07 margin-bottom-07'>
            <p className='label'>Add comments</p>
            {clicked && comment === '' ? (
              <Input.TextArea
                value={comment}
                className='undp-input'
                placeholder='add comments here'
                onChange={e => {
                  setComment(e.target.value || '');
                }}
                status='error'
              />
            ) : (
              <Input.TextArea
                value={comment}
                className='undp-input'
                placeholder='add comments here'
                onChange={e => {
                  setComment(e.target.value || '');
                }}
              />
            )}
          </div>
        </div>
        <button
          type='button'
          className='undp-button button-secondary button-arrow'
          onClick={() => {
            setClicked(true);
            const filteredSortedValue = sortBy(
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
                  id: d.id,
                  addedByCO: d.addedByCO,
                })),
              'year',
            );
            if (
              uniqBy(filteredSortedValue, 'year').length !==
              filteredSortedValue.length
            ) {
              setDuplicateValue(true);
            } else if (comment !== '' && sourceInfo !== '') {
              setEditMode(false);
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
                      id: d.id,
                      addedByCO: d.addedByCO,
                    })),
                  'year',
                ),
                comment,
                'Additional Source': sourceInfo,
              };
              updateData(updatedData);
            }
          }}
        >
          Update Data
        </button>
        {duplicateValue && clicked ? (
          <p
            className='undp-typography margin-top-05 italics margin-bottom-00'
            style={{ color: 'var(--dark-red)' }}
          >
            Please remove the duplicate years
          </p>
        ) : null}
        {sourceInfo === '' && clicked ? (
          <p
            className='undp-typography margin-top-05 italics margin-bottom-00'
            style={{ color: 'var(--dark-red)' }}
          >
            Add source info
          </p>
        ) : null}
        {comment === '' && clicked ? (
          <p
            className='undp-typography margin-top-05 italics margin-bottom-00'
            style={{ color: 'var(--dark-red)' }}
          >
            Add comments
          </p>
        ) : null}
      </>
    </Modal>
  );
}
