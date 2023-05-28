import { Input, Select, Modal, Pagination } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { json } from 'd3-request';
import { SDGGoalList } from './SDGGoalList';
import {
  CountryDataType,
  KeyToRemoveData,
  TimeSeriesDataTypeWithId,
} from '../Types';
import { RowEl } from './RowEl';
import { SeriesInfoEl } from './SeriesInfoEl';
import { SeriesEditMode } from './SeriesEditMode';
import { AddSeries } from './AddSeries';

export function CountryHomePage() {
  const countryCode = useParams().country;
  const [selectedIndicator, setSelectedIndicator] =
    useState<string>('All Indicators');
  const [selectedGoal, setSelectedGoal] = useState<string>('All Goals');
  const [paginationValue, setPaginationValue] = useState(1);
  const [selectedTarget, setSelectedTarget] = useState<string>('All Targets');
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState<TimeSeriesDataTypeWithId[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<
    undefined | TimeSeriesDataTypeWithId[]
  >(undefined);
  const [addSeriesModalVisible, setAddSeriesModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(undefined);
  const [searchFilter, setSearchFilter] = useState<undefined | string>(
    undefined,
  );
  const [selectedSeries, setSelectedSeries] = useState<
    undefined | TimeSeriesDataTypeWithId
  >(undefined);
  const goalList: string[] = ['All Goals'];
  const targetList: string[] = ['All Targets'];
  const indicatorList: string[] = ['All Indicators'];
  const pageSize = 20;
  SDGGoalList.forEach(d => {
    goalList.push(d.Goal);
    d.Targets.forEach(target => {
      targetList.push(target.Target);
      target.Indicators.forEach(indicator => {
        indicatorList.push(indicator.Indicator);
      });
    });
  });
  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setUpdatedData([]);
    json(
      `https://raw.githubusercontent.com/UNDP-Data/SDG-Accelerator/production/public/data/CountryData/${countryCode}.json`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, d: CountryDataType) => {
        if (err) {
          setError(err);
          setLoading(false);
        }
        setUpdatedData(
          d.tsData.map((el, j) => ({ ...el, id: `series_id_${j}` })),
        );
        setLoading(false);
      },
    );
  }, [countryCode]);
  useEffect(() => {
    const dataFilteredByGoal =
      selectedGoal === 'All Goals'
        ? updatedData
        : updatedData.filter(d => `SDG ${d.goal}` === selectedGoal);
    const dataFilteredByTarget =
      selectedTarget === 'All Targets'
        ? dataFilteredByGoal
        : dataFilteredByGoal.filter(
            d => `Target ${d.target}` === selectedTarget,
          );
    const dataFilteredByIndicator =
      selectedIndicator === 'All Indicators'
        ? dataFilteredByTarget
        : dataFilteredByTarget.filter(
            d => `Indicator ${d.indicator}` === selectedIndicator,
          );
    const dataFilteredBySearch =
      searchFilter === undefined
        ? dataFilteredByIndicator
        : dataFilteredByIndicator.filter(d =>
            d.seriesDescription
              .toLowerCase()
              .includes(searchFilter.toLowerCase()),
          );
    setPaginationValue(1);
    setFilteredData(dataFilteredBySearch);
  }, [selectedGoal, selectedTarget, searchFilter, selectedIndicator]);
  const updateData = (d: TimeSeriesDataTypeWithId) => {
    const updatedArray = updatedData?.map(obj => {
      if (obj.id === d.id) {
        return d;
      }
      return obj;
    });
    setUpdatedData(updatedArray);
  };
  const addDataToList = (d: TimeSeriesDataTypeWithId) => {
    const newArr = [...updatedData];
    newArr.unshift(d);
    setUpdatedData(newArr);
  };
  useEffect(() => {
    const dataFilteredByGoal =
      selectedGoal === 'All Goals'
        ? updatedData
        : updatedData.filter(d => `SDG ${d.goal}` === selectedGoal);
    const dataFilteredByTarget =
      selectedTarget === 'All Targets'
        ? dataFilteredByGoal
        : dataFilteredByGoal.filter(
            d => `Target ${d.target}` === selectedTarget,
          );
    const dataFilteredByIndicator =
      selectedIndicator === 'All Indicators'
        ? dataFilteredByTarget
        : dataFilteredByTarget.filter(
            d => `Indicator ${d.indicator}` === selectedIndicator,
          );
    const dataFilteredBySearch =
      searchFilter === undefined
        ? dataFilteredByIndicator
        : dataFilteredByIndicator.filter(d =>
            d.seriesDescription
              .toLowerCase()
              .includes(searchFilter.toLowerCase()),
          );
    setFilteredData(dataFilteredBySearch);
    if (selectedSeries) {
      setSelectedSeries(
        updatedData.filter(d => d.id === selectedSeries?.id)[0],
      );
    }
  }, [updatedData]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = event => {
        const fileContent = event.target?.result as string;
        const jsonData = JSON.parse(fileContent);
        // Use the jsonData as needed
        setUpdatedData(jsonData);
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: 'var(--gray-100)',
            paddingTop: '180px',
            minHeight: 'calc(100vh - 470px)',
          }}
        >
          <div className='undp-loader' style={{ margin: 'auto' }} />
        </div>
      ) : (
        <div className='max-width margin-top-13'>
          <div
            className='flex-div flex-vert-align-center padding-top-09'
            style={{ justifyContent: 'space-between' }}
          >
            <h2 className='undp-typography margin-top-00 margin-bottom-00'>
              Data for SDG Push Diagnostic for {countryCode} (
              {updatedData.length})
            </h2>
            {updatedData.length > 0 ? (
              <button
                type='button'
                className='undp-button button-primary'
                onClick={() => {
                  const dataFromUpdatedData = [...updatedData]?.map(d => {
                    const keysToRemove: KeyToRemoveData[] = [
                      'currentLevelAssessment',
                      'id',
                      'status',
                    ];
                    const dNew = { ...d };
                    keysToRemove.forEach((key: KeyToRemoveData) => {
                      delete dNew[key];
                    });
                    return dNew;
                  });
                  const dataString = JSON.stringify(dataFromUpdatedData);
                  const blob = new Blob([dataString], {
                    type: 'application/json',
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${countryCode}_Data.json`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
              >
                Download data for later use
              </button>
            ) : null}
          </div>
          <div className='flex-div flex-vert-align-center gap-00 margin-top-07'>
            <input
              className='undp-input'
              style={{
                height: 'auto',
                backgroundColor: 'var(--gray-300)',
                fontSize: '1rem',
                fontFamily: 'var(--fontFamily)',
              }}
              type='file'
              onChange={handleFileUpload}
            />
            <button
              type='button'
              className='undp-button button-secondary'
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
          {!filteredData && !error && updatedData.length === 0 ? (
            <div
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: 'var(--gray-100)',
                paddingTop: '180px',
              }}
            >
              <div className='undp-loader' style={{ margin: 'auto' }} />
            </div>
          ) : error ? (
            <p
              className='undp-typography margin-top-09 margin-bottom-09'
              style={{ color: 'var(--dark-red)' }}
            >
              Error loading data. Please refresh the page or try again later
            </p>
          ) : (
            <div className='max-width-1440'>
              <div className='flex-div flex-wrap margin-top-07'>
                <div
                  style={{
                    width: 'calc(33.33% - 0.67rem)',
                    minWidth: '15rem',
                  }}
                >
                  <p className='undp-typography label'>Filter by SDG</p>
                  <Select
                    className='undp-select'
                    defaultValue='All Goals'
                    value={selectedGoal}
                    showSearch
                    allowClear
                    onChange={e => {
                      const val = e ? `${e}` : 'All Goals';
                      setSelectedGoal(val);
                    }}
                    clearIcon={<div className='clearIcon' />}
                  >
                    {goalList.map((d, i) => (
                      <Select.Option
                        className='undp-select-option'
                        value={d}
                        key={i}
                      >
                        {d}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    width: 'calc(33.33% - 0.67rem)',
                    minWidth: '15rem',
                  }}
                >
                  <p className='undp-typography label'>Filter by Target</p>
                  <Select
                    className='undp-select'
                    defaultValue='All Targets'
                    value={selectedTarget}
                    showSearch
                    allowClear
                    onChange={e => {
                      const val = e ? `${e}` : 'All Targets';
                      setSelectedTarget(val);
                    }}
                    clearIcon={<div className='clearIcon' />}
                  >
                    {targetList.map((d, i) => (
                      <Select.Option
                        className='undp-select-option'
                        value={d}
                        key={i}
                      >
                        {d}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    width: 'calc(33.33% - 0.67rem)',
                    minWidth: '15rem',
                  }}
                >
                  <p className='undp-typography label'>Filter by Indicators</p>
                  <Select
                    className='undp-select'
                    defaultValue='All Indicators'
                    value={selectedIndicator}
                    showSearch
                    allowClear
                    onChange={e => {
                      const val = e ? `${e}` : 'All Indicators';
                      setSelectedIndicator(val);
                    }}
                    clearIcon={<div className='clearIcon' />}
                  >
                    {indicatorList.map((d, i) => (
                      <Select.Option
                        className='undp-select-option'
                        value={d}
                        key={i}
                      >
                        {d}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className='margin-top-07 flex-div margin-bottom-07'>
                <Input
                  placeholder='Search for a signal'
                  className='undp-input'
                  size='large'
                  value={searchQuery}
                  onChange={d => {
                    setSearchQuery(d.target.value);
                  }}
                  onPressEnter={() => {
                    setSearchFilter(searchQuery);
                  }}
                  style={{ flexShrink: 1, flexGrow: 1 }}
                />
                <button
                  type='button'
                  className='undp-button button-secondary'
                  onClick={() => {
                    setSearchFilter(searchQuery);
                  }}
                  style={{ flexShrink: 0, flexGrow: 0 }}
                >
                  Search
                </button>
              </div>
              <button
                style={{
                  backgroundColor: 'var(--gray-100)',
                  marginBottom: 'var(--spacing-05)',
                  padding: 'var(--spacing-05)',
                  color: 'var(--black)',
                  textDecoration: 'none',
                  flexGrow: 1,
                  border: '1px solid var(--gray-500)',
                  borderRadius: '2px',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
                type='button'
                onClick={() => {
                  setAddSeriesModalVisible(true);
                }}
              >
                + Add new time series
              </button>
              {filteredData ? (
                <>
                  {filteredData
                    .filter(
                      (_d, i) =>
                        i < pageSize * paginationValue &&
                        i >= pageSize * (paginationValue - 1),
                    )
                    .map((d, i) => (
                      <RowEl
                        key={i}
                        setSelectedSeries={setSelectedSeries}
                        data={d}
                      />
                    ))}
                  <Pagination
                    className='undp-pagination margin-bottom-13 margin-top-09'
                    style={{ margin: 'auto', width: 'fit-content' }}
                    onChange={e => {
                      setPaginationValue(e);
                    }}
                    defaultCurrent={1}
                    current={paginationValue}
                    total={filteredData.length}
                    pageSize={pageSize}
                    showSizeChanger={false}
                  />
                </>
              ) : null}
            </div>
          )}
          <Modal
            className='undp-modal'
            open={selectedSeries !== undefined}
            onCancel={() => {
              setSelectedSeries(undefined);
              setEditMode(false);
            }}
            onOk={() => {
              setSelectedSeries(undefined);
              setEditMode(false);
            }}
            width='80vw'
          >
            {editMode ? (
              <div>
                {selectedSeries ? (
                  <SeriesEditMode
                    data={selectedSeries}
                    setEditMode={setEditMode}
                    updateData={updateData}
                  />
                ) : null}
              </div>
            ) : (
              <>
                {selectedSeries ? <SeriesInfoEl data={selectedSeries} /> : null}
                <div className='flex-div'>
                  <button
                    type='button'
                    className='undp-button button-primary button-arrow'
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    Update Data & Methodology
                  </button>
                  <button
                    type='button'
                    className='undp-button button-secondary button-arrow'
                    onClick={() => {
                      setSelectedSeries(undefined);
                      setEditMode(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </Modal>
          {addSeriesModalVisible ? (
            <AddSeries
              indicatorList={indicatorList.filter(d => d !== 'All Indicators')}
              setAddSeriesModalVisible={setAddSeriesModalVisible}
              indexNo={updatedData?.length || 0}
              updateData={addDataToList}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
