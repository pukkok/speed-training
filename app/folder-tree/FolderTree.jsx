'use client'

import { useState } from "react"
import { treeData } from "./data"
import TreeNode from "./TreeNode"
import { DragContext } from "./contexts/dragContext"

const FolderTree = () => {
  const [tree, setTree] = useState(treeData)
  const [dragNode, setDragNode] = useState(null)
  const [dropPoint, setDropPoint] = useState(null)

  const contextValue = {
    tree, setTree,
    dragNode, setDragNode,
    dropPoint, setDropPoint
  }

  return (
    <DragContext.Provider value={contextValue}>
      <div className="border-r h-screen w-xs">
        {tree.map((node, idx) => (
          <TreeNode 
            key={node.id} node={node} isFirst={idx===0}
          />
        ))}
      </div>
    </DragContext.Provider>
  )
}

export default FolderTree