import React,{useState,useEffect} from "react";
import { Container, Row, Col } from "shards-react";
import { Card, CardBody, Form, FormInput } from "shards-react";
import axios from 'axios';
import MemGraph from './memorygraph';
import CpuGraph from './cpugraph';




const Dash = ({ smallStats }) => {
  
  const [freeMem,setFreeMem] = useState('');
  const [availMem,setAvailMem] = useState('');
  const [cpuUsage,setCpuUsage] = useState('');
  const [cpuCount,setCpuCount] = useState('');
  const [sysUptime,setSysUptime] = useState('');
  const [sysPlatform,setSysPlatform] = useState('');
  useEffect(() => {

    const interval = setInterval(() =>  axios.get(`http://localhost:6900/fullinfo`)
    .then(res => {
      const info = res.data;
      var numberPattern = /\d+/g;


     
      setFreeMem(Math.round(info['free_mem']) + " MiB");
      setAvailMem(Math.round(info['avail_mem'])+ " MiB");
      setCpuUsage(Math.round(info['cpu_usage']*1000)/10+ "%");
      setSysPlatform(info['sys_platform']);
      setSysUptime(info['sys_uptime'] + " Secs");
      setCpuCount(info['cpu_count']);
   
    })
  , 1000);
    
     

    
    

  },[]);

  return <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
    
     
    </Row>

    {/* Small Stats Blocks */}
    <Row>
    <Col className="col-lg mb-4">
    <Card>
    <div style={{"padding":"10px"}}>  Platform :  {sysPlatform}</div>
    

  </Card>
<hr></hr>
<div style={{"padding":"5px"}} >  <Card>
    <div style={{"padding":"10px"}}>  Available Memory :  {availMem}</div> 
    

  </Card> </div>
  <div style={{"padding":"5px"}} >
  <Card>
    <div style={{"padding":"10px"}}> Free Memory :  {freeMem}</div>
    

  </Card> </div>
  <hr></hr>


  <div style={{"padding":"5px"}} >
  <Card>
    <div style={{"padding":"10px"}}> Cpu Usage : {cpuUsage}</div>
    

  </Card></div>
  <div style={{"padding":"5px"}} ><Card>
    <div style={{"padding":"10px"}}> Cpu Count : {cpuCount}</div>
    

  </Card> </div>




  <hr/>
  <Card>
    <div style={{"padding":"10px"}}> System Uptime : {sysUptime}</div>
    

  </Card>

    </Col>



    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="6" md="6" sm="12" className="mb-4">
        <Card><div style={{padding:'10px'}}> <MemGraph /></div></Card>
       
      </Col>

      {/* Users by Device */}
      <Col lg="6" md="6" sm="12" className="mb-4">
      <Card><div style={{padding:'10px'}}> <CpuGraph /></div></Card>
      </Col>
    </Row>
  </Container>
};


export default Dash;
