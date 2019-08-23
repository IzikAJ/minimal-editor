const SaveSelection = (window, root) => {
  const selection = window.getSelection()

  if (!(selection && selection.rangeCount > 0)) return
  const range = selection && selection.getRangeAt(0)

  return {
    restore: () => {
      if (range) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
      root.focus()
    },
    after: () => {
      root.focus()
    },
  }
}

export default SaveSelection
