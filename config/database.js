// File-backed persistent starter store. Replace with PostgreSQL/MySQL for production multi-instance hosting.
const fs=require('fs'); const path=require('path');
const dir=path.join(__dirname,'..','data');
function read(name,fallback=[]){try{return JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'))}catch{return fallback}}
function write(name,value){fs.mkdirSync(dir,{recursive:true});const p=path.join(dir,name),tmp=p+'.tmp';fs.writeFileSync(tmp,JSON.stringify(value,null,2));fs.renameSync(tmp,p)}
module.exports={read,write};
