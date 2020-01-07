const mongoose = require('mongoose')
const db = 'mongodb://129.28.xxx.xxx:27017/test'
const fs = require('fs')
const path = require('path')
/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, '../models')

/**
 * mongoose连接数据库
 * @type {[type]}
 */

mongoose.Promise = require('bluebird')


module.exports = function (){
    mongoose.connect(db, { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true},async (err,res)=>{
        console.log('错误',err)
        if(!err){
            walk(models_path)
        }
    })
    return async (ctx, next) => {
        ctx.mongoose = mongoose //全局mongose
        await next();
    }
};

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = async function(modelPath) {
  await fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      console.log('******','这里1')
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)
      console.log('******','这里11')

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
