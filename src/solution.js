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

  this.addFolder = folder => addChild(folder, ChildTypes.folder)
  this.addProject = project => addChild(project, ChildTypes.project)
  this.addConfiguration = config => configurations.push(config)

  this.getFolders = () => this.getChildren(ChildTypes.folder).map(scrubType)
  this.getProjects = () => this.getChildren(ChildTypes.project).map(scrubType)
  this.getConfigurations = () => configurations

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
