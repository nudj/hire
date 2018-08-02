const React = require('react')
const { Helmet } = require('react-helmet')
const { Link: RouterLink, NavLink } = require('react-router-dom')
const get = require('lodash/get')
const isNil = require('lodash/isNil')

const { Link } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')

const Notification = require('../notification')
const ScrollTop = require('../scroll-top')
const { memberTypes } = require('../../lib/constants')

const defaultStyleSheet = require('./style.css')

const ApplicationLayout = props => {
  const { children, title, styleSheet, dispatch, notification, history } = props
  const onboarded = get(props, 'user.hirer.onboarded', false)
  const type = get(props, 'user.hirer.type', memberTypes.MEMBER)
  const showNavigation = onboarded && isNil(title)
  const isAdmin = type === memberTypes.ADMIN

  const style = mergeStyleSheets(defaultStyleSheet, styleSheet)

  return (
    <ScrollTop ignore={history.action === 'REPLACE'}>
      <div className={css(style.root)}>
        <Helmet>
          <body className={css(style.htmlBody)} />
        </Helmet>
        <Notification notification={notification} dispatch={dispatch} />
        <div className={css(style.pageHeader)}>
          {onboarded ? (
            <RouterLink className={css(style.logoContainer)} to='/'>
              <img
                className={css(style.logo)}
                src='/assets/images/nudj-logo-dark.svg'
              />
            </RouterLink>
          ) : (
            <div className={css(style.logoContainer)}>
              <img
                className={css(style.logo)}
                src='/assets/images/nudj-logo-dark.svg'
              />
            </div>
          )}
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
                    Jobs
                  </NavLink>
                </li>
                {isAdmin && (
                  <li className={css(style.navigationListItem)}>
                    <NavLink
                      className={css(style.navigationLink)}
                      activeClassName={css(style.navigationLinkActive)}
                      to='/applications'
                    >
                      Applications
                    </NavLink>
                  </li>
                )}
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
                    to='/messages'
                  >
                    Messages
                  </NavLink>
                </li>
              </ul>
            ) : (
              <div className={css(style.title)}>{title}</div>
            )}
          </div>
          <div className={css(style.helpContainer)}>
            {isAdmin && showNavigation && (
              <NavLink
                className={css(style.helpLink, style.inviteLink)}
                activeClassName={css(style.inviteLinkActive)}
                to='/invite'
              >
                Invite
              </NavLink>
            )}
            <Link
              nonsensitive
              href='mailto:help@nudj.co'
              id='open-intercom'
              subtle
              style={style.helpLink}
            >
              Help
            </Link>
          </div>
        </div>
        {children}
      </div>
    </ScrollTop>
  )
}

module.exports = ApplicationLayout
