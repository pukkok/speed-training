/**
 * 트리 구조에서 fromNode를 제거한 뒤, toNode 기준으로 위치 변경
 * @param {Array} tree 
 * @param {Object} fromNode 
 * @param {Object} toNode 
 * @param {"inside" | "above" | "below"} position 
 * @returns 새로운 트리
 */
export const changeDataStructure = (tree = [], fromNode, toNode, position = "inside") => {
  const cloned = JSON.parse(JSON.stringify(tree))
  let nodeToMove = null

  // 1단계: fromNode가 toNode의 자식인지 확인 → 순환 방지
  const isDescendant = (parent) => {
    if (!parent.children) return false
    for (const child of parent.children) {
      if (child.id === toNode.id) return true
      if (isDescendant(child)) return true
    }
    return false
  }

  if (isDescendant(fromNode)) {
    console.warn("순환 구조 방지: 자식 노드로 이동 불가")
    return tree
  }

  // 2단계: fromNode 제거
  const removeNode = (nodes) => {
    return nodes.filter(node => {
      if (node.id === fromNode.id) {
        nodeToMove = node
        return false
      }
      if (node.children) {
        node.children = removeNode(node.children)
      }
      return true
    })
  }

  const cleaned = removeNode(cloned)

  // 3단계: 삽입
  const insertNode = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      if (node.id === toNode.id) {
        if (position === "inside") {
          node.children = node.children || []
          node.children.push(nodeToMove)
        } else {
          const parent = nodes
          const index = i + (position === "below" ? 1 : 0)
          parent.splice(index, 0, nodeToMove)
        }
        return true
      }

      if (node.children && insertNode(node.children)) {
        return true
      }
    }
    return false
  }

  insertNode(cleaned)

  return cleaned
}
