import React, { Component } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Input } from "reactstrap";

export class FormPizzaDetails extends Component {
  state = {
    selectedPizza: null
  };

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <div
            className="container bg-white rounded border border-custom h-50 mt-3"
            style={{ maxWidth: "30.9em" }}
          >
            <h4 className="text-center mt-3">Choose your Pizza</h4>

            <Input type="select" onChange={handleChange("selectedPizza")}>
              {values.pizzasOptions}
            </Input>
            <br />
            <TextField
              placeholder="Enter Your City"
              label="City"
              onChange={handleChange("city")}
              defaultValue={values.city}
              margin="normal"
              fullWidth={true}
            />
            <br />
            <TextField
              placeholder="Enter Your Bio"
              label="Bio"
              onChange={handleChange("bio")}
              defaultValue={values.bio}
              margin="normal"
              fullWidth={true}
            />
            <br />

            <div className="text-right mt-3 mb-3">
              <Button color="secondary" variant="contained" onClick={this.back}>
                Back{" "}
              </Button>{" "}
              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              >
                {" "}
                Continue
              </Button>
            </div>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormPizzaDetails;
