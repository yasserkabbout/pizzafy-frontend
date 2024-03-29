import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails.jsx";
import FormPizzaDetails from "./FormPizzaDetails";
import Confirm from "./Confirm";
import Success from "./Success";

export class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      pizzasArray: [],
      pizzaSizesArray: [],
      pizzasOptions: [],
      pizzaSizeOptions: [],
      numberOfPizzas: 1,
      selectedPizza: null,
      selectedPizzaSize: null,
      isLoadingPizzas: true,
      isLoadingPizzaSizes: true
    };
  }

  componentDidMount() {

    //TODO add api_client as a seperate component/file

    
    //Fetch all the Pizzas from the database
    fetch("http://localhost:5000/api/v1/pizzas", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ pizzasArray: data });
      })
      .then(() => {
        let pizzasOptions = [];

        this.state.pizzasArray.forEach(pizza => {
          let pizzaElement = (
            <option value={pizza.id} key={pizza.id}>
              {pizza.type}
            </option>
          );
          pizzasOptions.push(pizzaElement);
        });

        this.setState({ pizzasOptions: pizzasOptions, isLoadingPizzas: false });
      });

      //Fetch all the pizza sizes from the database
    fetch("http://localhost:5000/api/v1/pizzasizes", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ pizzaSizesArray: data });
      })
      .then(() => {
        let pizzaSizeOptions = [];

        this.state.pizzaSizesArray.forEach(size => {
          let sizeElement = (
            <option value={size.id} key={size.id}>
              {size.name}
            </option>
          );
          pizzaSizeOptions.push(sizeElement);
        });

        this.setState({
          pizzaSizeOptions: pizzaSizeOptions,
          isLoadingPizzaSizes: false
        });
      });
  }

  // Proceed to next step
  nextStep = () => {
    if (
      this.validateEmail(this.state.email) &&
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.phoneNumber !== "" &&
      this.state.address !== ""
    ) {
      const { step } = this.state;
      this.setState({
        step: step + 1
      });
    } else alert("Invalid Inputs!");
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    if (this.state.isLoadingPizzas && this.state.isLoadingPizzaSizes)
      return null;
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      pizzasArray,
      pizzaSizesArray,
      pizzasOptions,
      selectedPizza,
      numberOfPizzas,
      selectedPizzaSize,
      pizzaSizeOptions
    } = this.state;
    const values = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      pizzasArray,
      pizzaSizesArray,
      pizzasOptions,
      selectedPizza,
      numberOfPizzas,
      selectedPizzaSize,
      pizzaSizeOptions
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPizzaDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
    }
  }
}

export default UserForm;
