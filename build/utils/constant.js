const path = require('path')

/**
 * @method resolve
 * @description 从根路径开始查找文件
 */
 const resolve = (targetPath) => {
    return path.resolve(__dirname, '../../', targetPath);
};


// 构建目录
const DIST_PATH = resolve('dist');
// 源码目录
const SRC_PATH = resolve('src');
// public 目录
const PUBLIC_PATH = resolve('public');
// 是否是产线环境
const IS_PRO = process.env.NODE_ENV === 'production';
// 是否是开发环境
const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
    SRC_PATH,
    DIST_PATH,
    PUBLIC_PATH,
    IS_DEV,
    IS_PRO,
}