'use strict'
const router = require('koa-router')()
// 用于封装controllers的公共方法

var mongoose = require('mongoose')
var uuid = require('uuid')

router.get('/', async (ctx, next) => {
  // 向mongodb中添加一条数据
  const User = mongoose.model('User')
  const user = await User.findOne({
	  phoneNumber: '16677771234'
	}).exec()
	
	const verifyCode = Math.floor(Math.random()*10000+1)
	if (!user) {
	  let accessToken = uuid.v4()
	  user = new User({
	    nickname: '测试用户',
	    avatar: 'http://upload-images.jianshu.io/upload_images/5307186-eda1b28e54a4d48e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
	    phoneNumber: '16677771234',
	    verifyCode,
	    accessToken
	  })
	}else {
	  user.verifyCode = verifyCode
	}
	try {
    user = await user.save()
    ctx.body = {
      success: true
    } 
  }catch(e){
    ctx.body = {
      success: false
    }
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
