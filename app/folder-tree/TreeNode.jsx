'use client'
import { useState } from "react"

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(false)

  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="ml-2 select-none">
      <div 
        className="text-xl"
        onClick={() => setExpanded(prev => !prev)}>
        {hasChildren ? (
          <div>{expanded ? '📂' : '📁'} {node.name}</div> 
        ) : (
          <div>📄 {node.name}</div>
        )
        }
      </div>

      {hasChildren && expanded && (
        node.children.map(child => (
          <TreeNode key={child.id} node={child} />
        ))
      )}
    </div>
  )
}

export default TreeNode

