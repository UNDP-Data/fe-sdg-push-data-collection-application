import { TimeSeriesDataTypeWithId } from '../Types';

interface Props {
  data: TimeSeriesDataTypeWithId;
  setSelectedSeries: (_d: TimeSeriesDataTypeWithId) => void;
}

export function RowEl(props: Props) {
  const { data, setSelectedSeries } = props;
  return (
    <button
      type='button'
      style={{
        backgroundColor: 'var(--gray-200)',
        marginBottom: 'var(--spacing-07)',
        padding: 'var(--spacing-07)',
        color: 'var(--black)',
        textDecoration: 'none',
        flexGrow: 1,
        border: '1px solid var(--gray-400)',
        borderRadius: '2px',
        width: '100%',
        textAlign: 'left',
      }}
      onClick={() => {
        setSelectedSeries(data);
      }}
    >
      <div className='flex-div margin-bottom-07'>
        <div className='undp-chip undp-chip-green'>SDG {data.goal}</div>
        <div className='undp-chip undp-chip-green'>Target {data.target}</div>
        <div className='undp-chip undp-chip-green'>
          Indicator {data.indicator}
        </div>
      </div>
      <h6 className='undp-typography margin-bottom-00'>
        {data.seriesDescription}
      </h6>
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
            Type of speed: <span className='bold'>{data['Type of speed']}</span>
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
            Type of skill: <span className='bold'>{data['Type of skill']}</span>
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
            <span className='bold'>{data['Type of renewable technology']}</span>
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
    </button>
  );
}
