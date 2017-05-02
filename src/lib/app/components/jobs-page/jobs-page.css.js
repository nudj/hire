import css, {
  merge
} from '../../lib/css'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const floatBlock = {
  margin: 0,
  display: 'block',
  float: 'left'
}

export default css({
  published: listStyle,
  archived: listStyle,
  action: listStyle,
  job: merge({
    display: 'flex',
    justifyContent: 'space-between'
  }, listStyle),
  details: {
    width: '50%',
    display: 'block',
    margin: 0
  },
  actions: merge({
    width: '50%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }, listStyle),
  detailTitleTitle: {
    display: 'none'
  },
  detailTitleLocation: {
    display: 'none'
  },
  detailTitleAdded: {
    display: 'block',
    float: 'left',
    clear: 'both',
    ':after': {
      content: ': ',
      whiteSpace: 'pre'
    }
  },
  detailTitleBonus: {
    display: 'block',
    float: 'left',
    clear: 'both',
    ':after': {
      content: ': ',
      whiteSpace: 'pre'
    }
  },
  detailDetailTitle: merge({
    clear: 'both'
  }, floatBlock),
  detailDetailLocation: merge({
    clear: 'both'
  }, floatBlock),
  detailDetailAdded: floatBlock,
  detailDetailBonus: floatBlock
})
