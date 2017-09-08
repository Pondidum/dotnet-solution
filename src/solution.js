const types = {
  project: 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC'
}

class Solution {
  constructor() {
    this.projects = []
    this.folders = []
    this.configurations = ['Debug|Any CPU', 'Release|Any CPU']
  }

  addFolder(name) {
    this.folders.push(name)
  }

  addProject(project) {
    this.projects.push(project)
  }

  writeTo(writer) {
    const append = line => writer.writeLine(line)

    append('Microsoft Visual Studio Solution File, Format Version 12.00')
    append('# Visual Studio 14')
    append('VisualStudioVersion = 14.0.25420.1')
    append('MinimumVisualStudioVersion = 10.0.40219.1')

    this.appendProjects(append)

    append('Global')
    append('	GlobalSection(SolutionConfigurationPlatforms) = preSolution')
    append('		Debug|Any CPU = Debug|Any CPU')
    append('		Release|Any CPU = Release|Any CPU')
    append('	EndGlobalSection')

    this.appendPlatforms(append)

    append('	GlobalSection(SolutionProperties) = preSolution')
    append('		HideSolutionNode = FALSE')
    append('	EndGlobalSection')
    append('	GlobalSection(NestedProjects) = preSolution')
    append('	EndGlobalSection')
    append('EndGlobal')
    append('')
  }

  appendProjects(append) {
    this.projects.forEach(p => {
      append(
        `Project("{${types.project}}") = "${p.name}", "${p.path}", "{${p.id}}"`
      )
      append(`EndProject`)
    })
  }

  appendPlatforms(append) {
    append('\tGlobalSection(ProjectConfigurationPlatforms) = postSolution')

    this.projects.forEach(project => {
      this.configurations.forEach(config => {
        append(`\t\t{${project.id}}.${config}.ActiveCfg = ${config}`)
        append(`\t\t{${project.id}}.${config}.Build.0 = ${config}`)
      })
    })
    append('	EndGlobalSection')
  }
}

export default Solution
