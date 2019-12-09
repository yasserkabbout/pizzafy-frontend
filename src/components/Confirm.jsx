import React, { Component } from "react";
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
      pizzasArray: this.props.values.pizzasArray,
      pizzaSizesArray: this.props.values.pizzaSizesArray,
      pizzaAsName: null,
      sizeAsName: null,
      sizeCoefficient: null,
      basePrice: null,
      totalPrice: null
    };

    this.prepareBasePrice();
    this.preparePizzaAsName();
    this.prepareSizeAsName();
    this.prepareTotalPrice();
  }

  prepareBasePrice = () => {
    let id = parseFloat(this.state.selectedPizza);

    let basePrice = null;

    this.state.pizzasArray.map(pizza => {
      if (pizza.id === id) {
        basePrice = pizza.base_price;
        this.state.basePrice = basePrice;
      }
    });
  };

  preparePizzaAsName = () => {
    let id = parseFloat(this.state.selectedPizza);

    let pizzaAsName = null;

    this.state.pizzasArray.map(pizza => {
      if (pizza.id === id) {
        pizzaAsName = pizza.type;
        this.state.pizzaAsName = pizzaAsName;
      }
    });
  };

  prepareSizeAsName = () => {
    let id = parseFloat(this.state.selectedPizzaSize);

    let sizeAsName = null;
    let sizeCoefficient = null;

    this.state.pizzaSizesArray.map(size => {
      if (size.id === id) {
        sizeAsName = size.name;
        sizeCoefficient = size.coefficient;
        this.state.sizeAsName = sizeAsName;
        this.state.sizeCoefficient = sizeCoefficient;
      }
    });
  };

  prepareTotalPrice = () => {
    this.state.totalPrice =
      parseFloat(this.state.basePrice) *
      parseFloat(this.state.sizeCoefficient) *
      parseFloat(this.state.numberOfPizzas);
  };

  continue = e => {

    let userData = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      phone_number: this.state.phoneNumber,
      address: this.state.address

    }

    let orderItem = {
      pizza_id: this.state.selectedPizza,
      size: this.state.selectedPizzaSize,
      quantity: this.state.numberOfPizzas,
      price: this.state.totalPrice
    }
  
    let orderData = {
      userData: userData,
      orderItem: orderItem,
      total_price: this.state.totalPrice,
      status: "Submitted"
    }

    fetch("http://localhost:5000/api/v1/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)

    })
    .then(response => {

        return response.json();
    });

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
                  secondary={
                    this.state.pizzaAsName +
                    " (" +
                    this.state.basePrice +
                    " euros)"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Pizza Size"
                  secondary={
                    this.state.sizeAsName +
                    "( * " +
                    this.state.sizeCoefficient +
                    ")"
                  }
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
                  secondary={
                    "Total Price = " + this.state.totalPrice + " euros"
                  }
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
                Confirm & Pay
              </Button>
            </div>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
