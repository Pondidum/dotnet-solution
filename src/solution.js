import ChildTypes from './childTypes'

function Solution() {
  if (!this instanceof Solution) {
    return new Solution()
  }

  const children = []
  const configurations = ['Debug|Any CPU', 'Release|Any CPU']

  const scrubType = child => {
    const { type, ...scrubbed } = child
    return scrubbed
  }

  const addChild = (item, type) =>
    children.push(Object.assign({}, item, { type: type }))

  const removeChild = (idOrName, type) => {
    const index = children.findIndex(
      child =>
        child.type === type &&
        (child.id === idOrName || child.name === idOrName)
    )
    if (index >= 0) {
      children.splice(index, 1)
    }
  }

  this.addFolder = folder => addChild(folder, ChildTypes.folder)
  this.addProject = project => addChild(project, ChildTypes.project)
  this.addConfiguration = config => configurations.push(config)

  this.getFolders = () => this.getChildren(ChildTypes.folder).map(scrubType)
  this.getProjects = () => this.getChildren(ChildTypes.project).map(scrubType)
  this.getConfigurations = () => configurations

  this.removeFolder = idOrName => removeChild(idOrName, ChildTypes.folder)
  this.removeProject = idOrName => removeChild(idOrName, ChildTypes.project)
  this.removeConfiguration = config => {
    const index = configurations.indexOf(config)
    if (index >= 0) {
      configurations.splice(index, 1)
    }
  }

  this.getChildren = childType => {
    const reducer = (o, child) =>
      Object.assign(o, {
        [child.id]: child.name,
        [child.name]: child.name
      })

    const nameOf = children.reduce(reducer, {})

    return children
      .filter(child => !childType || child.type === childType)
      .map(project =>
        Object.assign({}, project, {
          parent: nameOf[project.parent]
        })
      )
  }
}

export default Solution
