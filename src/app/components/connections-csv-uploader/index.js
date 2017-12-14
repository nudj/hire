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

const DZ = (props: Props) => {
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
              <img
                src='/assets/images/point-hand-1.svg'
                className={css(
                  style.pointIllustration,
                  isDragActive && style.pointActive
                )}
                alt=''
                draggable={false}
              />
              <div className={css(style.copy)}>
                <Text element='div' size='largeIi' style={style.messageReject}>
                  Try Connections.csv instead
                </Text>
                <span
                  className={css(
                    linkStyleSheet.root,
                    linkStyleSheet.cheer,
                    linkStyleSheet.inline
                  )}
                >
                  browse your computer
                </span>
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

        return (
          <div className={css(style.dropzone)}>
            <img
              src='/assets/images/point-hand-1.svg'
              className={css(
                style.pointIllustration,
                isDragActive && style.pointActive
              )}
              alt=''
              draggable={false}
            />
            <div className={css(style.copy)}>
              <Text element='div' size='largeIi' style={style.message}>
                Drag & drop here Connections.csv
              </Text>
              <span
                className={css(
                  linkStyleSheet.root,
                  linkStyleSheet.cheer,
                  linkStyleSheet.inline
                )}
              >
                or browse your computer
              </span>
            </div>
          </div>
        )
      }}
    </Dropzone>
  )
}

DZ.defaultProps = {
  connections: [],
  loading: false
}

module.exports = DZ
