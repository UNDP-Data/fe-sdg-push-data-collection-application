export function GlobalHeader() {
  return (
    <div>
      <header className='undp-country-header'>
        <div className='undp-header-bg flex-space-between'>
          <div className='flex-div flex-vert-align-center flex-space-between'>
            <div className='flex-div flex-vert-align-center nav-top-left'>
              <img
                src='https://design.undp.org/static/media/undp-logo-blue.4f32e17f.svg'
                alt='UNDP Logo'
              />
              <div className='undp-site-title'>
                <span>
                  <div>SDG Push Diagnostic Data Entry</div>
                </span>
              </div>
            </div>
            <div className='flex-div flex-vert-align-center nav-top-right'>
              <a
                href='https://data.undp.org/'
                target='_blank'
                className='undp-button button-secondary'
                style={{
                  backgroundColor: 'var(--gray-300)',
                  color: 'var(--gray-700)',
                  textDecoration: 'none',
                }}
                rel='noreferrer'
              >
                SDG Push Diagnostics
              </a>
              <div
                style={{
                  height: '24px',
                  justifyContent: 'flex-end',
                  textAlign: 'right',
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
