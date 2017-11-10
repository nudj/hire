const React = require('react')
const _get = require('lodash/get')

// const getStyle = require('./style.css')

const AccumulatorFormerEmployers = (props) => {
  // const style = getStyle()
  const formerEmployers = _get(props, 'formerEmployers')

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {formerEmployers.map((formerEmployer, index) => {
            const {
              id,
              company,
              source
            } = formerEmployer

            return (
              <tr key={id}>
                <td>{company.name}</td>
                <td>{source}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

module.exports = AccumulatorFormerEmployers
