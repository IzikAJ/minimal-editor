const SaveFocus = (window, root) => {
  const selection = window.getSelection()
  const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  return {
    restore: () => {
      if (selection && selection.rangeCount > 0) {
        const newRange = selection.getRangeAt(0)
        if (!(newRange && newRange.collapsed)) return
      }

      root.focus()
    },
  }
}

export default SaveFocus
