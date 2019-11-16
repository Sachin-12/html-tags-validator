const fs = require('fs');
const path = require('path')

const opening_tags =["html","head","body","title","h1","h2","span","b","div","p","a"];
const closing_tags = ["/html","/head","/body","/title","/h1","/h2","/span","/b","/div","/p","/a"];  
const pattern = '<(.*?)>';

let stack = []

let htmlValidator = new Promise(function (resolve,reject) {
    filePath = "./index.html"

    fs.readFile(path.join(__dirname,filePath),'utf-8',(err,data)=>{
        if(!err){
            let allTags = data.matchAll(pattern)
            allTags = Array.from(allTags)
            // console.log(allTags)
            if(allTags[0][0] === "<!DOCTYPE html>"){
                allTags.shift()
            }
            let flag = 0
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
                        try{
                            stack.pop()
                        }
                        catch(err){
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
            reject(flag)
        }
    })
})

htmlValidator.then((result)=>{
    if(result===1){
        console.log("Valid HTML")
    }else{
        console.log("Invalid HTML")

    }
})