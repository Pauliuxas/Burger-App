import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {


  // componentWillMount () {
  //   this.props.onInitPurchase();
  // }
  //   state = {
  //     ingredients: null,
  //     price: 0
  //   };

  // constructor(props) {
  //   super(props);
  //   const query = new URLSearchParams(props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = parseInt(param[1]);
  //     }
  //   }
  //   this.state ={
  //       ingredients: ingredients,
  //       price: price
  //   }
  // }

  //   componentWillMount() {
  //     // const queryReceived = query.parse(this.props.location.search)

  //     console.log(
  //       "Current Query string",
  //       queryString.parse(this.props.location.search)
  //     );
  //     const query = new URLSearchParams(this.props.location.search);
  //     const ingredients = {};
  //     let price = 0;
  //     for (let param of query.entries()) {
  //       if (param[0] === "price") {
  //         price = param[1];
  //       } else {
  //         ingredients[param[0]] = +param[1];
  //       }
  //     }

  //     this.setState({ ingredients: ingredients, price: price });
  //   }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };
  checkoutContinued = () => {
    this.props.history.push("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      summary = (
        <div>
        {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
          />
        </div>
      );
    }
    return summary;
  }
}


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
