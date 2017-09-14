import ChildTypes from './childTypes'

class Solution {
  constructor() {
    this.children = []
    this.configurations = ['Debug|Any CPU', 'Release|Any CPU']
  }

  getFolders() {
    return this.getChildren(ChildTypes.folder)
  }

  getProjects() {
    return this.getChildren(ChildTypes.project)
  }

  getChildren(childType) {
    const relationships = this.children.reduce(
      (o, child) =>
        Object.assign(o, {
          [child.id]: child.name,
          [child.name]: child.name
        }),
      {}
    )

    return this.children
      .filter(child => child.type === childType)
      .map(project => {
        let { type, ...scrubbed } = project
        return Object.assign({}, scrubbed, {
          parent: relationships[scrubbed.parent]
        })
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
    this.children.push(Object.assign({}, item, { type: type }))
  }
}

export default Solution
