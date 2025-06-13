'use client'

import TreeNode from "./TreeNode"

const FolderTree = ({ data }) => {

  return (
    <div>
      {data.map(node => (
        <TreeNode 
          key={node.id} node={node} 
        />
      ))}
    </div>
  )
}

export default FolderTree