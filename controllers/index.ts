/**
 * Created by hdumok on 2016/11/4.
 */

import fs from 'fs'
import path from 'path'
import koaRouter from 'koa-router'

const controllersRoot = path.resolve(ROOT, 'controllers')
const controllersDir = fs.readdirSync(controllersRoot)

const router = koaRouter()

function isController (dirPath) {
  return fs.existsSync(path.join(dirPath, 'index.js')) && fs.existsSync(path.join(dirPath, 'config.json'))
}

function getControllers (root, dirs) {
  let list = []
  for (let dir of dirs) {
    let dirPath = path.join(root, dir)
    if (!fs.lstatSync(dirPath).isDirectory()) continue

    if (isController(dirPath)) {
      list.push(dirPath)
    } else {
      let subDirs = fs.readdirSync(dirPath)
      let subList = getControllers(dirPath, subDirs)
      list = list.concat(subList)
    }
  }
  return list
}

const dirList = getControllers(controllersRoot, controllersDir)

for (let dir of dirList) {
  const config = require(path.join(dir, 'config.json'))

  // 关闭该路由
  if (!config.status) continue

  const constroller = require(path.join(dir, 'index.js')).default

  for (let key in config.routes) {
    const keys = key.split(' ')
    const method = keys[0]
    const publicPath = config.prefix + keys[1]

    let args = [publicPath]

    const funcs = config.routes[key].split(' ')
    funcs.forEach(func => {
      if (!constroller[func]) {
        throw new Error(dir + ': exports.' + func + ' is not defined')
      }

      args.push(constroller[func])
    })

    router[method.toLowerCase()].apply(router, args)
  }
}

export default router.routes()
