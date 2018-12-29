const template = `

  Usage: gitignore <command> [options]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information
    -p, --path     the path of the gitignore file created
  
  Comands:
    create      create a gitignore file
    append      append the gitignore content in an exist file
    rm          remove a gitignore file
    list        list all language gitignore file
`

module.exports = () => {
  console.log(template)
}