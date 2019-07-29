// util for node creation if required
const FindOrCreateNode = (nodeID, nodeName = 'div', parentNode = null) => {
  const found = document.getElementById(nodeID)
  if (found) return found
  const created = document.createElement(nodeName)
  created.id = nodeID
  if (!parentNode) parentNode = document.body
  parentNode.appendChild(created)
  return created
}

export default FindOrCreateNode
