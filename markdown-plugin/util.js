const fs = require('fs')
const path = require('path')

const crypto = require('crypto')

/**
 * sha256
 */
function getHash (content) {
    return crypto.createHash('sha256').update(content).digest('hex')
}

function getDate () {
    return (new Date()).toLocaleString()
}

// 来自http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
function dateFormat (fmt) { //author: meizz
  var _this = this
  if (!(_this instanceof Date)) {
    _this = new Date(this)
  }
  console.log(_this)
  var o = {
      "M+": _this.getMonth() + 1, //月份
      "d+": _this.getDate(), //日
      "h+": _this.getHours(), //小时
      "m+": _this.getMinutes(), //分
      "s+": _this.getSeconds(), //秒
      "q+": Math.floor((_this.getMonth() + 3) / 3), //季度
      "S": _this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

async function fileOrDirExist (p) {
    return await new Promise((resolve, reject) => {
        fs.stat(p, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    resolve(false)
                } else {
                    reject(err)
                }
            } else {
                resolve(true)
            }
        })
    })
}

async function createDir (dir, recursion) {
    async function mkdir(d) {
        return await new Promise((resolve, reject) => {
            fs.mkdir(d, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    if (recursion) {
        let s = /\\\\/.test(dir) ? '\\\\' : '/'
        let paths = []
        dir.split(s).reduce((total, cur) => {
            total += s + cur
            paths.push(total)
            return total
        })
        for (let p of paths) {
            if (!await fileOrDirExist(p)) {
                await mkdir(p)
            }
        }
    } else {
        await mkdir(dir)
    }
}

async function createFile (p, data) {
    return await new Promise((resolve, reject) => {
        if (data) {
            fs.writeFile(p, data, { encoding: 'utf8' }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        } else {
            fs.createFile(p, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        }
    })
}

async function stat(p) {
    return await new Promise((resolve, reject) => {
        fs.stat(p, (err, stats) => {
            if (err) {
                reject(err)
                return
            }
            resolve(stats)
        })
    })
}

async function readFile(p) {
    return await new Promise((resolve, reject) => {
        fs.readFile(p, 'utf8', (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

/**
 * 返回指定文件夹中的所有文件名及文件内容
 * @param {*} dir
 * @param {*} recursion 是否读取子文件夹
 */
async function readDir(dir, recursion) {
    let fileArr = [] // [{ name: content }...]
    let files = await new Promise(function (resolve, reject) {
        fs.readdir(dir, function (err, files) {
            if (err) {
                reject(err)
                return
            }
            resolve(files)
        })
    })
    for (let name of files) {
        let filePath = path.resolve(dir, name)
        let s = await stat(filePath)
        if (s.isFile()) {
            fileArr.push({ name: name, content: await readFile(filePath) })
        } else if (s.isDirectory() && recursion) {
            fileArr.push(...(await readDir(filePath, true)))
        }
    }
    return fileArr
}

async function deleteFile(p) {
  return await new Promise(function (resolve, reject) {
    fs.unlink(p, function (err) {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = {
    getHash: getHash,
    getDate: getDate,
    dateFormat: dateFormat,
    fileOrDirExist: fileOrDirExist,
    createDir: createDir,
    createFile: createFile,
    stat: stat,
    readFile: readFile,
    readDir: readDir,
    deleteFile: deleteFile
}
