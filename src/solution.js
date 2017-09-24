import ChildTypes from './childTypes'

function Solution() {
  if (!this instanceof Solution) {
    return new Solution()
  }

  this.children = []
  this.configurations = ['Debug|Any CPU', 'Release|Any CPU']

  this.getFolders = () => {
    return this.getChildren(ChildTypes.folder)
  }

  this.getProjects = () => {
    return this.getChildren(ChildTypes.project)
  }

  this.getChildren = childType => {
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

  this.getConfigurations = () => {
    return this.configurations
  }

  this.addFolder = folder => {
    this.add(folder, ChildTypes.folder)
  }

  this.addProject = project => {
    this.add(project, ChildTypes.project)
  }

  this.add = (item, type) => {
    this.children.push(Object.assign({}, item, { type: type }))
  }
}

export default Solution
