import SolutionWriter from './SolutionWriter'
import ChildTypes from './childTypes'

class Solution {
  constructor() {
    this.children = []
    this.configurations = ['Debug|Any CPU', 'Release|Any CPU']
  }

  addFolder(folder) {
    this.children.push(Object.assign({}, folder, { type: ChildTypes.folder }))
  }

  addProject(project) {
    this.children.push(Object.assign({}, project, { type: ChildTypes.project }))
  }

  writeTo(writer) {
    const append = line => writer.writeLine(line)
    const sw = new SolutionWriter(append)
    sw.write(this)
  }
}

export default Solution
