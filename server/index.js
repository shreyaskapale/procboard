const express = require('express');
const {exec} = require("child_process");
const os = require('os-utils');
const { stdout, stderr } = require('process');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/procmem',(req,res)=>{
    
    exec("cat /proc/meminfo", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
  
        res.send(stdout.split('\n'))
    });
    

});

app.get('/mem',(req,res)=>{
   
            res.send(os.freemem().toString())


});
app.get('/cpu',(req,res)=>{
   
        os.cpuUsage((r)=>res.send(r.toString()))
});
app.get('/fullinfo',(req,res)=>{


    (async () => {
        res.send({
            'cpu_usage': await new Promise(r => os.cpuUsage(r)),
            'cpu_count':os.cpuCount(),
            'free_mem':os.freemem(),
            'avail_mem':os.totalmem(),
            'sys_uptime':os.sysUptime(),
            'sys_platform':os.platform(),
            


        })
    })();


});

app.listen(6900, () => {
    console.log(`http://localhost:6900`)
  })
