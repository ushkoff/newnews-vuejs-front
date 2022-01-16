import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'

export default {
  state: {
    keyPair: null,
    nonce: null
  },
  getters: {
    keyPair (state) {
      return state.keyPair
    },
    nonce (state) {
      return state.nonce
    }
  },
  actions: {
    generateKeyPair (ctx) {
      const newKeyPair = nacl.sign.keyPair()
      const keyPair = {
        publicKey: naclUtil.encodeBase64(newKeyPair.publicKey),
        secretKey: naclUtil.encodeBase64(newKeyPair.secretKey)
      }

      ctx.commit('updateKeyPair', { keyPair, nonce: 0 })
    },
    setKeyPair (ctx, { publicKey, secretKey, nonce }) {
      const keyPair = {
        publicKey,
        secretKey
      }
      ctx.commit('updateKeyPair', { keyPair, nonce })
    },
    retrieveKeyPair (ctx) {
      const publicKey = localStorage.getItem('PUB')
      const secretKey = sessionStorage.getItem('PRV')
      let nonce = localStorage.getItem('NONCE')
      let keyPair = null

      if (publicKey && secretKey != 'null') {
        keyPair = {
          publicKey,
          secretKey
        }
      } else if (publicKey && secretKey == 'null') {
        keyPair = {
          publicKey,
          secretKey: null
        }
      } else if (!publicKey && secretKey != 'null') {
        keyPair = {
          publicKey: null,
          secretKey
        }
      }
      
      if (!nonce) {
        nonce = null
      }
      ctx.commit('updateKeyPair', { keyPair, nonce })
    },
    doesKeyPairExist (ctx) {
      ctx.dispatch('retrieveKeyPair')

      const publicKey = ctx.getters.keyPair.publicKey
      const secretKey = ctx.getters.keyPair.secretKey
      const nonce = ctx.getters.nonce

      if (publicKey == null && secretKey == null && nonce == null) return 'Public and Private (Secret) keys, Nonce value'
      else if (publicKey == null && secretKey == null && nonce != null) return  'Public and Private (Secret) keys'
      else if (publicKey != null && secretKey == null) return 'Private (Secret) key'
      else if (secretKey != null && publicKey == null) return 'Public key'
      else if (nonce == null) return 'Nonce value'
      else return true
    }
  },
  mutations: {
    updateKeyPair (state, { keyPair, nonce }) {
      state.keyPair = keyPair
      state.nonce = nonce

      if (keyPair.publicKey != null) { 
        localStorage.setItem('PUB', keyPair.publicKey)
      }
      if (keyPair.secretKey != null) {
        sessionStorage.setItem('PRV', keyPair.secretKey)
      }
      if (nonce != null)
      localStorage.setItem('NONCE', nonce)
    },
    incrementNonce (state) {
      state.nonce += 1
      localStorage.setItem('NONCE', state.nonce)
    }
  }
}