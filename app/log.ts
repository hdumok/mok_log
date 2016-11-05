/**
 * Created by hdumok on 2016/11/4.
 */

'use strict'

import co from 'co'
import nodemailer from 'nodemailer'
// import mongo from '../lib/mongo'
import redis from '../lib/redis'
import Promise from 'bluebird'

const maxLength = 20

co(function *() {
  while (true) {
    let length = yield redis.llen(CONSTANTS.CHANNEL_LOG)
    if (length > maxLength) length = maxLength

    let messages = ''
    for (let i = 0; i < length; i++) {
      messages = `${yield redis.rpop(CONSTANTS.CHANNEL_LOG)}\n\n${messages}`
    }

    if (messages !== '') sentAlarmEmail(messages)

    yield Promise.delay(3000)
  }
})

var sentAlarmEmail = (function () {
  var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
      user: 'hdumok@qq.com',
      pass: 'jian0526'
    }
  })

  var mailOptions = {
    from: 'hdumok@qq.com', // sender address
    to: ['hdumok@163.com'], // list of receivers
    subject: 'mok server error' // Subject line
  }

  return function (message) {
    mailOptions.text = message
    transporter.sendMail(mailOptions)
  }
})()

