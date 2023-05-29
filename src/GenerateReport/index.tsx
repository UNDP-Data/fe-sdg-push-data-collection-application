import { Input, Select } from 'antd';
import { useState } from 'react';
import { TargetsDataType } from '../Types';
import { SDGGoalList } from '../Utils/SDGGoalList';

interface InterlinkagesDataType {
  Target?: string;
  'Target Text'?: string;
  Description?: string;
}

export function GenerateReport() {
  const [clicked, setClicked] = useState(false);
  const [growthPathways, setGrowthPathway] = useState<undefined | string>(
    undefined,
  );
  const [trends, setTrends] = useState<undefined | string>(undefined);
  const [nationalPriorities, setNationalPriorities] = useState<
    undefined | string
  >(undefined);
  const [futures, setFutures] = useState<undefined | string>(undefined);
  const [fiscal, setFiscal] = useState<undefined | string>(undefined);
  const [interlinkages, setInterlinkages] = useState<InterlinkagesDataType[]>(
    [],
  );
  const targetList: TargetsDataType[] = [];
  SDGGoalList.forEach(d => {
    d.Targets.forEach(target => {
      targetList.push(target);
    });
  });

  return (
    <div>
      <div className='max-width margin-top-13 margin-bottom-13'>
        <div
          className='flex-div flex-vert-align-center padding-top-09'
          style={{ justifyContent: 'space-between' }}
        >
          <h2 className='undp-typography margin-top-00 margin-bottom-00'>
            Generate Sheet to share for Insights Report
          </h2>
          <button
            type='button'
            className='undp-button button-primary'
            onClick={() => {
              setClicked(true);
              if (
                growthPathways &&
                trends &&
                nationalPriorities &&
                futures &&
                fiscal &&
                interlinkages.filter(d => !d.Target || !d.Description)
                  .length === 0
              ) {
                const dataFromUpdatedData = {
                  'Growth Pathways': growthPathways,
                  Trends: trends,
                  Interlinkages: interlinkages,
                  Futures: futures,
                  Fiscal: fiscal,
                };
                const dataString = JSON.stringify(dataFromUpdatedData);
                const blob = new Blob([dataString], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Insight_Report.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }
            }}
          >
            Download data
          </button>
        </div>
        <div className='max-width-1440'>
          <div className='flex-div flex-wrap margin-top-07'>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>Growth pathways</h5>
              {clicked && !growthPathways ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for growth pathways'
                  style={{ height: 120 }}
                  value={growthPathways}
                  onChange={e => {
                    setGrowthPathway(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for growth pathways'
                  style={{ height: 120 }}
                  value={growthPathways}
                  onChange={e => {
                    setGrowthPathway(e.target.value);
                  }}
                />
              )}
            </div>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>Trends</h5>
              {clicked && !trends ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for Trends'
                  style={{ height: 120 }}
                  value={trends}
                  onChange={e => {
                    setTrends(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for Trends'
                  style={{ height: 120 }}
                  value={trends}
                  onChange={e => {
                    setTrends(e.target.value);
                  }}
                />
              )}
            </div>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>National Priorities</h5>
              {clicked && !nationalPriorities ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for National Priorities'
                  style={{ height: 120 }}
                  value={nationalPriorities}
                  onChange={e => {
                    setNationalPriorities(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for National Priorities'
                  style={{ height: 120 }}
                  value={nationalPriorities}
                  onChange={e => {
                    setNationalPriorities(e.target.value);
                  }}
                />
              )}
            </div>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>Add Targets for Interlinkages</h5>
              {interlinkages.map((d, i) => (
                <div key={i} className='margin-top-07'>
                  <div className='margin-bottom-05'>
                    <p className='label'>Select Target</p>
                    {clicked && !d.Target ? (
                      <Select
                        className='undp-select'
                        defaultValue='Select a target'
                        value={
                          d.Target
                            ? `Target ${d.Target}: ${d['Target Text']}`
                            : undefined
                        }
                        onChange={e => {
                          const updatedArray = interlinkages.map((obj, k) => {
                            if (k === i) {
                              return {
                                Target: e.replace('Target ', ''),
                                Description: obj.Description,
                                'Target Text': targetList.filter(
                                  t => t.Target === e,
                                )[0]['Target Description'],
                              };
                            }
                            return obj;
                          });
                          setInterlinkages(updatedArray);
                        }}
                        status='error'
                      >
                        {targetList.map((el, j) => (
                          <Select.Option
                            className='undp-select-option'
                            value={el.Target}
                            key={j}
                          >
                            {el.Target}: {el['Target Description']}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        className='undp-select'
                        defaultValue='Select a target'
                        value={
                          d.Target
                            ? `Target ${d.Target}: ${d['Target Text']}`
                            : undefined
                        }
                        onChange={e => {
                          const updatedArray = interlinkages.map((obj, k) => {
                            if (k === i) {
                              return {
                                Target: e.replace('Target ', ''),
                                Description: obj.Description,
                                'Target Text': targetList.filter(
                                  t => t.Target === e,
                                )[0]['Target Description'],
                              };
                            }
                            return obj;
                          });
                          setInterlinkages(updatedArray);
                        }}
                      >
                        {targetList.map((el, j) => (
                          <Select.Option
                            className='undp-select-option'
                            value={el.Target}
                            key={j}
                          >
                            {el.Target}: {el['Target Description']}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </div>
                  <div>
                    <p className='undp-typography label'>
                      Interlinkage description
                    </p>
                    {clicked && !d.Description ? (
                      <Input.TextArea
                        className='undp-input'
                        placeholder='Enter text for selected interlinkage'
                        style={{ height: 120 }}
                        value={d.Description}
                        onChange={e => {
                          const updatedArray = interlinkages.map((obj, k) => {
                            if (k === i) {
                              return {
                                Target: obj.Target,
                                Description: e.target.value,
                                'Target text': obj['Target Text'],
                              };
                            }
                            return obj;
                          });
                          setInterlinkages(updatedArray);
                        }}
                        status='error'
                      />
                    ) : (
                      <Input.TextArea
                        className='undp-input'
                        placeholder='Enter text for selected interlinkage'
                        style={{ height: 120 }}
                        value={d.Description}
                        onChange={e => {
                          const updatedArray = interlinkages.map((obj, k) => {
                            if (k === i) {
                              return {
                                ...obj,
                                Description: e.target.value,
                              };
                            }
                            return obj;
                          });
                          setInterlinkages(updatedArray);
                        }}
                      />
                    )}
                  </div>
                  <button
                    type='button'
                    className='undp-button button-tertiary'
                    onClick={() => {
                      setInterlinkages(
                        interlinkages.filter((_el, index) => index !== i),
                      );
                    }}
                  >
                    Remove interlinkage
                  </button>
                </div>
              ))}
              <div className='margin-top-07'>
                <button
                  type='button'
                  className='undp-button button-tertiary'
                  onClick={() => {
                    const newValue = {
                      Target: undefined,
                      'Target Text': undefined,
                      Description: undefined,
                    };
                    setInterlinkages([...interlinkages, newValue]);
                  }}
                >
                  Add new interlinkage
                </button>
              </div>
            </div>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>Futures</h5>
              {clicked && !futures ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for Futures'
                  style={{ height: 120 }}
                  value={futures}
                  onChange={e => {
                    setFutures(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for Futures'
                  style={{ height: 120 }}
                  value={futures}
                  onChange={e => {
                    setFutures(e.target.value);
                  }}
                />
              )}
            </div>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>Fiscal</h5>
              {clicked && !fiscal ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for National Priorities'
                  style={{ height: 120 }}
                  value={fiscal}
                  onChange={e => {
                    setFiscal(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for National Priorities'
                  style={{ height: 120 }}
                  value={fiscal}
                  onChange={e => {
                    setFiscal(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <button
          type='button'
          className='undp-button button-primary'
          onClick={() => {
            setClicked(true);
            if (
              growthPathways &&
              trends &&
              nationalPriorities &&
              futures &&
              fiscal &&
              interlinkages.filter(d => !d.Target || !d.Description).length ===
                0
            ) {
              const dataFromUpdatedData = {
                'Growth Pathways': growthPathways,
                Trends: trends,
                Interlinkages: interlinkages,
                Futures: futures,
                Fiscal: fiscal,
              };
              const dataString = JSON.stringify(dataFromUpdatedData);
              const blob = new Blob([dataString], {
                type: 'application/json',
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `Insight_Report.json`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }}
        >
          Download data
        </button>
      </div>
    </div>
  );
}
