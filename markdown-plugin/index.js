const fs = require('fs')
const path = require('path')
const util = require('./util')
const diff = require('./diff').diff
const Article = require('./article')

function MarkdownPlugin(options) {
    this.mapFileName = 'map.json'
    this.logPre = 'markdown-plugin: '
    this.options = options
}

MarkdownPlugin.prototype.apply = function (compiler, options) {
    let _this = this
    compiler.plugin('emit', function (compilation, callback) {
        (async function () {
            if (!await util.fileOrDirExist(_this.options.output)) {
                await util.createDir(_this.options.output, true)
            }

            // 读取源markdown文件并创建map
            let sourceFiles = await util.readDir(_this.options.source, true)
            let newestMap = {}
            for (let file of sourceFiles) {
                if (!/\.md$/.test(file.name)) {
                  continue
                }
                let fileName = file.name.substr(0, file.name.length - 3)
                if (newestMap.hasOwnProperty(fileName)) {
                    throw _this.logPre + 'repeated article name： ' + fileName
                    return
                }
                newestMap[fileName] = new Article(fileName, _this.options.path, _this.options.output, file.content)
            }
            // 读取旧的map文件
            let oldMap
            let mapFilePath = path.resolve(compiler.outputPath, _this.options.output, _this.mapFileName)
            if (await util.fileOrDirExist(mapFilePath)) {
                oldMap = JSON.parse(await util.readFile(mapFilePath))
            }

            // 比较新旧map
            let changes = diff(newestMap, oldMap)

            // 更新文件
            changes.update.map((name) => {
              let content = newestMap[name].toArticleJSON()
              compilation.assets[newestMap[name].filePath] = {
                  source: () => content,
                  size: () => content.length
              }
            })
            console.log(_this.logPre + 'update/new ' + changes.update.length + ' articles')

            // 删除文件
            changes.delete.map(async (name) => {
              await util.deleteFile(path.resolve(_this.options.root, oldMap[name].path))
            })
            console.log(_this.logPre + 'delete ' + changes.delete.length + ' articles')

            // await util.createFile(mapFilePath, JSON.stringify(newestMap))
            let mapJSON = JSON.stringify(newestMap)
            compilation.assets[_this.options.output + _this.mapFileName] = {
                source: () => mapJSON,
                size: () => mapJSON.length
            }
        })().then(() => {
            callback()
        })
        .catch(err => {
          console.log(_this.logPre + err)
        })
    })
}

module.exports = MarkdownPlugin
