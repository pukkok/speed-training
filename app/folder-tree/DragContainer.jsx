'use client'

import { useContext } from "react"
import { DragContext } from "./contexts/dragContext"
import { changeDataStructure } from "./utils/changeDataPosition"

const DragContainer = ({ node, children, ...props }) => {
  const { tree, setTree, dragNode, setDragNode } = useContext(DragContext)


  const dragStart = (e) => {
    setDragNode(node)

    // 1. 고스트 노드 만들기
    const ghost = document.createElement('div')
    ghost.textContent = node.name
    ghost.style.position = 'absolute'
    ghost.style.top = '-9999px'
    ghost.style.left = '-9999px'
    ghost.style.padding = '4px 8px'
    ghost.style.fontWeight = 'bold'
    ghost.style.background = '#ffbb00'
    ghost.style.border = '1px solid #ccc'
    ghost.style.borderRadius = '4px'
    ghost.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'
    ghost.style.zIndex = '9999'

    document.body.appendChild(ghost)

    // 2. 드래그 이미지로 설정
    e.dataTransfer.setDragImage(ghost, 0, 0)

    // 3. 드래그 끝나면 제거
    setTimeout(() => document.body.removeChild(ghost), 0)
  }

  const drop = (e) => {
    e.preventDefault()
    if (!dragNode || dragNode.id === node.id) return

    const changeData = changeDataStructure(tree, dragNode, node)
    setTree(changeData)
    setDragNode(null)
  }

  return (
    <div 
      draggable
      onDragStart={dragStart}

      onDragOver={(e) => e.preventDefault()} // * drop 허용
      onDrop={drop}
      {...props}
    >{children}</div>
  )
}

export default DragContainer