import React from "react";

export const cartContext = React.createContext();

export class Context extends React.Component {
  state = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    CURRENCY: "USD",
  };

  render() {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    let cart = this.state.cart;

    const add = (product) => {
      if (!this.state.cart.map((item) => item.id).includes(product.id)) {
        this.setState({ cart: [...this.state.cart, product] });
      }
    };

    const clear = () => {
      this.setState({ cart: [] });
    };

    const remove = (product) => {
      this.setState({
        cart: this.state.cart.filter((item) => item.name !== product.name),
      });
    };

    const setCurrency = (currency) => {
      this.setState({ CURRENCY: currency });
    };
    let choosenCurrency = this.state.CURRENCY;
    return (
      <cartContext.Provider
        value={{ add, clear, cart, remove, setCurrency, choosenCurrency }}
      >
        {this.props.children}
      </cartContext.Provider>
    );
  }
}
