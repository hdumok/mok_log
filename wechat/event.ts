/**
 * Created by hdumok on 2016/11/4.
 */

/*
 ToUserName:  'gh_d550612e87d2',
 FromUserName:  'oqBvqwYbYMEtd_ktDDqcACNsfpR0',
 CreateTime:  '1474536490',
 MsgType: 'event',
 Event: 'CLICK',
 EventKey:  'V1001_TODAY_MUSIC'
 */

export default function *() {
  switch (this.weixin.Event) {
    case 'CLICK':
      this.body = '点击事件'
      break
    default:
      this.body = '暂时无法处理该事件消息'
  }
}
