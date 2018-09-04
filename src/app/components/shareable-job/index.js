const React = require('react')
const PropTypes = require('prop-types')
const isNil = require('lodash/isNil')
const { HashLink } = require('react-router-hash-link')
const { noop } = require('@nudj/library')
let memoize = require('memoize-one')
memoize = memoize.default || memoize

const { css, mergeStyleSheets } = require('@nudj/components/lib/css')
const { StylePropType } = require('@nudj/components/lib/helpers/prop-types')
const mss = require('@nudj/components/lib/css/modifiers.css')
const CardStyleSheet = require('@nudj/components/lib/components/card/style.css')

const {
  ButtonContainer,
  Icon,
  ScreenReadable,
  Input,
  Link,
  CopyString,
  Text
} = require('@nudj/components')

const Job = require('../job')
const ShareButtons = require('../share-buttons')
const { jobStatuses } = require('../../lib/constants')
const { styleSheet: defaultStyleSheet, inputStyleSheet } = require('./style.css')

class ShareableJob extends React.Component {
  static propTypes = {
    styleSheet: StylePropType,
    referralUrl: PropTypes.string,
    jobUrl: PropTypes.string,
    applicantsUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    shareProps: PropTypes.shape(ShareButtons.propTypes).isRequired
  }

  static defaultProps = {
    onCopy: noop
  }

  state = {
    showSharePanel: null,
    hasCopied: false
  }

  openSharePanel = () => {
    this.setState({
      showSharePanel: true
    })
  }

  closeSharePanel = () => {
    this.setState({
      showSharePanel: false
    })
  }

  getStyle = memoize(
    (defaultStyleSheet, styleSheet) => mergeStyleSheets(defaultStyleSheet, styleSheet)
  )

  getJobStyleSheet = memoize(
    (style, renderBody) => ({
      root: style.root,
      body: [
        style.body,
        renderBody && style.fadeOut
      ].filter(Boolean)
    })
  )

  getShareButtonsStyle = memoize(
    (...styles) => [...styles]
  )

  handleCopy = () => {
    const { shareProps } = this.props

    this.setState({
      hasCopied: true
    })

    shareProps.onCopy && shareProps.onCopy()
  }

  handleCopyBlur = () => {
    this.setState({
      hasCopied: false
    })
  }

  render () {
    const { showSharePanel, hasCopied } = this.state
    const {
      styleSheet,
      referralUrl,
      jobUrl,
      applicantsUrl,
      title,
      status,
      shareProps,
      ...rest
    } = this.props

    const isLive = status === jobStatuses.PUBLISHED

    const style = this.getStyle(defaultStyleSheet, styleSheet)
    const jobStyleSheet = this.getJobStyleSheet(style, showSharePanel)

    let sharePanelStateClass

    if (!isNil(showSharePanel) && showSharePanel) {
      sharePanelStateClass = style.sharePanelActive
    } else if (!isNil(showSharePanel)) {
      sharePanelStateClass = style.sharePanelInactive
    }

    const sharePanelClasses = css(
      CardStyleSheet.root,
      style.sharePanel,
      sharePanelStateClass
    )

    return (
      <Job
        {...rest}
        title={title}
        jobUrl={jobUrl}
        styleSheet={jobStyleSheet}
      >
        <div>
          <div className={css(style.actions)}>
            {jobUrl && (
              <Link
                inline
                subtle
                disabled={!isLive}
                href={jobUrl}
                style={style.action}
                tabIndex={showSharePanel ? -1 : 0}
                target='_blank'
              >
                View job listing
              </Link>
            )}
            {applicantsUrl && (
              <HashLink
                to={applicantsUrl}
                className={css(style.action)}
                tabIndex={showSharePanel ? -1 : 0}
              >
                View applicants
              </HashLink>
            )}
            {shareProps && (
              <ButtonContainer
                style={isLive
                  ? style.actionPrimary
                  : style.actionPrimaryDisabled
                }
                onClick={this.openSharePanel}
                tabIndex={showSharePanel ? -1 : 0}
                disabled={!isLive}
              >
                Share job
              </ButtonContainer>
            )}
          </div>
          <div className={sharePanelClasses}>
            <Text
              element='div'
              size='largeI'
              style={mss.fgPrimary}
              nonsensitive
            >
              Share {title}
            </Text>
            <ButtonContainer
              style={style.closeButton}
              onClick={this.closeSharePanel}
              tabIndex={showSharePanel ? 0 : -1}
            >
              <Icon name='close' />
              <ScreenReadable>Close share panel</ScreenReadable>
            </ButtonContainer>
            <div className={css(style.linkContainer)}>
              <Input
                onCopy={this.handleCopy}
                onBlur={this.handleCopyBlur}
                styleSheet={inputStyleSheet}
                value={referralUrl}
                tabIndex={showSharePanel ? 0 : -1}
                nonsensitive
              />
              <CopyString
                onCopy={this.handleCopy}
                onBlur={this.handleCopyBlur}
                style={style.copyButton}
                volume={hasCopied ? 'murmur' : 'cheer'}
                string={referralUrl}
                tabIndex={showSharePanel ? 0 : -1}
                subtle
              >
                { hasCopied ? 'Copied!' : 'Copy' }
              </CopyString>
            </div>
            <ShareButtons
              {...shareProps}
              tabIndex={showSharePanel ? 0 : -1}
              style={this.getShareButtonsStyle(
                style.shareButton,
                showSharePanel && style.shareButtonActive
              )}
            />
          </div>
        </div>
      </Job>
    )
  }
}

module.exports = ShareableJob
