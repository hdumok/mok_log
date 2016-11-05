/**
 * Created by hdumok on 2016/11/4.
 */

'use strict'

import fs from 'fs'
import path from 'path'
import Redis from 'ioredis'

const redis = new Redis(CONFIG.redis)
/*
 基础操作
 set: 此命令用于在指定键设置值。 { key value  }
 get: 键对应的值。 { key }
 hdel: 删除一个或多个哈希字段。 { key field2 [field2] }
 hexists: 判断一个哈希字段存在与否。 { key field }
 hget: 获取存储在指定的键散列字段的值。 { key field }
 hgetall: 让所有的字段和值在指定的键存储在一个哈希。 { key }
 hmget: 获得所有给定的哈希字段的值。 { key field1 [field2] }
 hmset: 设置多个哈希字段的多个值。 { key field1 value1 [field2 value2 ] }
 hset: 设置哈希字段的字符串值。 { key field value }
 hsetnx: 设置哈希字段的值，仅当该字段不存在。 { key field value }
 hincrby: 由给定数量增加的哈希字段的整数值。 { key field increment }
*/

// 读取redislua下面的额外操作
const luaRoot = path.join(__dirname, 'lua')
const luaFile = fs.readdirSync(luaRoot)

for (let file of luaFile) {
  let name = file.split('.')
  let nameOfCommand = name[0]
  let numberOfKeys = +name[1]
  let lua = (fs.readFileSync(path.join(luaRoot, file))).toString()

  redis.defineCommand(nameOfCommand, {numberOfKeys, lua})
}

export default redis
