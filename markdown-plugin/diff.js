const util = require('./util')
/**
 * 比较两个map之间的差异，返回需要更新/创建的articles
 * @param { name: {} } newest 
 * @param { name: {} } old 
 */
exports.diff = function (newest, old) {
    if (newest) {
        if (!old) {
            return Object.getOwnPropertyNames(newest)
        }
        let updates = []
        for (let name in newest) {
            if (old.hasOwnProperty(name)) {
                newest[name].createAt = old[name].createAt
                if (newest[name].hash !== old[name].hash) {
                    console.log('old hash: ' + old[name].hash)
                    newest[name].updateAt = util.getDate()
                    updates.push(name)
                }
            } else {
                updates.push(name)
            }
        }
        return updates
    } else {
        throw 'diff方法的参数不能为空'
    }
}
