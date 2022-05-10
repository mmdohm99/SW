import React from "react";
import { gql } from "@apollo/client";
import { client } from "../App";

import classes from "../styles/home.module.css";
export class Product extends React.Component {
  state = {};

  componentDidMount() {
    const id = this.props.match.params.id;

    const GET_SINGLEPRODUCTS = gql`
        query {
          product(id: "${id}") {
            name
            gallery
            description
            brand
            prices {
              amount
              currency {
                label
              }
            }
          }
        }
      `;
    client.query({ query: GET_SINGLEPRODUCTS }).then((res) => {
      const product = res.data.product;
      this.setState({ product });
    });
  }
  render() {
    console.log(this?.state?.product?.gallery[0]);

    return (
      <div className={classes.card}>
        hiiii
        <img
          src={this?.state?.product?.gallery[0]}
          alt="Girl in a jacket"
          width="200"
          height="200"
        />
        <h1>{this?.state?.product?.name} </h1>
      </div>
    );
  }
}
