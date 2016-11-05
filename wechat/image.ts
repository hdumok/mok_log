/**
 * Created by hdumok on 2016/9/22.
 */

/*
 ToUserName 开发者微信号
 FromUserName 发送方帐号（一个OpenID）
 CreateTime 消息创建时间 （整型）
 MsgType  image
 PicUrl 图片链接（由系统生成）
 MediaId  图片消息媒体id，可以调用多媒体文件下载接口拉取数据。
 MsgId  消息id，64位整型
 */

export default function *() {
  this.body = '暂时无法处理该图片消息'
}
