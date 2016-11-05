/**
 * Created by hdumok on 2016/11/4.
 */

var co = require('co')
var WechatAPI = require('co-wechat-api')
var env = process.env.NODE_ENV || 'development'
var wechatConfig = require('../config')[env]
var wechat = new WechatAPI(wechatConfig.appID, wechatConfig.appsecret)

co(function*() {
    /*
     1、click：点击推事件用户点击click类型按钮后，推送消息类型为event的结构给，并且带上按钮中开发者填写的key值，开发者可以通过自定义的key值与用户进行交互；
     2、view：点击view类型按钮后，微信客户端将会打开开发者在按钮中填写的网页URL，可与网页授权获取用户基本信息接口结合，获得用户基本信息。
     3、scancode_push：点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者，开发者可以下发消息。
     4、scancode_waitmsg：弹出“消息接收中”，点击按钮，完成扫码操作后，将扫码的结果传给开发者，同时收起扫一扫工具，然后弹出“消息接收中”提示框，随后可能会收到开发者下发的消息。
     5、pic_sysphoto：弹出系统拍照发图用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，同时收起系统相机，随后可能会收到开发者下发的消息。
     6、pic_photo_or_album：弹出拍照或者相册发图用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”。用户选择后即走其他两种流程。
     7、pic_weixin：弹出微信相册发图器用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器，并推送事件给开发者，同时收起相册，随后可能会收到开发者下发的消息。
     8、location_select：弹出地理位置选择器用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器，同时收起位置选择工具，随后可能会收到开发者下发的消息。
     9、media_id：下发消息（除文本消息）用户点击media_id类型按钮后，微信服务器会将开发者填写的永久素材id对应的素材下发给用户，永久素材类型可以是图片、音频、视频、图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
     10、view_limited：跳转图文消息URL用户点击view_limited类型按钮后，微信客户端将打开开发者在按钮中填写的永久素材id对应的图文消息URL，永久素材类型只支持图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
     */

  let menu = {
    'button': [
      {
        'type': 'view',
        'name': '智慧中心',
        'url': 'http://motor.adonging.com/v2/?agentid=1&from=MicroMessenger&themename=standard&relogin=1'
      },
      {
        'name': '服务',
        'sub_button': [
          {
            'type': 'view',
            'name': '救援维修',
            'url': 'http://motor.adonging.com/v2/?agentid=1&from=MicroMessenger&themename=standard&hash=/sos'
          },
          {
            'type': 'view',
            'name': '互助寻车',
            'url': 'http://motor.adonging.com/v2/?agentid=1&from=MicroMessenger&themename=standard&hash=/loss'
          },
          {
            'type': 'view',
            'name': '服务充值',
            'url': 'http://motor.adonging.com/v2/?agentid=1&from=MicroMessenger&themename=standard&hash=/recharge/item'
          },
          {
            'type': 'view',
            'name': '车友记APP',
            'url': 'http://adonging.cn/cyjapp.html'
          },
          {
            'type': 'click',
            'name': '使用手册',
            'key': 'Handbook'
          }
        ]
      },
      {
        'name': '更多',
        'sub_button': [
          {
            'type': 'click',
            'name': '最新活动',
            'key': 'NewActivity'
          },
          {
            'type': 'view',
            'name': '附近门店',
            'url': 'http://motor.adonging.com/v2/?agentid=1&from=MicroMessenger&themename=standard&hash=/stores'
          },
          {
            'type': 'view',
            'name': '意见反馈',
            'url': 'http://motor.adonging.com/v2/?agentid=1&from=MicroMessenger&themename=standard&hash=/feedback'
          },
          {
            'type': 'click',
            'name': '联系客服',
            'key': 'CustomerService'
          }
        ]
      }
    ]
  }

  let result = yield wechat.createMenu(menu)
  if (result.errcode !== 0) {
    console.error(env + ' 环境的微信菜单创建失败, errmsg: ' + result.errmsg)
  } else {
    console.log(env + ' 环境的微信菜单创建成功')
  }
}).then(function () {
  process.exit()
}).catch(console.error)

