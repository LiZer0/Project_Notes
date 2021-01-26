import React, { Component } from "react";
import "./SplashScreen.scss";
import logoReact from "../../../assets/img/logo/logoReact.svg";
import { Button } from "@material-ui/core";

class SplashScreen extends Component {
  handlerLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };
  handlerRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };
  handlerSkip = () => {
    const { history } = this.props;
    history.push("/dashboard");
  };

  render() {
    return (
      <div className="spl-container">
        <div className="spl-home">
          <img className="spl-logo" src={logoReact} alt="logo" />
          <p className="welcome-text">Welcome</p>

          <Button onClick={this.handlerLogin}>LOGIN</Button>
          <br></br>
          <Button onClick={this.handlerRegister}>REGISTER</Button>
          <hr></hr>
          <Button onClick={this.handlerSkip}>Skip</Button>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
