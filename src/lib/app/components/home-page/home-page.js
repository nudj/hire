const React = require('react')
const { connect } = require('react-redux')
const { withRouter, Link } = require('react-router-dom')
const style = require('./home-page.css')

const Component = (props) => (
  <div className={style.body}>
    <div className={style.background}>
      <div className={style.hero}>
        <div className={style.heroBody}>
          <h1 className={style.title}>The best jobs aren’t advertised. <br className={style.break} />The best talent isn’t looking. <br className={style.break} />Maybe they just need a nudj.</h1>
        </div>
        <div className={style.heroFooter}>
          <div className={style.indicator}>👇</div>
        </div>
      </div>
    </div>
    <div className={style.sectionMedium}>
      <div className={style.howItWorks}>
        <h2 className={style.title}>How it works</h2>
        <p className={style.subtitle}>It's so easy, it won't feel like work.</p>
        <div className={style.number}>1. Get set-up in seconds</div>
        <p className={style.step}>Simply enter a few details about your company, and, hey-presto, your jobs will appear on the nudj network.</p>
        <div className={style.number}>2. Connect the dots</div>
        <p className={style.step}>We'll automatically identify the people most likely to put you in touch with awesome talent, whether they’re in your network or ours.</p>
        <div className={style.number}>3. Make it personal</div>
        <p className={style.step}>Get help tailoring your messages and incentives to ensure those you ask take action.</p>
        <div className={style.number}>4. Review only the best</div>
        <p className={style.step}>Get a curated list of the best applicants and only the juicy details delivered straight to your inbox or ATS of your choice.</p>
        <div className={style.number}>5. Say goodbye to paperwork</div>
        <p className={style.step}>We’ll then handle all the admin and payments so you don’t have to. One less thing for you to worry about.</p>
      </div>
    </div>
    <div className={style.sectionMedium}>
      <div className={style.compare}>
        <h2 className={style.title}>How we compare</h2>
        <p className={style.subtitle}>Anyone can say they're the best, so we'll just let the numbers do the talking. 😏</p>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader} />
              <th className={style.tableHeader}>Recruiter</th>
              <th className={style.tableHeader}>Internal Referrals</th>
              <th className={style.tableHeaderNudj}>nudj*</th>
            </tr>
          </thead>
          <tbody className={style.tableBody}>
            <tr>
              <td className={style.tableLeft}>Cost of Hire</td>
              <td className={style.tableItem}>£3,000</td>
              <td className={style.tableItem}>£1,000</td>
              <td className={style.tableItemNudj}>£750</td>
            </tr>
            <tr>
              <td className={style.tableLeft}>Time to Hire</td>
              <td className={style.tableItem}>55 Days</td>
              <td className={style.tableItem}>29 Days</td>
              <td className={style.tableItemNudj}>20 Days</td>
            </tr>
            <tr>
              <td className={style.tableLeft}>Fill Rate</td>
              <td className={style.tableItem}>18%</td>
              <td className={style.tableItem}>40%</td>
              <td className={style.tableItemNudj}>56%</td>
            </tr>
          </tbody>
        </table>
        <div className={style.beta}>
          <div className={style.bodyNudj}>*based on tests with these lovely people.</div>
          <div className={style.column}>
            <img className={style.brand} src='/assets/images/mams.png' />
            <img className={style.brand} src='/assets/images/ct.png' />
            <img className={style.brand} src='/assets/images/mp.png' />
          </div>
        </div>
      </div>
    </div>
    <div className={style.backgroundFooter}>
      <div className={style.sectionMedium}>
        <div className={style.cost}>
          <h2 className={style.title}>How much does it cost</h2>
          <div className={style.subtitle}>We will be announcing our pricing very soon, but while we're still in beta it costs...</div>
          <div className={style.pricing}>
            <div className={style.price}>£0 + referral fee. &#x1F62E;</div>
            <p className={style.detail}>So sign-up for beta access today!</p>
            <div className={style.buttons}>
              <Link to='/request' className={style.request} >Request access</Link>
              <span className={style.padding}>or</span>
              <Link to='' className={style.outlined} id='open-intercom'>Get in touch</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state, props) => Object.assign({}, state.page, props)
const mapDispatchToProps = (dispatch, ownProps) => ({})
module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
