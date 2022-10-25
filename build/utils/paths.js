const fs = require('fs');

const path = require('path')

const appDirectory = fs.realpathSync(process.cwd());

/**
 * @method resolveApp
 * @description 从根路径开始查找文件
 */

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


module.exports = {
    appPath: resolveApp('.'),
    appPublic: resolveApp('public'),
    appBuild: resolveApp('dist'),
    appSrc: resolveApp('src'),
}