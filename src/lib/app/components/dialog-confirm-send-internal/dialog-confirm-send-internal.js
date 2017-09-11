const React = require('react')
const get = require('lodash/get')
const getStyle = require('./dialog-confirm-send-internal.css')

const PrismicReact = require('../../lib/prismic-react')

const Dialog = (props) => {
  const style = getStyle()
  const dialog = get(props, 'dialog', '')
  const options = get(props, 'options', [])

  const prismicDialog = new PrismicReact(dialog)

  const dialogTitle = prismicDialog.fragmentToReact({
    fragment: 'dialog.dialogtitle',
    props: {
      className: style.dialogTitle,
      element: 'h1'
    }
  })

  const dialogText = prismicDialog.fragmentToReact({
    fragment: 'dialog.dialogtext',
    props: {
      className: style.dialogText,
      element: 'p'
    }
  })

  return (
    <div className={style.dialog}>
      {dialogTitle}
      {dialogText}
      <div className={style.dialogButtons}>
        {
          options.map(option => {
            return prismicDialog.fragmentToReact({
              fragment: `dialog.dialog${option.type}text`,
              props: {
                className: get(style, `${option.type}DialogButton`),
                element: 'button',
                title: option.title,
                onClick: props.onClick(props, option.action.name, option.action.arguments)
              }
            })
          })
        }
      </div>
    </div>
  )
}

module.exports = Dialog
