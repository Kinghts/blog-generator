const util = require('./util')
const fs = require('fs')
const path = require('path')
const HyperDown = require('hyperdown')
let parser = new HyperDown

class Article {
    constructor(name, path, filePath, content) {
        this.name = name
        this.keywords = ''
        this._createAt = '' // 2017-01-01 09:09:09
        this.updateAt = ''
        this._path = path // 浏览器加载文章的路径
        this._filePath = filePath // 输出文章的路径
        this._content = ''
        this.content = content
    }
    set createAt(value) {
      this._createAt = value
    }
    get createAt() {
      return this._createAt
    }
    get path() {
      let date = this._createAt.split(' ')[0]
      return this._path + date + '/' + this.name + '.json'
    }
    get _filePath() {
      let date = this._createAt.split(' ')[0]
      return this._filePath + '/' + date + '/' + this.name + '.json'
    }
    set content(value) {
        this._content = value
        this.hash = util.getHash(value)
        this.createAt = util.getDate()

    }
    get content() {
        return this._content
    }
    toArticleJSON() {
        return JSON.stringify({
            name: this.name,
            createAt: this.createAt,
            updateAt: this.updateAt,
            content: parser.makeHtml(this.content)
        })
    }
    toJSON() { // 这里返回一个对象，以便parse时正确解析
        return {
            keywords: this.keywords,
            createAt: this.createAt,
            updateAt: this.updateAt,
            path: this.path,
            hash: this.hash
        }
    }
    async writeToFile() {
        try {
            let _this = this
            let dirname = path.dirname(_this.filePath)
            if (!await util.fileOrDirExist(dirname)) {
                await util.createDir(dirname)
            }
            await util.createFile(_this.filePath, _this.toArticleJSON())
        } catch (e) {
            throw(e)
        }
    }
}

module.exports = Article
