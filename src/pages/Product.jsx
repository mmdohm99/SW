import React from "react";
import { gql } from "@apollo/client";
import { client } from "../App";
import { cartContext } from "../Context/Context";
import classes from "../styles/product.module.css";
export class Product extends React.Component {
  state = {
    products: { gallery: [], attributes: [], prices: [] },
    img: "",
    qty: 1,
    choosenAttributes: [],
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const GET_SINGLEPRODUCTS = gql`
        query {
          product(id: "${id}") {
            id
            name
            inStock
            gallery
            description
            category
            brand
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
          }
        }
      `;
    client.query({ query: GET_SINGLEPRODUCTS }).then((res) => {
      const product = res.data.product;
      this.setState({ products: product, img: product.gallery[0] });
    });
    console.log(this.state.products);
  }
  render() {
    const { add, choosenCurrency } = this.context;
    console.log(this?.state?.products);

    const bigImg = (img) => {
      this.setState({ img: img });
    };

    return (
      <div className={classes.container}>
        <div className={classes.gallary}>
          <div className={classes.Sgallary}>
            <img
              onClick={() => bigImg(this?.state?.products?.gallery[0])}
              className={classes.small}
              src={this?.state?.products?.gallery[0]}
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
            <img
              onClick={() =>
                bigImg(
                  this?.state?.products?.gallery[1] ||
                    this?.state?.products?.gallery[0]
                )
              }
              className={classes.small}
              src={
                this?.state?.products?.gallery[1] ||
                this?.state?.products?.gallery[0]
              }
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
            <img
              onClick={() =>
                bigImg(
                  this?.state?.products?.gallery[2] ||
                    this?.state?.products?.gallery[0]
                )
              }
              className={classes.small}
              src={
                this?.state?.products?.gallery[2] ||
                this?.state?.products?.gallery[0]
              }
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
            <img
              onClick={() =>
                bigImg(
                  this?.state?.products?.gallery[3] ||
                    this?.state?.products?.gallery[0]
                )
              }
              className={classes.small}
              src={
                this?.state?.products?.gallery[3] ||
                this?.state?.products?.gallery[0]
              }
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
          </div>
          <img
            className={classes.big}
            src={this?.state?.img}
            alt="Girl in a jacket"
            width="200"
            height="200"
          />
        </div>
        <div className={classes.info}>
          <h1>{this?.state?.products?.brand} </h1>
          <span>{this?.state?.products?.name}</span>
          <div>
            {this?.state?.products?.attributes.map((attr) => {
              return (
                <div>
                  <div>{attr.name}</div>
                  {attr.items.map((item) => (
                    <button
                      style={{
                        backgroundColor:
                          item?.value?.split("")?.includes("#") && item?.value,
                        color:
                          item?.value?.split("")?.includes("#") && item?.value,
                      }}
                    >
                      {item?.value?.split("")?.includes("#")
                        ? item?.displayValue
                        : item?.value}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
          <div className={classes.text}>
            <h3>{this?.state?.products?.prices[0]?.__typename} : </h3>
            {choosenCurrency === "USD" ? (
              <span>
                {this?.state?.products?.prices[0]?.amount +
                  " " +
                  this?.state?.products?.prices[0]?.currency?.symbol}{" "}
              </span>
            ) : choosenCurrency === "GBP" ? (
              <span>
                {this?.state?.products?.prices[1]?.amount +
                  " " +
                  this?.state?.products?.prices[1]?.currency?.symbol}{" "}
              </span>
            ) : choosenCurrency === "AUD" ? (
              <span>
                {this?.state?.products?.prices[2]?.amount +
                  " " +
                  this?.state?.products?.prices[2]?.currency?.symbol}{" "}
              </span>
            ) : choosenCurrency === "JPY" ? (
              <span>
                {this?.state?.products?.prices[3]?.amount +
                  " " +
                  this?.state?.products?.prices[3]?.currency?.symbol}{" "}
              </span>
            ) : (
              choosenCurrency === "RUB" && (
                <span>
                  {this?.state?.products?.prices[4]?.amount +
                    " " +
                    this?.state?.products?.prices[4]?.currency?.symbol}{" "}
                </span>
              )
            )}
          </div>
          <div>
            <button onClick={() => add(this?.state?.products)}>
              Add to Cart
            </button>
          </div>
          <div>
            {this?.state?.products?.description?.replace(/[<p></p>]+/g, "")}
          </div>
        </div>
      </div>
    );
  }
}
Product.contextType = cartContext;
