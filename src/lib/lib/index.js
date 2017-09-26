const stripDelims = (tag) => tag.slice(2, -2)

const getActiveStep = (externalMessage) => {
  let active = 0
  if (externalMessage.sendMessage) {
    active = 4
  } else if (externalMessage.composeMessage) {
    active = 3
  } else if (externalMessage.selectStyle) {
    active = 2
  } else if (externalMessage.selectLength) {
    active = 1
  }
  return active
}

module.exports = {
  stripDelims,
  getActiveStep
}
