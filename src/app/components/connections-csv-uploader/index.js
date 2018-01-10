/* global Connection, DataTransferItem */
// @flow
const React = require('react')
const { css } = require('@nudj/components/lib/css')
const { Dropzone, Text, Loader } = require('@nudj/components')
const {
  linkStyleSheet
} = require('@nudj/components/lib/components/inline-action/style.css')

const style = require('./style.css')

type ChildProps = {
  isDragActive: boolean,
  acceptedFiles: Array<DataTransferItem>,
  rejectedFiles: Array<DataTransferItem>
}

type Props = {
  connections: Array<Connection>,
  loading: boolean,
  rest?: Array<mixed>
}

const ConnectionsCsvUploader = (props: Props) => {
  const { connections, loading, ...rest } = props

  return (
    <Dropzone accept='.csv' className='example' {...rest}>
      {(childProps: ChildProps) => {
        const { isDragActive, acceptedFiles, rejectedFiles } = childProps

        if (loading) {
          return (
            <div className={css(style.dropzone)}>
              <div className={css(style.loaderContainer)}>
                <Loader />
              </div>
              <div className={css(style.copy)}>
                <Text element='div' size='largeIi'>
                  Hold on
                </Text>
                <Text element='div' size='regular'>
                  We’re just having a quick look through these lovely people
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
                <Text element='div' size='largeIi' style={style.messageReject}>
                  Something doesn't look right
                </Text>
                <Text element='div' size='regular'>
                  Make sure it's the Connections.csv file
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
                <Text element='div' size='largeIi'>
                  What a great bunch!
                </Text>
                <Text element='div' size='regular'>
                  You&#39;ve added{' '}
                  <span className={css(style.connectionsCount)}>
                    {connections.length} people
                  </span>
                </Text>
              </div>
            </div>
          )
        }

        if (isDragActive > 0) {
          return (
            <div className={css(style.dropzone)}>
              <div className={css(style.copyTop)}>
                <Text element='div' size='largeIi'>
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
              <Text element='div' size='largeIi' style={style.message}>
                Drag & drop here
              </Text>
              <Text element='div' size='regular'>
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
