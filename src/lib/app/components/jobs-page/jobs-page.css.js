import css, {
  breakpoints,
  merge
} from '../../lib/css'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
}

const floatBlock = {
  margin: 0,
  display: 'block',
  float: 'left',
}

export default css({
  published: listStyle,
  archived: listStyle,
  job: listStyle,
  actions: listStyle,
  action: listStyle,
  job: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    width: '50%',
    display: 'block',
    margin: 0,
  },
  actions: {
    width: '50%',
    display: 'block',
    margin: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  detailTitleTitle: {
    display: 'none',
  },
  detailTitleLocation: {
    display: 'none',
  },
  detailTitleAdded: {
    display: 'block',
    float: 'left',
    clear: 'both',
    ':after': {
      content: ': ',
      whiteSpace: 'pre',
    },
  },
  detailTitleBonus: {
    display: 'block',
    float: 'left',
    clear: 'both',
    ':after': {
      content: ': ',
      whiteSpace: 'pre',
    }
  },
  detailDetailTitle: merge({
    clear: 'both',
  }, floatBlock),
  detailDetailLocation: merge({
    clear: 'both',
  }, floatBlock),
  detailDetailAdded: floatBlock,
  detailDetailBonus: floatBlock,
})
