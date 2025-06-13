'use client'
import { useState } from "react"
import DragContainer from "./DragContainer"
import { ChevronIcon } from "pk-icons"

const TreeNode = ({ node, isFirst }) => {
  
  const [expanded, setExpanded] = useState(false)

  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="ml-3 select-none">
      {isFirst && <div className="w-full"></div>}

      <div 
        className="text-xl pb-1"
        onClick={() => setExpanded(prev => !prev)}>
        {hasChildren ? (
          <DragContainer 
            className="flex items-center"
            node={node} 
            data-id={node.id}

          >{expanded ? 
            <ChevronIcon strokeWidth={1} size={20} direction="down" className="mr-0.5"/>  : 
            <ChevronIcon strokeWidth={1} size={20} direction="right" className="mr-0.5"/>
            } <p className="mb-1">{node.name}</p>
          </DragContainer>
        ) : (
          <div>📄 {node.name}</div>
        )
        }
      </div>
      <div className="w-full"></div>

      {hasChildren && expanded && (
        node.children.map(child => (
          <TreeNode key={child.id} node={child} />
        ))
      )}
    </div>
  )
}

export default TreeNode

