const headerLines = [
  'Microsoft Visual Studio Solution File, Format Version 12.00',
  '# Visual Studio 14',
  'VisualStudioVersion = 14.0.25420.1',
  'MinimumVisualStudioVersion = 10.0.40219.1'
]

const defaultLines = [
  'Global',
  '	GlobalSection(SolutionConfigurationPlatforms) = preSolution',
  '		Debug|Any CPU = Debug|Any CPU',
  '		Release|Any CPU = Release|Any CPU',
  '	EndGlobalSection'
]
const afterLines = [
  '	GlobalSection(SolutionProperties) = preSolution',
  '		HideSolutionNode = FALSE',
  '	EndGlobalSection',
  '	GlobalSection(NestedProjects) = preSolution',
  '	EndGlobalSection',
  'EndGlobal',
  ''
]

const types = {
  project: 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC'
}

const configurations = ['Debug|Any CPU', 'Release|Any CPU']

const projects = []

const solution = {
  addProject: function(project) {
    projects.push(project)
  },

  removeProject: function(project) {},

  writeTo: function(writer) {
    headerLines.forEach(line => writer.writeLine(line))
    this.writeProjects(writer)
    defaultLines.forEach(line => writer.writeLine(line))
    this.writePlatforms(writer)
    afterLines.forEach(line => writer.writeLine(line))
  },

  writeProjects: function(w) {
    projects.forEach(project => {
      w.writeLine(
        `Project("{${types.project}}") = "${project.name}", "${project.path}", "{${project.id}}"`
      )
      w.writeLine(`EndProject`)
    })
  },

  writePlatforms: function(w) {
    w.writeLine('\tGlobalSection(ProjectConfigurationPlatforms) = postSolution')

    projects.forEach(project => {
      configurations.forEach(config => {
        w.writeLine(`\t\t{${project.id}}.${config}.ActiveCfg = ${config}`)
        w.writeLine(`\t\t{${project.id}}.${config}.Build.0 = ${config}`)
      })
    })
    w.writeLine('	EndGlobalSection')
  }
}

export default solution
