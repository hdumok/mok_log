/**
 * Created by hdumok on 2016/11/4.
 */

/*
 ToUserName 开发者微信号
 FromUserName 发送方帐号（一个OpenID）
 CreateTime 消息创建时间 （整型）
 MsgType  text
 Content  文本消息内容
 MsgId  消息id，64位整型
 */
export default function *() {
  this.body = '暂时无法处理该文本消息'
}
