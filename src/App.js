import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom"
import {Data,TEMPERATURE,BOUTTON,HUMIDITE}from './model.js';
import { Link,BrowserRouter as Router, Route } from 'react-router-dom'


var mqtt = require('mqtt')
const client  = mqtt.connect("mqtt://localhost:8080")
    var listSensor=[];
client.on('connect', function() {
  client.subscribe('#');
});
var d=null;
var ob=null;

client.on('message',function(topic,message){

  


  const messages = document.querySelector('#messages');
  ob=JSON.parse(message.toString())
  var id_sensor=topic.substring(6)

      // message is Buffer

    // var line=document.getElementById(sensor.id);
    d =new Data(ob.value, new Date().toLocaleString())
    
      var index;
       if(isIn(listSensor,id_sensor)[0]===false){
           switch(ob.type) {
               case "TEMPERATURE":
               var sen=new TEMPERATURE(id_sensor,id_sensor,ob.type,d,"C");
               break;
               case "ON_OFF":
               var sen=new BOUTTON(id_sensor,id_sensor,ob.type,d);
               break;
               case "PERCENT":
               var sen=new HUMIDITE(id_sensor,id_sensor,ob.type,d,"%");
               break;
               default:
              }
           listSensor.push(sen)
          index=listSensor.length-1;
          }else{
           var index=isIn(listSensor,id_sensor)[1];
           listSensor[isIn(listSensor,id_sensor)[1]].data.values.push(eval(d.values));
           listSensor[isIn(listSensor,id_sensor)[1]].data.labels.push(d.labels);
           
          }
          console.log(listSensor)
          var sensor=listSensor[index]

          ReactDOM.render(<App val={ listSensor[isIn(listSensor,id_sensor)[1]]}/> ,document.getElementById('root'))

   /* if(sensor.type==="ON_OFF"){
    line.textContent="Capteur : "+sensor.id+" || Type = "+sensor.type+" ||  Dernier valeur capté : "+ob.value+" a :"+d.labels;
    }else{
     line.textContent="Capteur : "+sensor.id+" || Type = "+sensor.type+" || Moyenne = "+sensor.Moyenne()+"\n\n"+sensor.unite+" || Dernier valeur capté : "+ob.value+ " a :"+d.labels;      
    } */

})




function isIn(liste,sensor_id){
  var result=[]
  var index=-1
  var trouve=false;
  var i=0;
  for(i=0;i<listSensor.length;i++){
          if(listSensor[i].id === sensor_id){
              trouve=true
              index=i;
           }
     
  }
  result.push(trouve)
  result.push(index)
  return result;
}




//****************************************************************************** */


class TemperatureChambre extends Component{
  constructor(props){
    
    super(props)
      this.state={
        message:props.sensor
      }
    
   
  }
  render(){
    if(typeof(this.state.message)!=="undefined"){
      return(
            <p>
              <h1>{this.state.message.id}</h1>
              <h2>type: {this.state.message.type}</h2>
              <h2>derniere valeur capté: {Math.round((this.state.message.data.values[this.state.message.data.values.length-1])*100)/100 }{ this.state.message.unite}</h2>
              <h3>A :{this.state.message.data.labels[this.state.message.data.labels.length-1]}</h3>
              <h3>
                Historique:
                <ul>
                  <li>
                    {this.state.message.data.values.slice(this.state.message.data.values.length-6,this.state.message.data.values.length-1).map(function(temp,i){

                      return <li key={i}>{Math.round(temp*100)/100} C</li>
                    })}
                  </li>
                </ul>
                </h3>
              </p>
      )
  }else{
    return(null)
  }
  } 
}
class MonAttention extends Component{
  constructor(props){
    
    super(props)
      this.state={
        message:props.sensor
      }
    
   
  }
  render(){
    if(typeof(this.state.message)!=="undefined"){
      return(
            <p>
              <h1>{this.state.message.id}</h1>
              <h2>type: {this.state.message.type}</h2>
              <h2>derniere valeur capté: {Math.round((this.state.message.data.values[this.state.message.data.values.length-1])*100)/100 }{ this.state.message.unite}</h2>
              <h3>A :{this.state.message.data.labels[this.state.message.data.labels.length-1]}</h3>
              <h3>
                Historique:
                <ul>
                  <li>
                    {this.state.message.data.values.slice(this.state.message.data.values.length-6,this.state.message.data.values.length-1).map(function(temp,i){

                      return <li key={i}>{Math.round(temp*100)/100}%</li>
                    })}
                  </li>
                </ul>
                </h3>
            </p>
      )
  }else{
    return(null)
  }
  } 
}
class TemperatureSalle extends Component{
  constructor(props){
    
    super(props)
      this.state={
        message:props.sensor
      }
    
   
  }
  render(){
    if(typeof(this.state.message)!=="undefined"){
      return(
        
            <p>
              <h1>{this.state.message.id}</h1>
              <h2>type: {this.state.message.type}</h2>
              <h2>derniere valeur capté: {Math.round((this.state.message.data.values[this.state.message.data.values.length-1])*100)/100 }{ this.state.message.unite}</h2>
              <h3>A :{this.state.message.data.labels[this.state.message.data.labels.length-1]}</h3>
              <h3>
                Historique:
                <ul>
                  <li>
                    {this.state.message.data.values.slice(this.state.message.data.values.length-6,this.state.message.data.values.length-1).map(function(temp,i){

                      return <li key={i}>{Math.round(temp*100)/100} C</li>
                    })}
                  </li>
                </ul>
              </h3>
            </p>
      )
  }else{
    return(null)
  }
  } 
}
class Yeux extends Component{
  constructor(props){
    
    super(props)
      this.state={
        message:props.sensor
      }
    
   
  }
  render(){
    if(typeof(this.state.message)!=="undefined"){
      return(
            <p>
              <h1>{this.state.message.id}</h1>
              <h2>type: {this.state.message.type}</h2>
              <h2>valeur actuelle: {this.state.message.data.values[this.state.message.data.values.length-1] }</h2>
              <h3>A :{this.state.message.data.labels[this.state.message.data.labels.length-1]}</h3>
              <h3>
                Historique:
                <ul id="tableau">
                  <li>
                    {this.state.message.data.values.slice(this.state.message.data.values.length-6,this.state.message.data.values.length-1).map(function(temp,i){

                      return <li key={i}>{temp}</li>
                    })}
                  </li>
                </ul>
                </h3>
              </p>
      )
  } else{
    return(null)
  }
  } 
}
class App extends Component {

      constructor(props){
        super(props);
        this.state={
            valeur:[]
        };
      }
      componentWillReceiveProps(props){
        var capteur;
        switch(props.val.id){
          case "temperatureSalleA111":
          
          this.setState({
            temperatureSalle:props.val
          })
          break;
          case "MesYeux":
          this.setState({
            yeux:props.val
          })
          break;
          case "MonAttention": this.setState({
            monAttention: props.val
          })
          break;
          case "temperatureChambre": this.setState({
            temperatureChambre:props.val
          })
          break;
        }
       
      }
      
     /* componentWillReceiveProps(nprops){
        this.setState({
          valeur:nprops.val
        })
      }*/
      
      

  render() {
    return (

        <Router>
            <div className="App">
                ​​
                <body>
                <header> <p className="url">Url Brocker:</p>
                    <input id="bro" type="text" onKeyDown="clicker"></input>

                </header>
                <div className="wrapper">

                    <Route path="/TemperatureSalle" component={()=><TemperatureSalle sensor={this.state.temperatureSalle}/>} />

                    <Route path="/TemperatureChambre" component={()=><TemperatureChambre sensor={this.state.temperatureChambre}/>}/>
                    <Route path="/Yeux" component={()=><Yeux sensor={this.state.yeux}/>}/>
                    <Route path="/MonAttention" component={()=><MonAttention sensor={this.state.monAttention}/>}/>


                    <nav>
                        <Link to="/TemperatureSalle" >
                            <button id="b1" >Temperature Salle</button>
                        </Link>

                        <Link to="/TemperatureChambre" >
                            <button id="b2" >temperature Chambre</button>
                        </Link>


                        <Link to="/Yeux" >
                            <button id="b3" >Mes yeux</button>
                        </Link>

                        <Link to="/MonAttention" >
                            <button id="b4" >Mon Attention</button>
                        </Link>




                    </nav>
                </div>
                </body>



            </div>
        </Router>
    );
  }
}

export default App;