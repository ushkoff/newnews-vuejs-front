export default {
    state: {
      countryData: null,
      allCountries: null
    },
    getters: {
      countryData (state) {
        return state.countryData
      },
      allCountries (state) {
        return state.allCountries
      }
    },
    actions: {
      async fetchAllCountries (ctx) {
        this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
        this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

        await this._vm.$http.get(this._vm.$api + 'location/countries').then((response) => {
          ctx.commit('updateAllCountries', response.data)
        }).catch(e => { throw e })
      },

      async getCountryByCode (ctx, countryCode) {
        this._vm.$http.defaults.headers.common['Accept'] = 'application/json'
        this._vm.$http.defaults.headers.common['Content-Type'] = 'multipart/form-data'

        await this._vm.$http.get(this._vm.$api + 'location/countries/alpha/' + countryCode).then((response) => {
          ctx.commit('updateCountryData', response.data)
        }).catch(e => { throw e })
      }
    },
    mutations: {
      updateCountryData (state, data) {
        state.countryData = data
      },
      updateAllCountries (state, countries) {
        state.allCountries = countries
      }
    }
  }