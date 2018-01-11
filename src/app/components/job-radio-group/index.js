// @flow
const React = require('react')
const { css } = require('@nudj/components/lib/css')
const { RadioGroup, Text } = require('@nudj/components')

const style = require('./style.css')

type JobRadioProps = {
  jobs: Array<{ id: string, title: string }>,
  onChange: Object => void,
  name: string,
  selectedJobId: string
}

const JobRadio = ({ name, onChange, selectedJobId, jobs }: JobRadioProps) => (
  <RadioGroup name={name} onChange={onChange} value={selectedJobId}>
    {radio => (
      <ul className={css(style.list)}>
        {jobs.map(job => (
          <Text element='li' key={job.id}>
            {radio({ id: job.id, value: job.id, label: job.title })}
          </Text>
        ))}
      </ul>
    )}
  </RadioGroup>
)

module.exports = JobRadio
