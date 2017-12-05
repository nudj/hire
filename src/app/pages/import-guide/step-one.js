const React = require('react')

const { Text } = require('@nudj/components')

const { css } = require('@nudj/components/lib/css')

const sharedStyle = require('../shared.css')
const style = require('./style.css')

const LinkedInImportGuideStepOne = () => (
  <div>
    <img
      className={css(style.image)}
      src="/assets/images/linkedin-request-1.gif"
    />
    <ol className={css(style.list)}>
      <Text element="li">
        Go to your{' '}
        <Text
          element="a"
          style={sharedStyle.link}
          href="https://www.linkedin.com/psettings/member-data"
          target="_blank"
        >
          LinkedIn Settings
        </Text>
      </Text>
      <Text element="li">Next, click on “Pick & Choose”</Text>
      <Text element="li">Then select "Connections"</Text>
      <Text element="li">Click on "Request archive"</Text>
      <Text element="li">Enter your password</Text>
      <Text element="li">Hit "Done"</Text>
    </ol>
  </div>
)

module.exports = LinkedInImportGuideStepOne
