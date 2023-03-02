const path = require('path');

module.exports={
    devtool:"eval-source-map",
    mode:'development',
    entry:'./src/index.ts',
    module:{
        rules:[
          {
            test:/\.ts$/,
            use:'ts-loader',
            include:[path.resolve(__dirname,'src')]
          },
          {
            test: /\.(css)$/,
            use: ['style-loader','css-loader']
          }
 
        ]
    },
    resolve:{
      extensions:['.ts','.js']
    },
    output:{
        publicPath:'auto',
        filename:'bundle.js',
        path:path.resolve(__dirname,'public')
    }
}