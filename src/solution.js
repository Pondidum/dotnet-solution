const types = {
  folder: '2150E333-8FDC-42A3-9474-1A3956D46DE8',
  project: 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC'
}

class Solution {
  constructor() {
    this.children = []
    this.configurations = ['Debug|Any CPU', 'Release|Any CPU']
  }

  addFolder(folder) {
    this.children.push(Object.assign({}, folder, { type: types.folder }))
  }

  addProject(project) {
    this.children.push(Object.assign({}, project, { type: types.project }))
  }

  writeTo(writer) {
    const append = line => writer.writeLine(line)

    append('Microsoft Visual Studio Solution File, Format Version 12.00')
    append('# Visual Studio 14')
    append('VisualStudioVersion = 14.0.25420.1')
    append('MinimumVisualStudioVersion = 10.0.40219.1')

    this.appendChildren(append)

    append('Global')
    append('	GlobalSection(SolutionConfigurationPlatforms) = preSolution')
    this.appendConfigurations(append)
    append('	EndGlobalSection')

    this.appendPlatforms(append)

    append('	GlobalSection(SolutionProperties) = preSolution')
    append('		HideSolutionNode = FALSE')
    append('	EndGlobalSection')
    append('	GlobalSection(NestedProjects) = preSolution')

    this.appendNesting(append)

    append('	EndGlobalSection')
    append('EndGlobal')
    append('')
  }

  appendChildren(append) {
    this.children.forEach(x => {
      append(`Project("{${x.type}}") = "${x.name}", "${x.path}", "{${x.id}}"`)
      append(`EndProject`)
    })
  }

  appendConfigurations(append) {
    this.configurations.forEach(config => append(`\t\t${config} = ${config}`))
  }

  appendPlatforms(append) {
    append('\tGlobalSection(ProjectConfigurationPlatforms) = postSolution')

    this.children
      .filter(child => child.type === types.project)
      .forEach(project => {
        this.configurations.forEach(config => {
          append(`\t\t{${project.id}}.${config}.ActiveCfg = ${config}`)
          append(`\t\t{${project.id}}.${config}.Build.0 = ${config}`)
        })
      })
    append('	EndGlobalSection')
  }

  appendNesting(append) {
    this.children.filter(child => child.parent).forEach(child => {
      const parent = this.children.find(
        c => c.name.localeCompare(child.parent) === 0
      )
      append(`\t\t{${child.id}} = {${parent.id}}`)
    })
  }
}

export default Solution
