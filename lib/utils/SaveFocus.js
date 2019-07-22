const SaveFocus = (window, root) => {
  const selection = window.getSelection()

  return {
    restore: () => {
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        if (!range.collapsed) return
      }

      root.focus()
    }
  }
}

export default SaveFocus
