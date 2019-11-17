const checkHtml = require('./index')
const path = require('path')
let filePath = path.join(__dirname,'./index.html')
checkHtml(filePath)