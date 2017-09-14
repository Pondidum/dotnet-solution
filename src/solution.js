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
    this.add(folder, ChildTypes.folder)
  }

  addProject(project) {
    this.add(project, ChildTypes.project)
  }

  add(item, type) {
    let parentName = item.parent
    if (item.parent) {
      const parent = this.children.find(child => child.id === item.parent)
      if (parent) {
        parentName = parent.name
      }
    }

    this.children.push(
      Object.assign({}, item, { type: type, parent: parentName })
    )
  }

  writeTo(writer) {
    const append = line => writer.writeLine(line)
    const sw = new SolutionWriter(append)
    sw.write(this)
  }
}

export default Solution
