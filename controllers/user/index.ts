/**
 * Created by hdumok on 2016/11/4.
 */

import utility from 'utility'

let user = {}

user.signin = function * () {
  this.checkBody('username').notEmpty('用户名或手机不能为空')
  this.checkBody('password').notEmpty('密码不能为空')

  if (this.errors) {
    this.status = 400
    this.body = this.formatError(this.errors)
    return
  }

  let user = yield this.knex('user').where('name', this.request.body.username).first()
  if (!user) {
    this.status = 403
    this.body = '用户不存在'
    return
  }

  // TODO:更严谨的话加密时要加盐
  if (utility.sha1(this.request.body.password) !== user.password) {
    this.status = 403
    this.body = '密码错误'
    return
  }

  this.session.user = user

  this.body = '登录成功'
}

user.signup = function * () {
  this.checkBody('username').len(5, 20, '账号必填,长度为5-20个字符')
  this.checkBody('password').len(6, 20, '密码必填,长度为6至20个字符')

  if (this.errors) {
    this.status = 400
    this.body = this.formatError(this.errors)
    return
  }

  let user = yield this.knex('user')
    .where('name', this.request.body.username)
    .first()

  if (user) {
    this.status = 403
    this.body = '用户名已存在'
    return
  }

  let password = utility.sha1(this.request.body.password)
  yield this.knex('user')
    .insert({
      name: this.request.body.username,
      password: password,
      createTime: Date.now()
    })

  this.body = '用户创建成功'
}

export default user
