const { addDataKeyValue } = require('@nudj/library')

const common = require('../../server/modules/common')
const tasks = require('../../server/modules/tasks')
const hirers = require('../../server/modules/hirers')
const prismic = require('../../server/lib/prismic')

const tooltipOptions = {
  type: 'tooltip',
  tags: ['taskList'],
  keys: {
    title: 'tooltiptitle',
    text: 'tooltiptext',
    intercom: 'tooltipintercombutton'
  }
}

const get = ({
  data,
  req
}) => addDataKeyValue('tasksIncomplete', data => tasks.getIncompleteByHirerAndCompanyExposed(data.hirer.id, data.company.id))(data)
.then(data => tasks.getAllByHirerAndCompany(data, data.hirer.id, data.company.id))
.then(data => hirers.getAllByCompany(data, data.company.id))
.then(addDataKeyValue('people', data => common.fetchPeopleFromFragments(data.hirers)))
.then(addDataKeyValue('tooltip', () => prismic.fetchContent(tooltipOptions).then(tooltips => tooltips && tooltips[0])))

module.exports = {
  get
}
