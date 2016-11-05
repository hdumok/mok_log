/**
 * Created by hdumok on 2016/11/4.
 */

'use strict'

import koaResponseTime from 'koa-response-time'//无声明
import koaStaticServer from 'koa-static-server'//无声明
import koaSession from 'koa-generic-session'//无声明
import koaValidate from 'koa-validate'//无声明
import koaCompress from 'koa-compress'
import koaRedis from 'koa-redis'//无声明
import koaBody from 'koa-body' //无声明
import koa from 'koa'

import wechat from '../wechat'
import middlewares from '../middlewares'
import controllers from '../controllers'
import lib from '../lib'

const app = koa()

// x-response-time
app.use(koaResponseTime())

// compress
app.use(koaCompress())

// serve static
app.use(koaStaticServer({rootDir: 'client/dist', index: 'index.html'}))
app.use(koaStaticServer({rootDir: 'client/dist/assets/static', maxage: 30 * 24 * 60 * 60 * 1000, gzip: true, rootPath: '/static'}))

// session
app.keys = ['newmok', 'mok']
app.use(koaSession({
  prefix: 'mok:session:',
  store: koaRedis(CONFIG.redis)
}))

// body parser
app.use(koaBody())

// wechat
app.use(function *(next) {
  if (this.request.path === '/wechat') {
    yield wechat
  } else {
    yield next
  }
})

// validater
koaValidate(app)

app.use(middlewares)

app.use(lib)

app.use(controllers)

app.listen(CONFIG.port, function (err) {
  if (err) {
    console.error(err)
    return
  }

  console.log('==== server started in %s mode, listening on %s ====', NODE_ENV, CONFIG.port)
})
