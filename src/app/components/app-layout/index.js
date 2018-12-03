const React = require('react')
const { Helmet } = require('react-helmet')
const { Link: RouterLink } = require('react-router-dom')
const get = require('lodash/get')
const isNil = require('lodash/isNil')
const curry = require('lodash/curry')
const Route = require('route-parser')

const { Link, Card } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/styles')

const SyncingPage = require('../../pages/syncing')
const NavLink = require('../navigation-link')
const Notification = require('../notification')
const ScrollTop = require('../scroll-top')
const { memberTypes } = require('../../lib/constants')
const { closeDropdown } = require('../../redux/actions/dropdowns')

const defaultStyleSheet = require('./style.css')

const integrationsEnabled = process.env.FEATURE_INTEGRATIONS === 'true'

const isActive = curry((path, location) => {
  const result = !!location.path && new Route(location.path).match(path)
  return result || (!!location.locations && location.locations.some(isActive(path)))
})

/**
* Add routes here to add to navigation
* Routes marked with `showInSubNav` will appear on the subNavigation
* Other routes are there to make sure that their parent link is active, E.g., When a user
* is on `/jobs/new`, the top-level `Hire` link will be active, but `/jobs/new` does not appear in the subNav
*/
const locations = [
  {
    title: 'Hire',
    locations: [
      {
        path: '/',
        title: 'Jobs',
        locations: [
          {
            path: '/jobs/new'
          },
          {
            path: '/jobs/:jobSlug/bonus'
          },
          {
            path: '/jobs/:jobSlug/edit'
          },
          {
            path: '/jobs/:jobSlug/select-contacts'
          }
        ]
      },
      {
        path: '/referrals',
        title: 'Referral links',
        locations: [
          {
            path: '/referrals/:referralId'
          }
        ]
      },
      {
        path: '/intros',
        title: 'Intros',
        locations: [
          {
            path: '/intros/new'
          },
          {
            path: '/intros/:introId'
          }
        ]
      },
      {
        path: '/applications',
        adminOnly: true,
        title: 'Applications',
        locations: [
          {
            path: '/applications/:introId'
          }
        ]
      }
    ]
  },
  {
    title: 'Discover',
    locations: [
      {
        path: '/contacts',
        title: 'Contacts'
      },
      {
        path: '/messages',
        title: 'Messages',
        locations: [
          {
            path: '/messages/:conversationId'
          },
          {
            path: '/messages/new/:personId/:jobId'
          }
        ]
      },
      {
        path: '/surveys',
        title: 'Surveys',
        locations: [
          {
            path: '/surveys/:surveyId'
          }
        ]
      }
    ]
  },
  {
    title: 'Manage',
    adminOnly: true,
    locations: [
      {
        path: '/company-settings',
        title: 'Settings',
        adminOnly: true
      },
      integrationsEnabled && {
        path: '/integrations',
        title: 'Integrations',
        adminOnly: true,
        locations: [
          {
            path: '/integrations/:type',
            adminOnly: true
          }
        ]
      },
      {
        path: '/manage/surveys',
        title: 'Surveys',
        adminOnly: true,
        locations: [
          {
            path: '/manage/surveys/:id',
            adminOnly: true
          },
          {
            path: '/manage/surveys/:id/edit',
            adminOnly: true
          },
          {
            path: '/manage/surveys/new',
            adminOnly: true
          },
          {
            path: '/manage/surveys/:surveySlug/questions',
            adminOnly: true
          }
        ]
      },
      {
        path: '/team',
        title: 'Team',
        adminOnly: true,
        locations: [
          {
            path: '/team/invite',
            adminOnly: true
          },
          {
            path: '/team/:hirerId',
            adminOnly: true
          },
          {
            path: '/team/:hirerId/edit',
            adminOnly: true
          }
        ]
      }
    ].filter(Boolean)
  }
]

const onClick = dispatch => () => dispatch(closeDropdown())

const ApplicationLayout = props => {
  const {
    children,
    title,
    styleSheet,
    dispatch,
    notification,
    history,
    location: {
      pathname
    }
  } = props
  const onboarded = get(props, 'user.hirer.onboarded', false)
  const type = get(props, 'user.hirer.type', memberTypes.MEMBER)
  const showNavigation = onboarded && isNil(title)
  const isAdmin = type === memberTypes.ADMIN
  const isLoggedIn = !!props.user // If `user` object exists, user is logged in
  const syncingInProgress = get(props, 'user.hirer.company.syncing', false)

  const style = mergeStyleSheets(defaultStyleSheet, styleSheet)

  return (
    <ScrollTop ignore={history.action === 'REPLACE'}>
      <div className={css(style.root)} onClick={onClick(props.dispatch)}>
        <Helmet>
          <body className={css(style.htmlBody)} />
        </Helmet>
        <Notification notification={notification} dispatch={dispatch} />
        <div className={css(style.pageHeader)}>
          <div className={css(style.pageHeaderInner)}>
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
                  {
                    locations
                      .filter(location => isAdmin || !location.adminOnly)
                      .map((location, i) => (
                        <li key={i} className={css(style.navigationListItem)}>
                          <NavLink
                            isActive={isActive(pathname, location)}
                            style={style.navigationLink}
                            activeStyle={style.navigationLinkActive}
                            to={location.locations[0].path}
                          >
                            {location.title}
                          </NavLink>
                        </li>
                      ))
                  }
                </ul>
              ) : (
                <div className={css(style.title)}>{title}</div>
              )}
            </div>
            <div className={css(style.helpContainer)}>
              <Link
                nonsensitive
                href='mailto:help@nudj.co'
                id='open-intercom'
                subtle
                style={style.helpLink}
              >
                Help
              </Link>
              {isLoggedIn && (
                <Link
                  nonsensitive
                  href='/logout'
                  subtle
                  style={style.helpLink}
                >
                  Log out
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={css(style.body)}>
          {isLoggedIn && locations.reduce((Subnav, location) => {
            if (isActive(pathname, location)) {
              Subnav = (
                <Card style={style.subNav}>
                  <ul className={css(style.subNavLinkList)}>
                    {location.locations
                      .filter(location => isAdmin || !location.adminOnly)
                      .map((location, i) => (
                        <li key={i} className={css(style.subNavListItem)}>
                          <NavLink
                            isActive={isActive(pathname, location)}
                            style={style.subNavLink}
                            activeStyle={style.activeSubNavLink}
                            to={location.path}
                          >
                            {location.title}
                          </NavLink>
                        </li>
                      ))
                    }
                  </ul>
                </Card>
              )
            }
            return Subnav
          }, null)}
          <div className={css(style.main)}>
            {syncingInProgress ? (<SyncingPage {...props} />) : children}
          </div>
        </div>
      </div>
    </ScrollTop>
  )
}

module.exports = ApplicationLayout
