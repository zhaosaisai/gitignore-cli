const fs = require('fs')
const path = require('path')
const readline = require('readline')

exports.commandIsValid = cmd => !!~(['create', 'append', 'rm', 'list'].indexOf(cmd))

exports.isExist = file => {
  try {
    return !fs.accessSync(file)
  } catch(e) {
    return false
  }
}

exports.createReadline = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return rl
}

exports.gitignores = (() => {
  const ignores = fs.readdirSync(path.resolve(__dirname, '../.gitignores')).map(git => git.slice(0, -10))
  return () => ignores
})()
