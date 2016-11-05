/**
 * Created by hdumok on 2016/11/4.
 */

import fs from 'fs'
import path from 'path'
import Wechat from 'co-wechat'

const token = CONFIG.wechat.token
const robot = new Wechat(token)

const wechatRoot = path.join(ROOT, 'wechat')
const wechatFile = fs.readdirSync(wechatRoot)
const wechat = {}

for (var file of wechatFile) {
  if (file === 'index.js') continue

  const out = require(path.join(wechatRoot, file))
  if (out.default) {
    wechat[file.split('.')[0]] = out.default
  } else {
    Object.assign(wechat, out)
  }
}

// robot 只针对微信端发过来的消息和事件
const middlewares = robot.middleware(function * () {
  console.debug(this.weixin)

  // 消息分发
  switch (this.weixin.MsgType) {
    case 'event':
      yield wechat.text
      break
    case 'text':
      yield wechat.text
      break
    case 'image':
      yield wechat.image
      break
    case 'voice':
      yield wechat.image
      break
    default:
      yield wechat.auto
  }
})

export default middlewares
