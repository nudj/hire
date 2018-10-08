const React = require('react')
const { Helmet } = require('react-helmet')
const { Link: RouterLink } = require('react-router-dom')
const get = require('lodash/get')
const find = require('lodash/find')
const isNil = require('lodash/isNil')
const isEqual = require('lodash/isEqual')
const Route = require('route-parser')

const { Link, Card } = require('@nudj/components')
const { css, mergeStyleSheets } = require('@nudj/components/lib/css')

const NavLink = require('../navigation-link')
const Notification = require('../notification')
const ScrollTop = require('../scroll-top')
const { memberTypes } = require('../../lib/constants')

const defaultStyleSheet = require('./style.css')

/**
 * Add routes here to add to navigation
 * Routes marked with `isSubNavLink` will appear on the subNavigation
 * Other routes are there to make sure that their parent link is active, E.g., When a user
 * is on `/jobs/new`, the top-level `Hire` link will be active, but `/jobs/new` does not appear in the subNav
 */
const locations = {
  hire: [
     { path: new Route('/'), title: 'Jobs', isSubNavLink: true },
     { path: new Route('/applications'), title: 'Applications', isSubNavLink: true },
     { path: new Route('/jobs/new') },
     { path: new Route('/jobs/:jobSlug/bonus') },
     { path: new Route('/jobs/:jobSlug/edit') }
  ],
  discover: [
     { path: new Route('/discover'), title: 'Contacts', isSubNavLink: true },
     { path: new Route('/discover/job/:jobId') },
     { path: new Route('/messages'), title: 'Messages', isSubNavLink: true },
     { path: new Route('/messages/:conversationId') }
  ],
  manage: [
     { path: new Route('/company-settings'), title: 'Company settings', isSubNavLink: true },
     { path: new Route('/invite'), title: 'Invite', isSubNavLink: true }
  ]
}

const SubNavigation = ({ styleSheet, routes, location }) => {
  return (
    <Card style={styleSheet.subNav}>
      <ul className={css(styleSheet.subNavLinkList)}>
        {routes.map((route, i) => {
          if (!route.isSubNavLink) return null

          const isActive = route.path.match(location.pathname)

          return (
            <li key={i} className={css(styleSheet.subNavListItem)}>
              <NavLink
                isActive={isActive}
                style={styleSheet.subNavLink}
                activeStyle={styleSheet.activeSubNavLink}
                to={route.path.spec}
              >
                {route.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

const ApplicationLayout = props => {
  const {
    children,
    title,
    styleSheet,
    dispatch,
    notification,
    history,
    location,
    user
  } = props
  const onboarded = get(props, 'user.hirer.onboarded', false)
  const type = get(props, 'user.hirer.type', memberTypes.MEMBER)
  const showNavigation = onboarded && isNil(title)
  const isAdmin = type === memberTypes.ADMIN
  const isLoggedIn = !!props.user // If `user` object exists, user is logged in

  const style = mergeStyleSheets(defaultStyleSheet, styleSheet)

  // Determine which routes are related to the top-level location, so that
  // they can be passed into the subnav. E.g., if it's the `hire` route,
  // the subnav needs to be given `locations.hire` as the routes
  let locationRoutes
  Object.keys(locations).map(locationType => {
    const relatedPath = find(locations[locationType], ({ path }) => {
      return path.match(location.pathname)
    })

    if (relatedPath) {
      locationRoutes = locations[locationType]
    }
  })

  // Location is a valid subNav route and the user is logged in
  const showSubNavigation = !!locationRoutes && !!user

  return (
    <ScrollTop ignore={history.action === 'REPLACE'}>
      <div className={css(style.root)}>
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
                  <li className={css(style.navigationListItem)}>
                    <NavLink
                      isActive={isEqual(locationRoutes, locations.hire)}
                      style={style.navigationLink}
                      activeStyle={style.navigationLinkActive}
                      to='/'
                    >
                      Hire
                    </NavLink>
                  </li>
                  <li className={css(style.navigationListItem)}>
                    <NavLink
                      isActive={isEqual(locationRoutes, locations.discover)}
                      style={style.navigationLink}
                      activeStyle={style.navigationLinkActive}
                      to='/discover'
                    >
                      Discover
                    </NavLink>
                  </li>
                  {isAdmin && (
                    <li className={css(style.navigationListItem)}>
                      <NavLink
                        isActive={isEqual(locationRoutes, locations.manage)}
                        style={style.navigationLink}
                        activeStyle={style.navigationLinkActive}
                        to='/company-settings'
                      >
                        Manage
                      </NavLink>
                    </li>
                  )}
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
          {showSubNavigation && (
            <SubNavigation
              styleSheet={style}
              routes={locationRoutes}
              location={location}
            />
          )}
          <div className={css(style.main)}>
            {children}
          </div>
        </div>
      </div>
    </ScrollTop>
  )
}

module.exports = ApplicationLayout
