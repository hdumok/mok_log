/**
 * Created by hdumok on 2016/11/4.
 */

/*
 ToUserName 开发者微信号
 FromUserName 发送方帐号（一个OpenID）
 CreateTime 消息创建时间 （整型）
 MsgType  语音为voice
 MediaId  语音消息媒体id，可以调用多媒体文件下载接口拉取数据。
 Format 语音格式，如amr，speex等
 MsgID  消息id，64位整型
 */

export default function *() {
  this.body = '暂时无法处理该语言消息'
}
