const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

function uploadFile(ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({
    headers: req.headers
  })

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirResult = mkdirsSync(filePath)

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = {
      success: false
    }

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
        let _uploadFilePath = path.join(filePath, fileName)
        let saveTo = path.join(_uploadFilePath)

        // 文件保存到制定路径
        file.pipe(fs.createWriteStream(saveTo))

        // 文件写入事件结束
        file.on('end', function() {
          result.success = true
          result.fileName = filename
          result.fileUrl = fileName
          console.log('文件上传成功！')
          resolve(result)
        })
      })
      // 解析结束事件
    busboy.on('finish', function() {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })

}

var uploadimg = async(ctx, next) => {
  let serverFilePath = path.join(__dirname, '../../uploads')

  result = await uploadFile(ctx, {
    fileType: 'product', // common or album
    path: serverFilePath
  })
  if (result.fileUrl) {
    result.fileUrl = 'uploads/product/' + result.fileUrl;
  }
  ctx.rest(result);
}
module.exports = {
  'POST /api/upload/img': uploadimg
};