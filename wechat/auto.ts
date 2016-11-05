/**
 * Created by hdumok on 2016/11/4.
 */

export default function *() {
  this.debug('收到无法处理的消息:')
  this.debug(this.weixin)

  this.body = '无法处理该消息'
}
