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

module.exports = {
    getHash: getHash,
    getDate: getDate,
    fileOrDirExist: fileOrDirExist,
    createDir: createDir,
    createFile: createFile,
    stat: stat,
    readFile: readFile,
    readDir: readDir
}
