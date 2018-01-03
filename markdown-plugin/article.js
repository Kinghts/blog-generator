const util = require('./util')
const fs = require('fs')
const path = require('path')

class Article {
    constructor(name, path, filePath, content) {
        this.name = name
        this.keywords = ''
        this.createAt = '' // 2017-01-01 09:09:09
        this.updateAt = ''
        this.path = path // 浏览器加载文章的路径
        this.filePath = filePath // 输出文章的路径
        this._content = ''
        this.content = content
    }
    set content(value) {
        this._content = value
        this.hash = util.getHash(value)
        this.createAt = util.getDate()
        let date = this.createAt.split(' ')[0]
        this.path = this.path + date + '/' + this.name + '.json'
        this.filePath = this.filePath + '/' + date + '/' + this.name + '.json'
    }
    get content() {
        return this._content
    }
    toArticleJSON() {
        return JSON.stringify({
            name: this.name,
            createAt: this.createAt,
            updateAt: this.updateAt,
            content: this.content
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
