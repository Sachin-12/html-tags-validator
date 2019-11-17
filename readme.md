This library gets the absolute path as its input parameter and returns whether the HTML file has any tags which is not properly closed
## Installation
```
npm i html-tags-validator
```
## Usage
- Get the absolute path of the html file that needs to be validated
```
let filePath = path.join(__dirname,'./index.html')
```
`Example`

```
const checkHtml = require('html-tags-validator')
const path = require('path')
let filePath = path.join(__dirname,'./index.html')
checkHtml(filePath)
```
- This library also mentions whether the html file has improper opening tags or closing tags

#### TODO
- Support for all HTML Tags


