import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
import { sha256 } from 'js-sha256'

export default {
  state: {
    articleCryptoData: null
  },
  getters: {
    signature: () => ({ message, secretKey }) => {
      if (!(secretKey instanceof Uint8Array)) secretKey = naclUtil.decodeBase64(secretKey.toString())
      if (!(message instanceof Uint8Array)) message = naclUtil.decodeUTF8(message.toString())

      let signature = nacl.sign.detached(message, secretKey) // get signature
      return naclUtil.encodeBase64(signature) // encode it
    },
    nodeNewsHash: () => ({ title, content, refs }) => {
      const str = title + content + refs
      return sha256(str.toString())
    },
    shortNodeNewsObject: () => ({ categoryTitle, previewAndHref }) => {
      return {
        t: categoryTitle, // title of category
        h: previewAndHref
      }
    },
    fullNodeNewsObject: () => ({ publicKey, input, refs, signature }) => {
      return {
        c: publicKey,
        i: input,
        r: refs,
        s: signature
      }
    },
    msgNodeObject: () => ({ publicKey, data, spaceID, LS, prvNonce }) => {
      const msgHash = sha256(typeof data !== 'object' ? data : JSON.stringify(data) + spaceID + LS + prvNonce)
      return {
        c: publicKey,
        d: data,
        f: msgHash
      }
    },
    articleCryptoData (state) {
      return state.articleCryptoData
    },
    
    getFullNewsLink: () => ({ IEDomain, hash }) => {
      let link
      if (IEDomain === process.env.VUE_APP_API) // if IE is NewNews storage
        link = IEDomain + '/news/node/full/' + hash
      else
        link = IEDomain + '/getstore/' + hash

      return link
    },
    getPreviewAndHref: () => ({ title, links }) => {
      let prevAndHref = title
      links.forEach(function (element, index) {
        prevAndHref += '_' + this[index]
      }, links)

      return prevAndHref
    }
  },
  actions: {
    fetchArticleCryptoData (ctx, { title, content, refs }) {
      const publicKey = ctx.getters.keyPair.publicKey
      const secretKey = ctx.getters.keyPair.secretKey
      const hash = ctx.getters.nodeNewsHash({ title, content, refs })
      const signature = ctx.getters.signature({ message: title + content + refs, secretKey })

      ctx.commit('updateArticleCryptoData', { publicKey, hash, signature })
    }
  },
  mutations: {
    updateArticleCryptoData (state, data) {
      state.articleCryptoData = data
    }
  }
}