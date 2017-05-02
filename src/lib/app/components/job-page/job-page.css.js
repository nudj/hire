import css, {
  merge
} from '../../lib/css'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const blockStyle = {
  margin: 0,
  display: 'block'
}

export default css({
  recommendations: listStyle,
  person: merge({
    display: 'flex',
    justifyContent: 'space-between'
  }, listStyle),
  actions: merge({}, blockStyle, {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }, listStyle),
  action: listStyle,
  details: merge({
    width: '50%'
  }, blockStyle),
  detailTitleName: {
    display: 'none'
  },
  detailTitleTitle: {
    display: 'none'
  },
  detailTitleCompany: {
    display: 'none'
  },
  detailDetailName: blockStyle,
  detailDetailTitle: blockStyle,
  detailDetailCompany: blockStyle
})
