'use client'
import { useContext, useState, useRef } from 'react'
import DragContainer from './DragContainer'
import { ChevronIcon } from 'pk-icons'
import { DragContext } from './contexts/dragContext'
import { changeDataStructure } from './utils/changeDataPosition'

const TreeNode = ({ node, isFirst }) => {
  const { tree, setTree, dragNode, setDragNode } = useContext(DragContext)
  const [expanded, setExpanded] = useState(false)
  const [dropOver, setDropOver] = useState(null) // 'above' | 'below'
  const dragOverTimer = useRef(null)

  const hasChildren = node.children && node.children.length > 0

  const handleDrop = (position) => {
    setDropOver(null)
    setDragNode(null)
    if (!dragNode || dragNode.id === node.id) return
    const updated = changeDataStructure(tree, dragNode, node, position)
    setTree(updated)
  }

  const handleDragEnter = (position) => {
    clearTimeout(dragOverTimer.current)
    dragOverTimer.current = setTimeout(() => {
      setDropOver(position)
    }, 20)
  }

  const handleDragLeave = () => {
    clearTimeout(dragOverTimer.current)
    dragOverTimer.current = setTimeout(() => {
      setDropOver(null)
    }, 20)
  }

  return (
    <div className="ml-3 select-none">

      {/* 위쪽 drop zone (첫 노드만) */}
      {isFirst && (
        <div
          className={`w-full h-1 transition-all ${
            dropOver === 'above' ? 'bg-blue-200 h-8' : ''
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => handleDragEnter('above')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => {
            e.preventDefault()
            handleDrop('above')
          }}
        />
      )}

      {/* 실제 폴더 노드 */}
      <div
        className="text-xl pb-1"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {hasChildren ? (
          <DragContainer
            className={`flex items-center ${
              dragNode && dragNode.id === node.id ? 'bg-amber-100' : ''
            }`}
            node={node}
            data-id={node.id}
          >
            {expanded ? (
              <ChevronIcon strokeWidth={1} size={20} direction="down" className="mr-0.5" />
            ) : (
              <ChevronIcon strokeWidth={1} size={20} direction="right" className="mr-0.5" />
            )}
            <p className="mb-1">{node.name}</p>
          </DragContainer>
        ) : (
          <div>📄 {node.name}</div>
        )}
      </div>

      {/* 하위 트리 */}
      {hasChildren && expanded && (
        node.children.map((child, index) => (
          <TreeNode key={child.id} node={child} isFirst={index === 0} />
        ))
      )}

      {/* 아래쪽 drop zone (모든 노드) */}
      <div
        className={`w-full h-1 transition-all ${
          dropOver === 'below' ? 'bg-blue-200 h-8' : ''
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => handleDragEnter('below')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          e.preventDefault()
          handleDrop('below')
        }}
      />
    </div>
  )
}

export default TreeNode
