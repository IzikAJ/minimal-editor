const systemKeyNames = [
  'Alt',
  'Control',
  'Meta',
]

const check = (event) => {
  if (!(event && event.key && event.keyCode)) return false
  const { key, keyCode } = event
  if (systemKeyNames.indexOf(key) === -1) return false
  return true
}

export default check
