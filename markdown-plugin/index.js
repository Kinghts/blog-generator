const fs = require('fs')
const path = require('path')
const util = require('./util')
const diff = require('./diff').diff
const Article = require('./article')
const HyperDown = require('hyperdown')
let parser = new HyperDown

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
                await util.createDir(_this.options.output)
            }

            // 读取源markdown文件并创建map
            let sourceFiles = await util.readDir(_this.options.source, true)
            let newestMap = {}
            for (let file of sourceFiles) {
                let fileName = file.name.substr(0, file.name.length - 3)
                if (newestMap.hasOwnProperty(fileName)) {
                    throw _this.logPre + 'repeated article name： ' + fileName
                    return
                }
                newestMap[fileName] = new Article(fileName, _this.options.path, _this.options.output, file.content)
            }

            //读取旧的map文件
            let oldMap
            let mapFilePath = path.resolve(_this.options.output, _this.mapFileName)
            if (await util.fileOrDirExist(mapFilePath)) {
                oldMap = JSON.parse(await util.readFile(mapFilePath))
            }

            //比较新旧map
            let updates = diff(newestMap, oldMap)

            //更新文件
            for (let name of updates) {
                await newestMap[name].writeToFile()
            }
            console.log(_this.logPre + 'update/new ' + updates.length + ' articles')
            await util.createFile(mapFilePath, JSON.stringify(newestMap))
        })().then(() => {
            callback()
        })
        .catch(err => {
            console.log(_this.logPre + err)
            callback()
        })
    })
}

module.exports = MarkdownPlugin
