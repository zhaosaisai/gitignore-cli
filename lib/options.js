const chalk = require('chalk')

module.exports = argvs => {
  if (argvs.V || argvs.version) {
    require('./version')()
  } else if (argvs.h || argvs.help) {
    require('./help')()
  } else {
    const options = Object.keys(argvs).filter(_ => _ !== '_').map(_ => `\n\t-${_}`)

    console.log(`\nInvalid options ${chalk.red(options.join('  '))}\n`)
  }
}