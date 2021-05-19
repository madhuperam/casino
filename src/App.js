import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import logo from "./imgs/logo2.png";
import user from "./imgs/user.png";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      balance: 99.99,
      name: "",
      num1: 0,
      num2: 0,
      num3: 0
    }
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    this.fake = this.fake.bind(this);
    this.close = this.close.bind(this);
    this.addRow = this.addRow.bind(this);
    this.login = this.login.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logout(){
    document.getElementById("logout-user").classList.remove("hidden");
  }

  logoutUser(){
    this.setState(()=>({
      name: ""
    }));
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("logout-user").classList.add("hidden");
    document.getElementById("user").classList.add("hidden");
  }

  loginUser(){
    this.setState(()=>({
      name: document.getElementById("name").value
    }));

    document.getElementById("login-name").classList.add("hidden");
    document.getElementById("user").classList.remove("hidden");
  }

  login(){
    document.getElementById("login-name").classList.remove("hidden");
    document.getElementById("login").classList.add("hidden");
  }


  addRow(tableId, num1, num2, num3){
    var table = document.getElementById("game-data");
    var rowCnt = table.rows.length;
    var row = table.insertRow(rowCnt);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = rowCnt-1;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = num1+" - "+num2+" - "+num3;
    var cell3 = row.insertCell(2);
    var currentdate = new Date();
    cell3.innerHTML = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  }

  play(){
    document.getElementById("play-area").classList.remove("hidden");
    document.getElementById("non-play").classList.add("hidden");
  }

  start(){
    var n1 = Math.ceil(Math.random() * 9);
    var n2 = Math.ceil(Math.random() * 9);
    var n3 = Math.ceil(Math.random() * 9);
    var b = this.state.balance - 1;
    if(n1===n2 || n1===n3 || n2===n3){
      b = b+0.5;
    }else if(n1===n2 && n1===n3){
      if(n1===7){
        b += 10;
      }else{
        b+= 5;
      }
    }
    this.setState(()=>({
      num1: n1,
      num2: n2,
      num3: n3,
      balance: b.toFixed(2)
    }));
    this.addRow("game-date",n1,n2,n3);
  }

  close(){
    document.getElementById("play-area").classList.add("hidden");
    this.setState((state)=>({
      num1: 0,
      num2: 0,
      num3: 0
    }));
    document.getElementById("non-play").classList.remove("hidden");
  }

  fake(){
    this.setState((state)=>({
      num1: 7,
      num2: 7,
      num3: 7,
      balance: (state.balance - 1+10).toFixed(2)
    }));
    this.addRow("game-date",7,7,7);
  }

  render(){
    return(
      <div className = "App">
        <div className = "header">
          <img src={logo} alt="Company logo" id="company-logo" />
          <p id= "balance">Balance: ${this.state.balance}</p>
          <p className="user hidden" id="user" onClick={this.logout}>Hi {this.state.name}</p>
          <p className="user" onClick={this.login} id="login">LOGIN</p>
          <div className = "hidden" id="login-name">
            <p>Enter Name</p>
            <input type="text" id="name" />
            <button className="btn btn-default" type="button" onClick = {this.loginUser}>LOGIN</button>
          </div>
          <div className = "hidden" id="logout-user">
            <button className="btn btn-default" type="button" onClick = {this.logoutUser}>LOGOUT</button>
          </div>
        </div>
        <div className = "content">
          <div id = "non-play" >
            <table id="game-data" className="table" >
              <thead>
                <tr>
                  <th scope="col">Id </th>
                  <th scope="col">Slot</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>0 - 0 - 0</td>
                  <td>Now</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-default" type="button" id ="play" onClick = {this.play}>PLAY</button>
          </div>
          <div id = "play-area" className="hidden">
            <div className = "num-div">
              <div className = "num" id="num1">
                <p className="num-p">{this.state.num1}</p>
              </div>
              <div className = "num" id="num2">
                <p className="num-p">{this.state.num2}</p>
              </div>
              <div className = "num" id="num3">
                <p className="num-p">{this.state.num3}</p>
              </div>
            </div>
            <button className="btn btn-default" type="button" onClick = {this.start}>START</button>
            <button className="btn btn-default" type="button" onClick = {this.fake}>DEBUG</button>
            <button className="btn btn-default" type="button" onClick = {this.close}>CLOSE</button>
          </div>
        </div>
        <div className = "footer">
          <p>Copyright © 2021 Paktolus Group. All rights reserved</p>
        </div>
      </div>
    )
  }

}


export default App;
