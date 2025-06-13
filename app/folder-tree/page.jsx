import { treeData } from "./data"
import FolderTree from "./FolderTree"

const FolderTreePage = () => {

  return (
    <section>
      <FolderTree data={treeData}/>
    </section>
  )
}

export default FolderTreePage