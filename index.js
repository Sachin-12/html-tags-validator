const fs = require('fs');
const path = require('path')

const opening_tags =["html","head","body","title","h1","h2","span","b","div","p","a","h3","h4","h5","h6","nav","section","li"];
const closing_tags = ["/html","/head","/body","/title","/h1","/h2","/span","/b","/div","/p","/a","/h3","/h4","/h5","/h6","/nav","/section","/li"];  
const pattern = '<(.*?)>';
let stack = []
let a

function checkHtml(filePath){
    let htmlValidator = new Promise(function(resolve,reject) {
        let flag = 0 
        
        fs.readFile(filePath,'utf-8',(err,data)=>{
            if(!err){
                let allTags = data.matchAll(pattern)
                allTags = Array.from(allTags)
                // console.log(allTags)
                if(allTags[0][0] === "<!DOCTYPE html>"){
                    allTags.shift()
                }
                let individualTags = allTags.map(tag => 
                    tag[1].split(" ")[0]
                    )
                    // console.log(individualTags)
                    let notSelfClosingTags = individualTags.map(
                        function(tag) {  
                            if(opening_tags.includes(tag)){
                                stack.push(tag)
                                // console.log(stack.length)
                        }
                        else if(closing_tags.includes(tag)){
                            
                            a = stack.pop()
                            if (a=== undefined){
                                console.log("Issue: Closing tag is present without its opening tag")
                                resolve(flag) 
                            }    
                        }
                    }
                )
                // console.log(notSelfClosingTags)
                if(stack.length === 0){
                    // console.log(stack.length)
                    flag = 1
                    resolve(flag)
                }else{
                    console.log("Opening tag is present without its closing tag")
                    resolve(flag)
                }
                
            }else{
                reject(err)
            }
        })
    })
    htmlValidator.then((result)=>{
        if(result===1){
            console.log("Valid HTML")
        }else{
            console.log("Invalid HTML")
    
        }
    }).catch((err) => {
        console.log(err)}
    )
    

}


module.exports = checkHtml