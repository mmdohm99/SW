import React from "react";

export const cartContext = React.createContext();

export class Context extends React.Component {
  state = { cart: JSON.parse(localStorage.getItem("cart")) || [] };

  render() {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    let cart = this.state.cart;

    const add = (product) => {
      this.setState({ cart: [...this.state.cart, product] });
    };

    const clear = () => {
      this.setState({ cart: [] });
    };

    const remove = (product) => {
      this.setState({
        cart: this.state.cart.filter((item) => item.name !== product.name),
      });
    };

    return (
      <cartContext.Provider value={{ add, clear, cart, remove }}>
        {this.props.children}
      </cartContext.Provider>
    );
  }
}
