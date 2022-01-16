export default {
  state: {},
  getters: {},
  actions: {
    getDefaultTransactionObject (ctx, { sender, recipient, amount, marker, withSignature, secretKey = '', ls = '', nonce = '' }) {
      let response = {
        c: sender,
        r: recipient,
        a: amount,
        m: marker
      }
      if (withSignature) response.s = this.ctx.getters.signature(recipient + amount + marker + ls + nonce, secretKey)

      return response
    }
  },
  mutations: {}
}