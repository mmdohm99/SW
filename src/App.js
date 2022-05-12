import React from "react";
import { Context } from "./Context/Context";

import { Navbar } from "./components/navbar.jsx";
import { All } from "./pages/All.jsx";
import { Electronics } from "./pages/Electronics.jsx";
import { Clothes } from "./pages/Clothes.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Product } from "./pages/Product.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export class App extends React.Component {
  render() {
    // let mRef = (this.ref = React.createRef());
    // console.log(mRef);
    return (
      <>
        <div ref={this.ref}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Context>
                <Navbar />
                <Route exact path="/product/:id" component={Product} />
                <Route exact path="/" component={All} />
                <Route exact path="/electronics" component={Electronics} />
                <Route exact path="/clothes" component={Clothes} />
                <Route exact path="/cart" component={Cart} />
              </Context>
            </BrowserRouter>
          </ApolloProvider>
        </div>
      </>
    );
  }
}

export default App;
