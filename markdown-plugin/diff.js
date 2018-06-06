const util = require('./util')
/**
 * 比较两个map之间的差异，返回需要更新/创建的articles
 * @param { name: {} } newest
 * @param { name: {} } old
 */
exports.diff = function (newest, old) {
    if (newest) {
        let changes = {
          update: [],
          delete: []
        }
        if (!old) {
            changes.update = Object.getOwnPropertyNames(newest)
            return changes
        }
        let newKeys = Object.keys(newest), oldKeys = Object.keys(old)
        for (let i = 0; i < newKeys.length || i < oldKeys.length; i++) {
          let nKey = newKeys[i], oKey = oldKeys[i]
          if (nKey && !oKey) { // add
            changes.update.push(nKey)
          } else if (nKey && oKey) {
            if (newest[nKey].hash !== old[oKey].hash) { // update
              newest[nKey].updateAt = util.getDate()
              changes.update.push(nKey)
            }
          } else if (!newKeys[i] && oldKeys[i]) { // delete
            changes.delete.push(oKey)
          }
        }
        return changes
    } else {
        throw 'diff方法的参数不能为空'
    }
}
