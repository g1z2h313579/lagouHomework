#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ejs = require('ejs')
const inquirer = require('inquirer');


function create( str, content ){
    let path = [];
    let arr = str.split("/");
    let len = arr.length;
    for( let i=0; i<len; i++ ){
        path.push(arr[i]);
        let filename = path.join("/");
        // 判断这个文件或文件夹是否存在
        let bln = fs.existsSync(filename);
        if( bln == false ){
            if( i<len-1 ){  // 一定是文件夹
                fs.mkdirSync(filename);
            }else{
                // 判断是文件还是文件夹                
                if( arr[i].indexOf(".") > -1 ){
                    // 如果是文件
                    fs.writeFileSync(filename,content);
                }else{
                    // 如果是文件夹
                    fs.mkdirSync(filename);
                }
            }
        }
    }
}


function readf(p,answer) {
    let tmpPath = path.join(__dirname, ...p);
    fs.readdir(tmpPath, (err, files) => {
        if (files) {
            if (err) throw err;
            files.map(v => {
                if (v) {
                    readf([...p, v],answer)
                }
            })
        } else {
            // console.log("tmpPath",tmpPath)
            p.splice(0,1);
            ejs.renderFile(tmpPath, answer, (err, result) => {
                create(path.join(...p),result)
            })
        }
    })
}




inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'your project name is ?'
    }
])
    .then(answer => {
        readf(['template'],answer)
    })


