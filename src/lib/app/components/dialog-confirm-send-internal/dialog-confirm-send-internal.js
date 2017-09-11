const React = require('react')
const get = require('lodash/get')
const getStyle = require('./dialog-confirm-send-internal.css')

const PrismicReact = require('../../lib/prismic-react')

const Dialog = (props) => {
  const style = getStyle()
  const dialog = get(props, 'dialog', '')

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

  const dialogConfirmButton = (<button className={props.className} onClick={props.onClickConfirm} />)
  const dialogConfirmGmailButton = (<button className={props.className} onClick={props.onClickConfirmGmail} />)
  const dialogCancelButton = (<button className={props.className} onClick={props.onClickCancel} />)

  const dialogConfirm = prismicDialog.fragmentToReact({
    fragment: 'dialog.dialogconfirmtext',
    props: {
      className: style.dialogConfirmButton,
      element: dialogConfirmButton
    }
  })

  const dialogConfirmGmail = prismicDialog.fragmentToReact({
    fragment: 'dialog.dialogconfirmtext',
    props: {
      className: style.dialogConfirmGmailButton,
      element: dialogConfirmGmailButton
    }
  })

  const dialogCancel = prismicDialog.fragmentToReact({
    fragment: 'dialog.dialogcanceltext',
    props: {
      className: style.dialogCancelButton,
      element: dialogCancelButton
    }
  })

  return (<div className={style.dialog}>
    {dialogTitle}
    {dialogText}
    <div className={style.dialogButtons}>
      {dialogCancel}
      {dialogConfirm}
      {get(props, 'compose.type') === 'composemessage' ? dialogConfirmGmail : ''}
    </div>
  </div>)
}

module.exports = Dialog
