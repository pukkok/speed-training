'use client'

import { useContext } from "react"
import { DragContext } from "./contexts/dragContext"
import { changeDataStructure } from "./utils/changeDataPosition"

const DragContainer = ({ node, children, ...props }) => {
  const { tree, setTree, dragNode, setDragNode } = useContext(DragContext)


  const dragStart = (e) => {
    setDragNode(node)
    // e.dataTransfer.setData('text/plain', node.id) // 백업
  }

  const dragEnd = (e) => {
    setDragNode(null)
  }

  const drop = (e) => {
    e.preventDefault()
    if (!dragNode || dragNode.id === node.id) return

    // console.log('📦 drop', dragNode.name, '➡', node.name)

    const changeData = changeDataStructure(tree, dragNode, node)
    setTree(changeData)
  }

  return (
    <div 
      draggable
      onDragStart={dragStart}
      // onDrag={(e)=>{}}
      // onDragEnter={dragEnter}
      onDragEnd={dragEnd}

      onDragOver={(e) => e.preventDefault()} // * drop 허용
      onDrop={drop}
      {...props}
    >{children}</div>
  )
}

export default DragContainer