
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var fs = require('fs');

// 注意：webpack配置中的devSever配置项只对在命令行模式有效。
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  // hot: true,
  inline: true,             //inline模式下我们访问的URL不用发生变化,启用这种模式分两种情况:
  historyApiFallback: true, //由于webpack-dev-server的配置中无inline选项,
                            //我们需要添加webpack-dev-server/client?http://«path»:«port»/到webpack配置的entry入口点中.
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});