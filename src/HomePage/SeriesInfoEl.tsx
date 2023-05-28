import { TimeSeriesDataTypeWithId } from '../Types';
import { SDGGoalList } from './SDGGoalList';

interface Props {
  data: TimeSeriesDataTypeWithId;
}

export function SeriesInfoEl(props: Props) {
  const { data } = props;
  return (
    <>
      <div className='margin-bottom-07'>
        <h6 className='undp-typography margin-bottom-02'>Series Description</h6>
        <p className='undp-typography'>{data.seriesDescription}</p>
      </div>
      <div className='margin-bottom-07'>
        <h6 className='undp-typography margin-bottom-02'>Goal</h6>
        <p className='undp-typography'>
          SDG {data.goal}:{' '}
          {
            SDGGoalList[
              SDGGoalList.findIndex(d => d.Goal === `SDG ${data.goal}`)
            ]['Goal Name']
          }
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h6 className='undp-typography margin-bottom-02'>Target</h6>
        <p className='undp-typography'>
          Target {data.target}:{' '}
          {
            SDGGoalList[
              SDGGoalList.findIndex(d => d.Goal === `SDG ${data.goal}`)
            ].Targets[
              SDGGoalList[
                SDGGoalList.findIndex(d => d.Goal === `SDG ${data.goal}`)
              ].Targets.findIndex(d => d.Target === `Target ${data.target}`)
            ]['Target Description']
          }
        </p>
      </div>
      <div className='margin-bottom-07'>
        <h6 className='undp-typography margin-bottom-02'>Indicator</h6>
        <p className='undp-typography'>
          Indicator {data.indicator}:{' '}
          {
            SDGGoalList[
              SDGGoalList.findIndex(d => d.Goal === `SDG ${data.goal}`)
            ].Targets[
              SDGGoalList[
                SDGGoalList.findIndex(d => d.Goal === `SDG ${data.goal}`)
              ].Targets.findIndex(d => d.Target === `Target ${data.target}`)
            ].Indicators[
              SDGGoalList[
                SDGGoalList.findIndex(d => d.Goal === `SDG ${data.goal}`)
              ].Targets[
                SDGGoalList[
                  SDGGoalList.findIndex(d => d.Goal === `SDG ${data.goal}`)
                ].Targets.findIndex(d => d.Target === `Target ${data.target}`)
              ].Indicators.findIndex(
                d => d.Indicator === `Indicator ${data.indicator}`,
              )
            ]['Indicator Description']
          }
        </p>
      </div>
      <hr className='undp-style margin-bottom-07' />
      <div>
        <h5 className='undp-typography margin-bottom-07'>Disaggregation</h5>
        <div className='flex-div flex-wrap'>
          {data.Sex ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Sex</h6>
              <p className='undp-typography'>{data.Sex}</p>
            </div>
          ) : null}
          {data.Age ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Age</h6>
              <p className='undp-typography'>{data.Age}</p>
            </div>
          ) : null}
          {data.Location ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Location</h6>
              <p className='undp-typography'>{data.Location}</p>
            </div>
          ) : null}
          {data.Quantile ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Quantile</h6>
              <p className='undp-typography'>{data.Quantile}</p>
            </div>
          ) : null}
          {data['Name of international institution'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Name of international institution
              </h6>
              <p className='undp-typography'>
                {data['Name of international institution']}
              </p>
            </div>
          ) : null}
          {data['Type of product'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Type of product
              </h6>
              <p className='undp-typography'>{data['Type of product']}</p>
            </div>
          ) : null}
          {data['Food Waste Sector'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Food waste sector
              </h6>
              <p className='undp-typography'>{data['Food Waste Sector']}</p>
            </div>
          ) : null}
          {data.Activity ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Activity</h6>
              <p className='undp-typography'>{data.Activity}</p>
            </div>
          ) : null}
          {data['Level of requirement'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Level of requirement
              </h6>
              <p className='undp-typography'>{data['Level of requirement']}</p>
            </div>
          ) : null}
          {data['Frequency of Chlorophyll-a concentration'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Frequency of Chlorophyll-a concentration
              </h6>
              <p className='undp-typography'>
                {data['Frequency of Chlorophyll-a concentration']}
              </p>
            </div>
          ) : null}
          {data['Mountain Elevation'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Mountain Elevation
              </h6>
              <p className='undp-typography'>{data['Mountain Elevation']}</p>
            </div>
          ) : null}
          {data['Type of speed'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Type of speed
              </h6>
              <p className='undp-typography'>{data['Type of speed']}</p>
            </div>
          ) : null}
          {data['Name of non-communicable disease'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Name of non-communicable disease
              </h6>
              <p className='undp-typography'>
                {data['Name of non-communicable disease']}
              </p>
            </div>
          ) : null}
          {data['Type of occupation'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Type of occupation
              </h6>
              <p className='undp-typography'>{data['Type of occupation']}</p>
            </div>
          ) : null}
          {data['IHR Capacity'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>IHR Capacity</h6>
              <p className='undp-typography'>{data['IHR Capacity']}</p>
            </div>
          ) : null}
          {data['Education level'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Education level
              </h6>
              <p className='undp-typography'>{data['Education level']}</p>
            </div>
          ) : null}
          {data['Type of skill'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Type of skill
              </h6>
              <p className='undp-typography'>{data['Type of skill']}</p>
            </div>
          ) : null}
          {data['Level/Status'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Level/Status</h6>
              <p className='undp-typography'>{data['Level/Status']}</p>
            </div>
          ) : null}
          {data['Deviation Level'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Deviation Level
              </h6>
              <p className='undp-typography'>{data['Deviation Level']}</p>
            </div>
          ) : null}
          {data['Mode of transportation'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Mode of transportation
              </h6>
              <p className='undp-typography'>
                {data['Mode of transportation']}
              </p>
            </div>
          ) : null}
          {data['Type of renewable technology'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Type of renewable technology
              </h6>
              <p className='undp-typography'>
                {data['Type of renewable technology']}
              </p>
            </div>
          ) : null}
          {data['Fiscal intervention stage'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Fiscal intervention stage
              </h6>
              <p className='undp-typography'>
                {data['Fiscal intervention stage']}
              </p>
            </div>
          ) : null}
          {data.Counterpart ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Counterpart</h6>
              <p className='undp-typography'>{data.Counterpart}</p>
            </div>
          ) : null}
          {data.Cities ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>Cities</h6>
              <p className='undp-typography'>{data.Cities}</p>
            </div>
          ) : null}
          {data['Sampling Stations'] ? (
            <div
              className='margin-bottom-07'
              style={{
                width: 'calc(33.33% - 0.67rem)',
                minWidth: '15rem',
                flexGrow: 1,
                flexShrink: 0,
              }}
            >
              <h6 className='undp-typography margin-bottom-02'>
                Sampling Stations
              </h6>
              <p className='undp-typography'>{data['Sampling Stations']}</p>
            </div>
          ) : null}
        </div>
      </div>
      <hr className='undp-style margin-bottom-07' />
      <div>
        <h5 className='undp-typography margin-bottom-07'>Values Available</h5>
        <p className='undp-typography small-font'>{data.seriesDescription}</p>
        <div style={{ maxWidth: '25rem' }}>
          <div className='undp-table-head'>
            <div
              style={{
                width: 'calc(50% - 2rem)',
                padding: '1rem',
              }}
              className='undp-table-head-cell undp-sticky-head-column'
            >
              Year
            </div>
            <div
              style={{
                width: 'calc(50% - 2rem)',
                padding: '1rem',
              }}
              className='undp-table-head-cell undp-sticky-head-column align-right'
            >
              Value
            </div>
          </div>
          {data.values.map((d, i) => (
            <div
              key={i}
              className='undp-table-row'
              style={{ backgroundColor: 'transparent', color: 'var(--white)' }}
            >
              <div
                style={{
                  width: 'calc(50% - 2rem)',
                  padding: '1rem',
                  backgroundColor: 'transparent',
                }}
                className='undp-table-row-cell'
              >
                {d.year}
              </div>
              <div
                style={{
                  width: 'calc(50% - 2rem)',
                  padding: '1rem',
                  backgroundColor: 'transparent',
                }}
                className='undp-table-row-cell align-right'
              >
                {d.label ? d.label : d.value}
              </div>
            </div>
          ))}
        </div>
        <hr className='undp-style margin-bottom-07 margin-top-07' />
        <div>
          <h5 className='undp-typography margin-bottom-07'>
            Methodology to get trend of the time series
          </h5>
          <p className='undp-typography'>
            {data.methodology !== 'NA' ? (
              <>
                <div className='margin-bottom-07'>
                  <h6 className='undp-typography margin-bottom-02'>
                    Methodology Type
                  </h6>
                  <p className='undp-typography'>
                    {data.methodology.trendMethodology}
                  </p>
                </div>
                <div className='flex-div flex-wrap'>
                  <div
                    className='margin-bottom-07'
                    style={{
                      width: 'calc(50% - 0.5rem)',
                      minWidth: '15rem',
                      flexGrow: 1,
                      flexShrink: 0,
                    }}
                  >
                    <h6 className='undp-typography margin-bottom-02'>
                      Target value
                    </h6>
                    <p className='undp-typography'>
                      {data.methodology.trendMethodology === 'CAGRR' ||
                      data.methodology.trendMethodology === 'Likert' ||
                      data.methodology.trendMethodology === 'Binary'
                        ? data.methodology.targetValue !== undefined
                          ? data.methodology.targetValue
                          : data.methodology.value
                        : 'Not Applicable'}
                    </p>
                  </div>
                  <div
                    className='margin-bottom-07'
                    style={{
                      width: 'calc(50% - 0.5rem)',
                      minWidth: '15rem',
                      flexGrow: 1,
                      flexShrink: 0,
                    }}
                  >
                    <h6 className='undp-typography margin-bottom-02'>
                      Normative direction
                    </h6>
                    <p className='undp-typography'>
                      {data.methodology.normativeDirection
                        ? data.methodology.normativeDirection
                        : 'Not applicable / not available'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              'Methodology not defined'
            )}
          </p>
        </div>
      </div>
    </>
  );
}
