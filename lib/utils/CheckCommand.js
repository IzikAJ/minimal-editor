const CheckCommand = (document, command) => {
  // command
  if (!(document && typeof (document.queryCommandSupported) === 'function')) {
    return 'unavailable'
  }
  if (!document.queryCommandSupported(command)) {
    return 'unsupported'
  }
  // if (!document.queryCommandEnabled(command)) {
  //   return 'disabled'
  // }
  return undefined
}

export default CheckCommand
