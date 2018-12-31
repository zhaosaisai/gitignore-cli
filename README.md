# gitignore-cli
A cli to create, append, remove '.gitignore' file to you

## Install

```bash
npm install @zsee/ignore-cli
# or
yarn global add @zsee/ignore-cli
```

## How to use

You can get more usage with the options `-h` or `--help`

```bash
gitignore -h
```

output

```bash

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
```

### create

The `create` command is used to create a new `.gitignore` file in current directory. and you should set language which you want to create. for example

```bash
gitignore create node
```

### append

The `append` command would append content in an exist .gitignore file. if there is not any gitignore file, it is equal to create

```bash
gitignore append node
```

### rm

Remove the `.gitignore` file in current directory

```bash
gitignore rm
```

### list

You can get all supported language with the `list` command

```bash
gitignore list
```

