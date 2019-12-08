import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class FormUserDetails extends Component {
  

  // componentDidMount() {

  //   fetch("http://localhost:5000/api/v1/users", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json"
  //     }
  //   }).then(res => {
  //     return res.json()})
  //     .then(data => {
  //       this.setState({usersArray: data, isLoadingUsers: false});
  //     });

    
  // }


  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {

  
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <div
            className="container bg-white rounded border border-custom h-50 mt-3"
            style={{ maxWidth: "40em" }}
          >
            <h4 className="text-center mt-3">Enter your details</h4>
            <TextField
              placeholder="Enter Your First Name"
              label="First Name"
              onChange={handleChange("firstName")}
              defaultValue={values.firstName}
              margin="normal"
              fullWidth={true}
            />
            <br />
            <TextField
              placeholder="Enter Your Last Name"
              label="Last Name"
              onChange={handleChange("lastName")}
              defaultValue={values.lastName}
              margin="normal"
              fullWidth={true}
            />
            <br />
            <TextField
              name="email"
              placeholder="Enter Your Email"
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
              margin="normal"
              fullWidth={true}
            />
            <br />
            <TextField
            name="phoneNumber"
              placeholder="Enter Your Phone Number"
              label="Phone number"
              onChange={handleChange("phoneNumber")}
              defaultValue={values.phoneNumber}
              margin="normal"
              fullWidth={true}
            />
            <br />
            <TextField
            name="address"
              placeholder="Enter Your Address"
              label="Address"
              onChange={handleChange("address")}
              defaultValue={values.address}
              margin="normal"
              fullWidth={true}
            />
            <br />
            <div className="text-right mb-3 mt-3">
              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              >
                Continue
              </Button>
            </div>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormUserDetails;
