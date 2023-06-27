import { Input, Select } from 'antd';
import { useState } from 'react';
import { TargetsDataType } from '../Types';
import { SDGGoalList } from '../Utils/SDGGoalList';

interface InterlinkagesDataType {
  Target?: string;
  'Target Text'?: string;
  Description?: string;
  LinkageType: string[];
}

export function GenerateReport() {
  const [clicked, setClicked] = useState(false);
  const [sdgMoment, setSDGMoment] = useState<undefined | string>(undefined);
  const [SDGMomentSubtext, setSDGMomentSubtext] = useState<undefined | string>(
    undefined,
  );
  const [trends, setTrends] = useState<undefined | string>(undefined);
  const [fiscal, setFiscal] = useState<undefined | string>(undefined);
  const [sdgStimulus, setSDGStimulus] = useState<undefined | string>(undefined);
  const [sdgStimulusBulletPoints, setSDGStimulusBulletPoints] = useState<
    undefined | string
  >(undefined);
  const [interlinkagesBulletPoint, setInterlinkagesBulletPoint] = useState<
    undefined | string
  >(undefined);
  const [interlinkages, setInterlinkages] = useState<InterlinkagesDataType[]>(
    [],
  );
  const targetList: TargetsDataType[] = [];
  SDGGoalList.forEach(d => {
    d.Targets.forEach(target => {
      targetList.push(target);
    });
  });
  const linkageTypeOptions = [
    {
      option: 'Synergies',
      value: 'synergies',
    },
    {
      option: 'Trade-Offs',
      value: 'tradeOffs',
    },
    {
      option: 'Not Specified',
      value: 'notSpecified',
    },
  ];
  return (
    <div>
      <div
        className='max-width margin-top-13 margin-bottom-13'
        style={{ padding: '0 var(--spacing-07)' }}
      >
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
                sdgMoment &&
                fiscal &&
                interlinkages.filter(
                  d => !d.Target || !d.Description || d.LinkageType.length < 2,
                ).length === 0 &&
                sdgStimulus
              ) {
                const dataFromUpdatedData = {
                  SDGMoment: sdgMoment,
                  Trends: trends,
                  Interlinkages: interlinkages,
                  Fiscal: fiscal,
                  SDGStimulus: sdgStimulus,
                  SDGStimulusBulletPoints: sdgStimulusBulletPoints,
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
              <h5 className='undp-typography'>SDG Moment</h5>
              {clicked && !sdgMoment ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for SDGMoment'
                  style={{ height: 120 }}
                  value={sdgMoment}
                  onChange={e => {
                    setSDGMoment(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for SDGMoment'
                  style={{ height: 120 }}
                  value={sdgMoment}
                  onChange={e => {
                    setSDGMoment(e.target.value);
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
              <h5 className='undp-typography'>
                SDG Moment Footnote (not required)
              </h5>
              <Input.TextArea
                className='undp-input'
                placeholder='Enter footnote for SDG Moment'
                style={{ height: 120 }}
                value={SDGMomentSubtext}
                onChange={e => {
                  setSDGMomentSubtext(e.target.value);
                }}
              />
            </div>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>Trends (not required)</h5>
              <Input.TextArea
                className='undp-input'
                placeholder='Enter text for Trends'
                style={{ height: 120 }}
                value={trends}
                onChange={e => {
                  setTrends(e.target.value);
                }}
              />
            </div>
            <div
              className='margin-bottom-07'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>Interlinkages bullet points</h5>
              {clicked && !interlinkagesBulletPoint ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for SDGMoment'
                  style={{ height: 120 }}
                  value={interlinkagesBulletPoint}
                  onChange={e => {
                    setInterlinkagesBulletPoint(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for SDGMoment'
                  style={{ height: 120 }}
                  value={interlinkagesBulletPoint}
                  onChange={e => {
                    setInterlinkagesBulletPoint(e.target.value);
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
                                LinkageType: obj.LinkageType,
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
                        showSearch
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
                                LinkageType: obj.LinkageType,
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
                  <div className='margin-bottom-05'>
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
                                LinkageType: obj.LinkageType,
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
                  <div>
                    <p className='undp-typography label'>
                      Interlinkage Type (please select 2 in the order you would
                      like to see in the report)
                    </p>
                    {clicked && d.LinkageType.length < 2 ? (
                      <Select
                        className='undp-select'
                        mode='multiple'
                        placeholder='Enter text for selected interlinkage'
                        value={d.LinkageType}
                        onChange={e => {
                          const updatedArray = interlinkages.map((obj, k) => {
                            if (k === i) {
                              return {
                                Target: obj.Target,
                                Description: obj.Description,
                                'Target text': obj['Target Text'],
                                LinkageType: e,
                              };
                            }
                            return obj;
                          });
                          setInterlinkages(updatedArray);
                        }}
                        status='error'
                      >
                        {linkageTypeOptions.map((el, j) => (
                          <Select.Option
                            className='undp-select-option'
                            value={el.value}
                            key={j}
                          >
                            {el.option}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        className='undp-select'
                        mode='multiple'
                        placeholder='Enter text for selected interlinkage'
                        value={d.LinkageType}
                        onChange={e => {
                          const updatedArray = interlinkages.map((obj, k) => {
                            if (k === i) {
                              return {
                                Target: obj.Target,
                                Description: obj.Description,
                                'Target text': obj['Target Text'],
                                LinkageType: e,
                              };
                            }
                            return obj;
                          });
                          setInterlinkages(updatedArray);
                        }}
                      >
                        {linkageTypeOptions.map((el, j) => (
                          <Select.Option
                            className='undp-select-option'
                            value={el.value}
                            key={j}
                          >
                            {el.option}
                          </Select.Option>
                        ))}
                      </Select>
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
                      LinkageType: ['synergies', 'tradeOffs'],
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
            <div
              className='margin-bottom-05'
              style={{
                width: '100%',
              }}
            >
              <h5 className='undp-typography'>SDG Stimulus</h5>
              {clicked && !sdgStimulus ? (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for SDG Stimulus'
                  style={{ height: 120 }}
                  value={sdgStimulus}
                  onChange={e => {
                    setSDGStimulus(e.target.value);
                  }}
                  status='error'
                />
              ) : (
                <Input.TextArea
                  className='undp-input'
                  placeholder='Enter text for SDG Stimulus'
                  style={{ height: 120 }}
                  value={sdgStimulus}
                  onChange={e => {
                    setSDGStimulus(e.target.value);
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
              <h5 className='undp-typography'>
                Bullet Points for SDG Stimulus (not required)
              </h5>
              <Input.TextArea
                className='undp-input'
                placeholder='Enter text for SDG Stimulus'
                style={{ height: 120 }}
                value={sdgStimulusBulletPoints}
                onChange={e => {
                  setSDGStimulusBulletPoints(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <button
          type='button'
          className='undp-button button-primary'
          onClick={() => {
            setClicked(true);
            if (
              sdgMoment &&
              fiscal &&
              sdgMoment &&
              sdgStimulus &&
              interlinkages.filter(
                d => !d.Target || !d.Description || d.LinkageType.length < 2,
              ).length === 0
            ) {
              const dataFromUpdatedData = {
                SDGMoment: sdgMoment,
                SDGMomentSubtext,
                Trends: trends,
                Interlinkages: interlinkages,
                InterlinkageBulletPoints: interlinkagesBulletPoint,
                Fiscal: fiscal,
                SDGStimulus: sdgStimulus,
                SDGStimulusBulletPoints: sdgStimulusBulletPoints,
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
