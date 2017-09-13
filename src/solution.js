import SolutionWriter from './solutionWriter'
import ChildTypes from './childTypes'

class Solution {
  constructor() {
    this.children = []
    this.configurations = ['Debug|Any CPU', 'Release|Any CPU']
  }

  getFolders() {
    return this.children
      .filter(child => child.type === ChildTypes.folder)
      .map(project => {
        let { type, ...scrubbed } = project
        return scrubbed
      })
  }

  getProjects() {
    return this.children
      .filter(child => child.type === ChildTypes.project)
      .map(project => {
        let { type, ...scrubbed } = project
        return scrubbed
      })
  }

  getConfigurations() {
    return this.configurations
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
