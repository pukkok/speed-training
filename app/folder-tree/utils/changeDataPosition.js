/**
 * 트리 구조에서 fromId 노드를 제거한 뒤, toId 노드의 children에 추가한다
 * @param {Array} tree - 원본 트리
 * @param {Object} fromNode - 이동할 노드
 * @param {Object} toNode - 대상 노드
 * @returns 새로운 트리 (불변성 유지)
 */
export const changeDataStructure = (tree = [], fromNode, toNode) => {
  const cloned = JSON.parse(JSON.stringify(tree)) // 깊은 복사

  const childrenCheck = (fromNode) => {
    if(fromNode.children) {
      for (const node of fromNode.children) {
        if(node.id === toNode.id) return true

        if(node.children && childrenCheck(node)) return true 
      }
    }
    return false
  }

  if(childrenCheck(fromNode)){
    console.log('이동할 수 없음')
    return tree
  } 
  

  // 1단계: 노드를 찾아서 제거
  const removeNode = (nodes) => {
    return nodes.filter((node) => {
      if (node.id === fromNode.id) {
        return false // 필터에서 제거
      }
      if (node.children) {
        node.children = removeNode(node.children)
      }
      return true
    })
  }

  const cleanedTree = removeNode(cloned)

  // 2단계: 대상 폴더에 추가
  const insertNode = (nodes) => {
    for (const node of nodes) {
      if (node.id === toNode.id) {
        if (!node.children) node.children = []
        node.children.push(fromNode)
        return true
      }
      if (node.children && insertNode(node.children)) {
        return true
      }
    }
    return false
  }

  insertNode(cleanedTree)

  return cleanedTree
}
