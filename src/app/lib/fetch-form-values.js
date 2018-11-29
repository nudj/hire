const { getFirstNonNil } = require('@nudj/library')

function fetchFormValues ({ savedState, localState, fields, defaultValue = '' }) {
  // Guard against null values
  const localFormValues = localState || {}
  const stateFormValues = savedState || {}

  // Return an object that represents the values following this logic:
  // If the value exists in the local changes, then that is the latest version.
  // If that value doesn't exist in the local, but does exist in a stored version (i.e. fetched from db) use that.
  // Otherwise, fall back on a default value (which defaults to an empty string)
  return fields.reduce((fieldValues, field) => {
    fieldValues[field] = getFirstNonNil(localFormValues[field], stateFormValues[field], defaultValue)

    return fieldValues
  }, {})
}

module.exports = fetchFormValues
