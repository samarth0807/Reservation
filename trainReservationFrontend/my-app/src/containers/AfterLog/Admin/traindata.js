import React,{Component, useState} from 'react'
import Navbar from '../NavBar'
import { Container, Row, Col } from 'reactstrap';
import {
  Button,
  Segment,
  Input,
  Form
} from 'semantic-ui-react'




const Traindata=()=>{

  const [inputElement,setInputElement]=useState({
    fromStation:'',
    toStation:'',
    fDeptTime:'',
    fDeptDate:'',
    tArrTime:'',
    tArrDate:'',
    midStationCount:0,
    midStationCountArr:[],
    priceArray:[{
      id:'',
      endStationName:'',
      genCoachFair:'',
      acCoachFair:'',
      sleepCoachFair:''
    }],
    midStations:[{
      id:'',
      name:'',
      arrTime:'',
      arrDate:'',
      deptTime:'',
      deptDate:''
    }],
    trainName:'',
    trainNumber:'',

  })

  const handleSubmit=async(event)=>{
    event.preventDefault();
    console.log(inputElement)
    const genCoachCount=document.getElementsByName('genCoachCount').value;
    const acCoachCount=document.getElementsByName('acCoachCount').value;
    const sleepCoachCount=document.getElementsByName('sleepCoachCount').value;
    const data={
      fromStatio:inputElement.fromStation,
      toStation:inputElement.toStation,
      fDeptTime:inputElement.fDeptTime,
      fDeptDate:inputElement.fDeptDate,
      tArrDate:inputElement.tArrDate,
      tArrTime:inputElement.tArrTime,
      priceArray:inputElement.priceArray,
      midStations:inputElement.midStations,
      name:inputElement.trainName,
      number:inputElement.trainNumber,
      genCoachCount,
      sleepCoachCount,
      acCoachCount
    }
    console.log(data)
    const response=await fetch('http://localhost:8000/admin/addRail', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    const finalResponse=await response.json();
    const successMessage=finalResponse.successMessage;
    const errorMessage=finalResponse.errorMessage;
    if(successMessage){
      alert(successMessage);
    }else if(errorMessage){
      alert(errorMessage);
    }
  }
  const inputEvent=(event)=>{
    var _id=null;
    if(event.target.id){
      _id=event.target.id;
    }
    const name=event.target.name;
    const value=event.target.value;
    console.log(name)
    console.log(value)
    setInputElement((prevState)=>{
      if(name=='deptGenCoachFair'||name=='deptSleepCoachFair'||name=='deptAcCoachFair'){
        const priceArrayCompulsory=(prevState.priceArray).filter((price)=>(price.endStationName != inputElement.toStation));
        var priceArrayFiltered=(prevState.priceArray).filter((price)=>(price.endStationName == inputElement.toStation));
        var obj;
        if(priceArrayFiltered.length>0){
          if(name=='deptGenCoachFair'){
            obj={
              genCoachFair:value,
              acCoachFair:priceArrayFiltered.acCoachFair,
              sleepCoachFair:priceArrayFiltered.sleepCoachFair,
              endStationName:priceArrayFiltered.endStationName
            };
          }
          if(name=='deptSleepCoachFair'){
            obj={
              genCoachFair:priceArrayFiltered.sleepCoachFair,
              acCoachFair:priceArrayFiltered.acCoachFair,
              sleepCoachFair:value,
              endStationName:priceArrayFiltered.endStationName
            };
          }
          if(name=='deptAcCoachFair'){
            obj={
              genCoachFair:priceArrayFiltered.genCoachFair,
              acCoachFair:value,
              sleepCoachFair:priceArrayFiltered.sleepCoachFair,
              endStationName:priceArrayFiltered.endStationName
            };
          }
          console.log("h")
          console.log(priceArrayFiltered);
          console.log(obj)
          return{
            trainName:prevState.trainName,
            trainNumber:prevState.trainNumber,
            fromStation:prevState.fromStation,
            toStation:prevState.toStation,
            fDeptTime:prevState.fDeptTime,
            fDeptDate:prevState.fDeptDate,
            tArrTime:prevState.tArrTime,
            tArrDate:prevState.tArrDate,
            midStationCount:prevState.midStationCount,
            midStationCountArr:prevState.midStationCountArr,
            priceArray:[...priceArrayCompulsory,obj],
            midStations:prevState.midStations
          }
        }else{
          if(name=='deptGenCoachFair'){
            priceArrayFiltered={
              endStationName:inputElement.toStation,
              genCoachFair:value,
              acCoachFair:'',
              sleepCoachFair:'',
              id:0
            }
          }
          if(name=='deptSleepCoachFair'){
            priceArrayFiltered={
              endStationName:inputElement.toStation,
              genCoachFair:'',
              acCoachFair:'',
              sleepCoachFair:value,
              id:0
            }
          }
          if(name=='deptAcCoachFair'){
            priceArrayFiltered={
              endStationName:inputElement.toStation,
              genCoachFair:'',
              acCoachFair:value,
              sleepCoachFair:'',
              id:0
            }
          }
          return{
            trainName:prevState.trainName,
            trainNumber:prevState.trainNumber,
            fromStation:prevState.fromStation,
            toStation:prevState.toStation,
            fDeptTime:prevState.fDeptTime,
            fDeptDate:prevState.fDeptDate,
            tArrTime:prevState.tArrTime,
            tArrDate:prevState.tArrDate,
            midStationCount:prevState.midStationCount,
            midStationCountArr:prevState.midStationCountArr,
            priceArray:[...priceArrayCompulsory,priceArrayFiltered],
            midStations:prevState.midStations
          }
        }
      }
      if(_id){
        if(name=='name'){
          const midStationFiltered=(prevState.midStations).filter((midStation)=>midStation.id != _id);
          const priceFiltered=(prevState.priceArray).filter((price)=>price.id != _id);
          var midStationObj=(prevState.midStations).filter((midStation)=>midStation.id == _id);
          var priceObj=(prevState.priceArray).filter((price)=>price.id == _id);
          if((midStationObj.length>0)&&(priceObj.length>0)){
            midStationObj.name=value;
            priceObj.name=value;
            return{
              trainName:prevState.trainName,
              trainNumber:prevState.trainNumber,
              fromStation:prevState.fromStation,
              toStation:prevState.toStation,
              fDeptTime:prevState.fDeptTime,
              fDeptDate:prevState.fDeptDate,
              tArrTime:prevState.tArrTime,
              tArrDate:prevState.tArrDate,
              midStationCount:prevState.midStationCount,
              midStationCountArr:prevState.midStationCountArr,
              priceArray:[...priceFiltered,priceObj],
              midStations:[...midStationFiltered,midStationObj]
            }
          }else if((midStationObj.length>0)){
            midStationObj.name=value;
            return{
              trainName:prevState.trainName,
              trainNumber:prevState.trainNumber,
              fromStation:prevState.fromStation,
              toStation:prevState.toStation,
              fDeptTime:prevState.fDeptTime,
              fDeptDate:prevState.fDeptDate,
              tArrTime:prevState.tArrTime,
              tArrDate:prevState.tArrDate,
              midStationCount:prevState.midStationCount,
              midStationCountArr:prevState.midStationCountArr,
              priceArray:prevState.priceArray,
              midStations:[...midStationFiltered,midStationObj]
          }
        }else{
          priceObj.name=value;
            return{
              trainName:prevState.trainName,
              trainNumber:prevState.trainNumber,
              fromStation:prevState.fromStation,
              toStation:prevState.toStation,
              fDeptTime:prevState.fDeptTime,
              fDeptDate:prevState.fDeptDate,
              tArrTime:prevState.tArrTime,
              tArrDate:prevState.tArrDate,
              midStationCount:prevState.midStationCount,
              midStationCountArr:prevState.midStationCountArr,
              priceArray:[...priceFiltered,priceObj],
              midStations:prevState.midStations
          }
        }
        }else if(name=='name'||name=='arrTime'||name=='arrDate'||name=='deptDate'||name=='deptTime'){
          const filtered=(prevState.midStations).filter((midStation)=>midStation.id != _id);
          var obj=(prevState.midStations).filter((midStation)=>midStation.id == _id);
          if(obj.length>0){
            if(name=='name'){
              obj.name=value;
            }
            if(name=='arrTime'){
              obj.arrTime=value;
            }
            if(name=='arrDate'){
              obj.arrDate=value;
            }
            if(name=='deptDate'){
              obj.deptDate=value;
            }
            if(name=='deptTime'){
              obj.deptTime=value;
            }
            return{
              trainName:prevState.trainName,
              trainNumber:prevState.trainNumber,
              fromStation:prevState.fromStation,
              toStation:prevState.toStation,
              fDeptTime:prevState.fDeptTime,
              fDeptDate:prevState.fDeptDate,
              tArrTime:prevState.tArrTime,
              tArrDate:prevState.tArrDate,
              midStationCount:prevState.midStationCount,
              midStationCountArr:prevState.midStationCountArr,
              priceArray:prevState.priceArray,
              midStations:[...filtered,obj]
            }  
          }else{
            if(name=='name'){
              obj={
                name:value,
                arrTime:'',
                arrDate:'',
                deptTime:'',
                deptdate:'',
                id:_id
              }
            }
            if(name=='arrTime'){
              obj={
                name:'',
                arrTime:value,
                arrDate:'',
                deptTime:'',
                deptdate:'',
                id:_id
              }
            }
            if(name=='arrDate'){
              obj={
                name:'',
                arrTime:'',
                arrDate:value,
                deptTime:'',
                deptdate:'',
                id:_id
              }
            }
            if(name=='deptDate'){
              obj={
                name:'',
                arrTime:'',
                arrDate:'',
                deptTime:'',
                deptdate:value,
                id:_id
              }
            }
            if(name=='deptTime'){
              obj={
                name:'',
                arrTime:'',
                arrDate:'',
                deptTime:value,
                deptdate:'',
                id:_id
              }
            }
            return{
              trainName:prevState.trainName,
              trainNumber:prevState.trainNumber,
              fromStation:prevState.fromStation,
              toStation:prevState.toStation,
              fDeptTime:prevState.fDeptTime,
              fDeptDate:prevState.fDeptDate,
              tArrTime:prevState.tArrTime,
              tArrDate:prevState.tArrDate,
              midStationCount:prevState.midStationCount,
              midStationCountArr:prevState.midStationCountArr,
              priceArray:prevState.priceArray,
              midStations:[...filtered,obj]
            }  
          }
          
        }else if(name=='genCoachFair'||name=='acCoachFair'|| name=='sleepCoachFair'|| name=='name'){
          const filtered=(prevState.priceArray).filter((price)=>price.id != _id);
          var obj=(prevState.priceArray).filter((price)=>price.id == _id);
          if(obj.length>0){
            if(name=='genCoachFair'){
              obj.genCoachFair=value;
            }
            if(name=='acCoachFair'){
              obj.acCoachFair=value;
            }
            if(name=='sleepCoachFair'){
              obj.sleepCoachFair=value;
            }
            return{
              trainName:prevState.trainName,
              trainNumber:prevState.trainNumber,
              fromStation:prevState.fromStation,
              toStation:prevState.toStation,
              fDeptTime:prevState.fDeptTime,
              fDeptDate:prevState.fDeptDate,
              tArrTime:prevState.tArrTime,
              tArrDate:prevState.tArrDate,
              midStationCount:prevState.midStationCount,
              midStationCountArr:prevState.midStationCountArr,
              priceArray:[...filtered,obj],
              midStations:prevState.midStations
            }
          }else{
            if(name=='genCoachFair'){
              obj={
                id:_id,
                genCoachFair:value,
                sleepCoachFair:'',
                acCoachFair:''
              }
            }
            if(name=='acCoachFair'){
              obj={
                id:_id,
                genCoachFair:'',
                sleepCoachFair:'',
                acCoachFair:value
              }
            }
            if(name=='sleepCoachFair'){
              obj={
                id:_id,
                genCoachFair:'',
                sleepCoachFair:value,
                acCoachFair:''
              }
            }
            return{
              trainName:prevState.trainName,
              trainNumber:prevState.trainNumber,
              fromStation:prevState.fromStation,
              toStation:prevState.toStation,
              fDeptTime:prevState.fDeptTime,
              fDeptDate:prevState.fDeptDate,
              tArrTime:prevState.tArrTime,
              tArrDate:prevState.tArrDate,
              midStationCount:prevState.midStationCount,
              midStationCountArr:prevState.midStationCountArr,
              priceArray:[...filtered,obj],
              midStations:prevState.midStations
            }
          }
        }
      }
      if(name=='trainName'){
        return{
          trainName:value,
          trainNumber:prevState.trainNumber,
          fromStation:prevState.fromStation,
          toStation:prevState.toStation,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:prevState.fDeptDate,
          tArrTime:prevState.tArrTime,
          tArrDate:prevState.tArrDate,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='trainNumber'){
        return{
          trainName:prevState.trainName,
          trainNumber:value,
          fromStation:prevState.fromStation,
          toStation:prevState.toStation,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:prevState.fDeptDate,
          tArrTime:prevState.tArrTime,
          tArrDate:prevState.tArrDate,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='sourceStation'){
        return{
          trainName:prevState.trainName,
          trainNumber:prevState.trainNumber,
          fromStation:value,
          toStation:prevState.toStation,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:prevState.fDeptDate,
          tArrTime:prevState.tArrTime,
          tArrDate:prevState.tArrDate,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='destinationStation'){
        return{
          trainName:prevState.trainName,
          trainNumber:prevState.trainNumber,
          fromStation:prevState.fromStation,
          toStation:value,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:prevState.fDeptDate,
          tArrTime:prevState.tArrTime,
          tArrDate:prevState.tArrDate,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='fDeptTime'){
        return{
          trainName:prevState.trainName,
          trainNumber:prevState.trainNumber,
          fromStation:prevState.fromStation,
          toStation:prevState.toStation,
          fDeptTime:value,
          fDeptDate:prevState.fDeptDate,
          tArrTime:prevState.tArrTime,
          tArrDate:prevState.tArrDate,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='fDeptDate'){
        return{
          trainName:prevState.trainName,
          trainNumber:prevState.trainNumber,
          fromStation:prevState.fromStation,
          toStation:prevState.toStation,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:value,
          tArrTime:prevState.tArrTime,
          tArrDate:prevState.tArrDate,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='tArrTime'){
        return{
          trainName:prevState.trainName,
          trainNumber:prevState.trainNumber,
          fromStation:prevState.fromStatio,
          toStation:prevState.toStation,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:prevState.fDeptDate,
          tArrTime:value,
          tArrDate:prevState.tArrDate,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='tArrDate'){
        return{
          trainName:prevState.trainName,
          trainNumber:prevState.trainNumber,
          fromStation:prevState.fromStatio,
          toStation:prevState.toStation,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:prevState.fDeptDate,
          tArrTime:prevState.tArrTime,
          tArrDate:value,
          midStationCount:prevState.midStationCount,
          midStationCountArr:prevState.midStationCountArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
      if(name=='midStationCount'){
        var tempArr=[];
        for(var i=1;i<=value;i++){
          tempArr.push(i);
        }
        return{
          trainName:prevState.trainName,
          trainNumber:prevState.trainNumber,
          fromStation:prevState.fromStatio,
          toStation:prevState.toStation,
          fDeptTime:prevState.fDeptTime,
          fDeptDate:prevState.fDeptDate,
          tArrTime:prevState.tArrTime,
          tArrDate:prevState.tArrDate,
          midStationCount:value,
          midStationCountArr:tempArr,
          priceArray:prevState.priceArray,
          midStations:prevState.midStations
        }
      }
    })
  }

 

  return (
    <div style={{height:'100%'}}>
      <>
      <Navbar/>
      </>
    
      <header style={{margin:'0px',backgroundImage:`url(${"https://images.unsplash.com/photo-1617653695386-1d78957d33f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"})`,height:'1000px',backgroundSize:'cover',padding:'30px'}}>

      <Segment inverted style={{marginLeft:'10%',marginRight:'10%',marginTop:'0px',borderRadius:'20px',width:'75%'}} >
      
      <Form  onSubmit={handleSubmit}>
      <Input 
        value={inputElement.trainName}
        name='trainName'
        onChange={inputEvent}
        type="text" 
        style={{marginLeft:'15%',width:'300px',marginTop:'0.8em',marginBottom:'0.8em'}}
        inverted 
        placeholder='Enter Train Name'
        />
        <Input 
        value={inputElement.trainNumber}
        name='trainNumber'
        onChange={inputEvent}
        type="number" 
        style={{marginLeft:'25px',width:'300px',marginTop:'0.8em',marginBottom:'0.8em'}}
        inverted 
        placeholder='Enter Train Number'
        />
        <Input 
        value={inputElement.sourceStation}
        name='sourceStation'
        onChange={inputEvent}
        type="text" 
        style={{marginLeft:'15%',width:'300px'}}
        inverted 
        placeholder='Enter Source Station'
        />
        <Input 
        value={inputElement.destinationStation}
        name='destinationStation'
        onChange={inputEvent}
        type="text" 
        style={{marginLeft:'25px',width:'300px'}}
        inverted 
        placeholder='Enter Destination Station'
        />
        <Input 
        value={inputElement.fDeptDate}
        name='fDeptDate'
        onChange={inputEvent}
        type="date" 
        style={{marginLeft:'25%',width:'400px',marginTop:"20px"}}
        inverted
        />
        <Input 
        value={inputElement.tArrDate}
        name='tArrDate'
        onChange={inputEvent}
        type="date" 
        style={{paddingTop:'10px',marginLeft:'25%',width:'400px'}}
        inverted
        />
        <Input 
        value={inputElement.fDeptTime}
        name='fDeptTime'
        onChange={inputEvent}
        type="time" 
        style={{marginLeft:'25%',width:'400px',marginTop:"20px"}}
        inverted
        />
        <Input 
        value={inputElement.tArrTime}
        name='tArrTime'
        onChange={inputEvent}
        type="time" 
        style={{marginLeft:'25%',width:'400px',marginTop:"20px"}}
        inverted
        />
        

        
        <Container>
          <Row>
            <Col>
            <select name="genCoachCount" className="browser-default custom-select" style={{marginLeft:'25%',alignItems:'center',width:'300px',marginTop:'2%'}}>
              <option value='0'>No of General Coaches</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            </Col>
            <Col>
            <Input
              // value={inputElement.midStationCount} 
              name='deptGenCoachFair'
              onChange={inputEvent}
              type="number" 
              style={{marginLeft:'-15%',width:'300px',marginTop:'2%'}}
              inverted 
              placeholder='Genral Coach'
            />
            </Col>
          </Row>
          <Row>
            <Col>
            <select name="sleepCoachCount" className="browser-default custom-select" style={{marginLeft:'25%',alignItems:'center',width:'300px',marginTop:'2%'}}>
              <option value='0'>No of Sleep Coaches</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            </Col>
            <Col>
            <Input
              // value={inputElement.midStationCount} 
              name='deptSleepCoachFair'
              onChange={inputEvent}
              type="number" 
              style={{marginLeft:'-15%',width:'300px',marginTop:'2%'}}
              inverted 
              placeholder='Sleep Coach'
            />
            </Col>
          </Row>
          <Row>
            <Col>
            <select name="acCoachCount" className="browser-default custom-select" style={{marginLeft:'25%',alignItems:'center',width:'300px',marginTop:'2%'}}>
              <option value='0'>No of Ac Coaches</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            </Col>
            <Col>
            <Input
              // value={inputElement.midStationCount} 
              name='deptAcCoachFair'
              onChange={inputEvent}
              type="number" 
              style={{marginLeft:'-15%',width:'300px',marginTop:'2%'}}
              inverted 
              placeholder='Ac Coach'
            />
            </Col>
          </Row>
        </Container>
        
        
        <Input
        value={inputElement.midStationCount} 
        name='midStationCount'
        onChange={inputEvent}
        type="number" 
        style={{marginLeft:'34%',width:'200px',marginTop:'0.1%'}}
        inverted 
        placeholder='No of Midstations'
        />
        {(inputElement.midStationCount>0)&&
           <Container>
           <Row>
             <Col style={{marginLeft:'8%',marginTop:'1%'}}><h5>Station Name</h5></Col>
             <Col style={{marginLeft:'25px',marginTop:'1%'}}><h5>Arrival Date</h5></Col>
             <Col style={{marginLeft:'25px',marginTop:'1%'}}><h5>Arrival Time</h5></Col>
             <Col style={{marginLeft:'25px',marginTop:'1%'}}><h5>Departure Date</h5></Col>
             <Col style={{marginLeft:'25px',marginTop:'1%'}}><h5>Departure Time</h5></Col>
           </Row>
           </Container>
        }    
        {(inputElement.midStationCount>0)&&(inputElement.midStationCountArr).map((e)=>{
           return(
                  <div key={e} id={e}>
                 
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="text" 
                     style={{marginLeft:'7%',width:'200px',marginTop:'10px'}}
                     inverted 
                     placeholder='Midstation Name'
                     name='name'
                    />
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="date" 
                     style={{marginLeft:'25px',width:'200px',marginTop:"10px"}}
                     inverted
                     name='arrDate'
                    />
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="time" 
                     style={{marginLeft:'25px',width:'200px',marginTop:"10px"}}
                     inverted
                     name='arrTime'
                    />
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="date" 
                     style={{marginLeft:'25px',width:'200px',marginTop:'10px'}}
                     inverted
                     name='deptDate'
                    />
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="time" 
                     style={{marginLeft:'25px',width:'200px',marginTop:'10px'}}
                     inverted
                     name='deptTime'
                    />
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="number" 
                     style={{marginLeft:'38%',width:'200px',marginTop:'10px'}}
                     inverted 
                     placeholder='General Coach Fare'
                     name='genCoachFair'
                    />
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="number" 
                     style={{marginLeft:'38%',width:'200px',marginTop:'10px'}}
                     inverted 
                     placeholder='Sleep Coach Fare'
                     name='sleepCoachFair'
                    />
                    <Input 
                     onChange={inputEvent}
                     id={e} 
                     type="number" 
                     style={{marginLeft:'38%',width:'200px',marginTop:'10px'}}
                     inverted 
                     placeholder='Ac Coach Fare'
                     name='acCoachFair'
                    />
                  </div>
            )
        })}
        
        <Button inverted style={{marginLeft:'37%',width:'150px',marginTop:'20px'}}content='Add Train' primary />
      </Form>
 
      </Segment>
     
      </header>

    </div>
    
  )
}

export default Traindata;