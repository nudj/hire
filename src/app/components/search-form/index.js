// @flow
const React = require('react')

const { Input, Button } = require('@nudj/components')

type SearchFormProps = {
  onChange: (Object) => void,
  onSubmit: () => void,
  onReset: () => void,
  placeholder: string,
  value: string,
  className: string
}

const SearchForm = (props: SearchFormProps) => {
  const {
    onChange,
    onSubmit,
    onReset,
    className,
    placeholder,
    value
  } = props

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className={className}>
      <form onSubmit={onSubmitHandler}>
        <Input
          name='search'
          type='search'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </form>
      <Button onClick={onReset} volume='cheer' subtle>
        Clear search
      </Button>
    </div>
  )
}

SearchForm.defaultProps = {
  className: '',
  placeholder: '',
  value: ''
}

module.exports = SearchForm
