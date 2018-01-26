const React = require('react')
const { Link: RouterLink, NavLink } = require('react-router-dom')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Link } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')

const Notification = require('../notification')
const ScrollTop = require('../scroll-top')

const defaultStyleSheet = require('./style.css')

const ApplicationLayout = props => {
  const { children, title, styleSheet, dispatch, notification, history } = props
  const onboarded = get(props, 'user.hirer.onboarded', false)
  const showNavigation = onboarded && isNil(title)

  const style = mergeStyleSheets(defaultStyleSheet, styleSheet)

  return (
    <ScrollTop ignore={history.action === 'REPLACE'}>
      <div className={css(style.root)}>
        <Notification notification={notification} dispatch={dispatch} />
        <div className={css(style.pageHeader)}>
          <RouterLink className={css(style.logoContainer)} to='/'>
            <img
              className={css(style.logo)}
              src='/assets/images/nudj-logo-dark.svg'
            />
          </RouterLink>
          <div className={css(style.bodyContainer)}>
            {showNavigation ? (
              <ul className={css(style.navigationList)}>
                <li className={css(style.navigationListItem)}>
                  <NavLink
                    className={css(style.navigationLink)}
                    activeClassName={css(style.navigationLinkActive)}
                    to='/'
                    exact
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className={css(style.navigationListItem)}>
                  <NavLink
                    className={css(style.navigationLink)}
                    activeClassName={css(style.navigationLinkActive)}
                    to='/messages'
                  >
                    Messages
                  </NavLink>
                </li>
                <li className={css(style.navigationListItem)}>
                  <NavLink
                    className={css(style.navigationLink)}
                    activeClassName={css(style.navigationLinkActive)}
                    to='/contacts'
                  >
                    Contacts
                  </NavLink>
                </li>
                <li className={css(style.navigationListItem)}>
                  <NavLink
                    className={css(style.navigationLink)}
                    activeClassName={css(style.navigationLinkActive)}
                    to='/favourites'
                  >
                    Favourites
                  </NavLink>
                </li>
              </ul>
            ) : (
              <div className={css(style.title)}>{title}</div>
            )}
          </div>
          <div className={css(style.helpContainer)}>
            <Link href='mailto:help@nudj.co' id='open-intercom' subtle style={style.helpLink}>
              Chat
            </Link>
          </div>
        </div>
        {children}
      </div>
    </ScrollTop>
  )
}

module.exports = ApplicationLayout
