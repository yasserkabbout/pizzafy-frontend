import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

export class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.values.firstName,
      lastName: this.props.values.lastName,
      email: this.props.values.email,
      phoneNumber: this.props.values.phoneNumber,
      address: this.props.values.address,
      selectedPizza: this.props.values.selectedPizza,
      selectedPizzaSize: this.props.values.selectedPizzaSize,
      numberOfPizzas: this.props.values.numberOfPizzas,
      base_price: null,
      total_price: null
    };
  }

  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <div
            className="container bg-white rounded border border-custom h-50 mt-3"
            style={{ maxWidth: "30.9em" }}
          >
            <h4 className="text-center mt-3">Confirm your Order</h4>
            <List>
              <ListItem>
                <ListItemText
                  primary="First Name"
                  secondary={this.state.firstName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last Name"
                  secondary={this.state.lastName}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={this.state.email} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Phone Number"
                  secondary={this.state.phoneNumber}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={this.state.address}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Your Pizza"
                  secondary={this.state.selectedPizza}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Pizza Size"
                  secondary={this.state.selectedPizzaSize}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Quantity"
                  secondary={this.state.numberOfPizzas}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Total Price"
                  secondary={this.state.total_price}
                />
              </ListItem>
            </List>
            <br />
            <div className="text-right mt-3 mb-3">
              <Button color="secondary" variant="contained" onClick={this.back}>
                Back
              </Button>{" "}
              {""}
              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              >
                Confirm & Continue
              </Button>
            </div>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
