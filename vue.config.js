module.exports = {
  devServer: {
    public: 'localhost:8081',
    host: 'localhost',
    port: 8081,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  },
  assetsDir: 'assets',
  publicPath: '/'
}
