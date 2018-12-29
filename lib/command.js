const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const help = require('./help')
const { commandIsValid, isExist, createReadline, gitignores } = require('./util')
const resolve = p => path.resolve(__dirname, p)

module.exports = (argvs, ctx) => {
  const [cmd, params] = argvs

  if (!commandIsValid(cmd)) {
    console.log(`${chalk.bold.red('\nInvalid command \n\n\t ' + cmd)}`)
    return help()
  }

  if ((cmd === 'create' || cmd === 'append') && (!params || !gitignores().includes(params.toLowerCase()))) {
      console.log(`${chalk.bold.red('\nInvalid language \n\n\t ' + (params || ''))}`)
      console.log(chalk.green('Please input again'))
      process.exit(1)
  }

  cmd === 'create' && exports.create(params, ctx)
  cmd === 'append' && exports.append(params, ctx)
  cmd === 'rm' && exports.rm(ctx)
  cmd === 'list' && exports.list()
}

exports.createGitIgnoreFile = function(lang, ctx) {
  return fs.createReadStream(resolve(`../.gitignores/${lang}.gitignore`))
    .pipe(fs.createWriteStream(path.resolve(ctx, '.gitignore')))
}

exports.appendGitIgnoreFile = function(originalPath, lang) {
  const content = fs.readFileSync(resolve(`../.gitignores/${lang}.gitignore`), 'utf8')
  return fs.appendFileSync(originalPath, `\n${content.toString()}`)
}

exports.create = function(lang, ctx){
  const gitignorePath = path.resolve(ctx, './.gitignore')
  if (isExist(gitignorePath)) {
    const rl = createReadline()

    rl.question(`The .gitignore file is already exists in ${chalk.blue(gitignorePath)}\nAre you sure to rewrite? (y/n) \n`, answer => {
      if (answer === 'y') {
        exports.createGitIgnoreFile(lang, ctx)
      }
      rl.close()
    })
  } else {
    exports.createGitIgnoreFile(lang, ctx)
  }
}

exports.append = function(lang, ctx) {
  const gitignorePath = path.resolve(ctx, './.gitignore')
  if (!isExist(gitignorePath)) {
    return exports.createGitIgnoreFile(lang, ctx)
  }
  return exports.appendGitIgnoreFile(gitignorePath, lang)
}

exports.rm = function(ctx) {
  const gitignorePath = path.resolve(ctx, './.gitignore')
  if (isExist(gitignorePath)) {
    const rl = createReadline()

    rl.question(`Are you sure to remove ${gitignorePath}? (y/n) `, answer => {
      if (answer === 'y') {
        fs.unlinkSync(gitignorePath)
      }
      rl.close()
    })
  }
}

exports.list = function() {
  gitignores().forEach((git, index) => console.log(`${index + 1}: ${git}`))
}