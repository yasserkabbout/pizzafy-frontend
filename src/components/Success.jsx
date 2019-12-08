import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

export class Success extends Component {
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
      <MuiThemeProvider > 
        <React.Fragment>
        <div
            className="container bg-white rounded border border-custom h-50 mt-3"
            style={{ maxWidth: "30.9em" }}
          >
            <h4 className="text-center mt-3">Your order has been placed at the restaurant</h4>
            
            <p className="text-center">You may now track your order</p>
         </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Success;