const React = require('react')
const get = require('lodash/get')
const getStyle = require('./dialog.css')

const PrismicReact = require('../../lib/prismic-react')

const Dialog = (props) => {
  const style = getStyle()
  const dialog = get(props, 'dialog')

  const prismicDialog = new PrismicReact({document: dialog})

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
      className: style.dialogtext,
      element: 'p'
    }
  })

  const dialogConfirmButton = (<button data-thing='dialog-confirm-testing-poop' className={props.className} onClick={props.onClick} />)
  const dialogCancelButton = (<button data-thing='dialog-cancel-testing-poop' className={props.className} onClick={props.onClick} />)

  const dialogConfirm = prismicDialog.fragmentToReact({
    fragment: 'dialog.dialogconfirmtext',
    props: {
      className: style.dialogConfirmButton,
      // onClick: fuckOnClick,
      element: dialogConfirmButton
    }
  })

  const dialogCancel = prismicDialog.fragmentToReact({
    fragment: 'dialog.dialogcanceltext',
    props: {
      className: style.dialogCancelButton,
      // onClick: fuckOnClick,
      element: dialogCancelButton
    }
  })

  return (<div className={style.dialog}>
    <button className={style.dialogClose} />
    {dialogTitle}
    {dialogText}
    <div className={style.dialogButtons}>
      {dialogConfirm}
      {dialogCancel}
    </div>
  </div>)
}

module.exports = Dialog
