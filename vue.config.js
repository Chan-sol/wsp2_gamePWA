const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.BASE_URL,
  assetsDir: process.env.BASE_URL,
  devServer:{
    contentBase: path.join(__dirname,'')
  }
};
