const getPersonOrConnectionName = (person) => {
  if (!person.firstName && !person.lastName && !person.asAConnection) {
    throw new Error(`${person.id} has no names or isn't a connection to someone else`)
  }

  return {
    firstName: person.firstName || person.asAConnection.firstName,
    lastName: person.lastName || person.asAConnection.lastName
  }
}

module.exports = getPersonOrConnectionName
