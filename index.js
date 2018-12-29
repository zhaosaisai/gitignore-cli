const argvs = require('minimist')(process.argv.slice(2))
const command = require('./lib/command')
const options = require('./lib/options')

argvs._[0]
  ? command(argvs._.slice(0), argvs.p || process.cwd())
  : options(argvs)
