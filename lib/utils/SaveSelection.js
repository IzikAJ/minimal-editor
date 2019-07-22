const SaveSelection = (window, root) => {
  const selection = window.getSelection()
  if (!(selection && selection.rangeCount > 0)) return
  const range = selection && selection.getRangeAt(0)

  return {
    restore: () => {
      if (!range || range.collapsed) return
      selection.removeAllRanges()
      selection.addRange(range)
      root.focus()
    }
  }
}

export default SaveSelection
