const React = require('react')
const { css } = require('@nudj/components/styles')
const { Dropzone, Text, Loader } = require('@nudj/components')

const style = require('./style.css')

const ConnectionsCsvUploader = props => {
  const { connections, loading, ...rest } = props

  return (
    <Dropzone accept='.csv' className='example' {...rest}>
      {childProps => {
        const { isDragActive, acceptedFiles, rejectedFiles } = childProps

        if (loading) {
          return (
            <div className={css(style.dropzone)}>
              <div className={css(style.loaderContainer)}>
                <Loader />
              </div>
              <div className={css(style.copy)}>
                <Text nonsensitive element='div' size='largeIi'>
                  Hold on
                </Text>
                <Text nonsensitive element='div' size='regular'>
                  We&#39;re just having a quick look through these lovely people
                </Text>
              </div>
            </div>
          )
        }

        if (rejectedFiles && rejectedFiles.length > 0) {
          return (
            <div className={css(style.dropzone)}>
              <div className={css(style.thumbsDownIllustration)} />
              <div className={css(style.copy)}>
                <Text nonsensitive element='div' size='largeIi' style={style.messageReject}>
                  Something doesn&#39;t look right
                </Text>
                <Text nonsensitive element='div' size='regular'>
                  Make sure it&#39;s the Connections.csv file
                </Text>
              </div>
            </div>
          )
        }

        if (acceptedFiles && acceptedFiles.length > 0) {
          return (
            <div className={css(style.dropzone)}>
              <div className={css(style.thumbsUpIllustration)} />
              <div className={css(style.copy)}>
                <Text nonsensitive element='div' size='largeIi'>
                  What a great bunch!
                </Text>
                <Text nonsensitive element='div' size='regular'>
                  You&#39;ve added{' '}
                  <span className={css(style.connectionsCount)}>
                    {connections.length} people
                  </span>
                </Text>
              </div>
            </div>
          )
        }

        if (isDragActive) {
          return (
            <div className={css(style.dropzone)}>
              <div className={css(style.copyTop)}>
                <Text nonsensitive element='div' size='largeIi'>
                  Now drop the file
                </Text>
              </div>
              <div className={css(style.okHandIllustration)} />
            </div>
          )
        }

        return (
          <div className={css(style.dropzone)}>
            <div className={css(style.pointIllustration)} />
            <div className={css(style.copy)}>
              <Text nonsensitive element='div' size='largeIi' style={style.message}>
                Drag & drop here
              </Text>
              <Text nonsensitive element='div' size='regular'>
                or click to browse your computer
              </Text>
            </div>
          </div>
        )
      }}
    </Dropzone>
  )
}

ConnectionsCsvUploader.defaultProps = {
  connections: [],
  loading: false
}

module.exports = ConnectionsCsvUploader
