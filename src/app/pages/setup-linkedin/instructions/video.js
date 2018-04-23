const React = require('react')

module.exports = class YourVideo extends React.Component {
  componentDidMount () {
    const script1 = document.createElement('script')
    const script2 = document.createElement('script')

    script1.src = 'https://fast.wistia.com/embed/medias/keficfuvwl.jsonp'
    script1.async = true

    script2.src = 'https://fast.wistia.com/assets/external/E-v1.js'
    script2.async = true

    document.body.appendChild(script1)
    document.body.appendChild(script2)
  }

  render () {
    return (
      <div className={this.props.className}>
        <script src='https://fast.wistia.com/embed/medias/keficfuvwl.jsonp' async />
        <script src='https://fast.wistia.com/assets/external/E-v1.js' async />
        <div
          className='wistia_responsive_padding'
          style={{
            padding: '56.25% 0 0 0',
            position: 'relative'
          }}
        >
          <div
            className='wistia_responsive_wrapper'
            style={{
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%'
            }}
          >
            <div
              className='wistia_embed wistia_async_keficfuvwl seo=false videoFoam=true'
              style={{
                height: '100%',
                position: 'relative',
                width: '100%'
              }}
            >
              <div
                className='wistia_swatch'
                style={{
                  height: '100%',
                  left: 0,
                  opacity: 0,
                  overflow: 'hidden',
                  position: 'absolute', 
                  top: 0,
                  transition: 'opacity 200ms',
                  width: '100%'
                }}
              />
              <img
                src='https://fast.wistia.com/embed/medias/keficfuvwl/swatch'
                style={{
                  filter: 'blur(5px)',
                  height: '100%',
                  objectFit: 'contain',
                  width: '100%'
                }}
                alt=''
                onload='this.parentNode.style.opacity=1'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
