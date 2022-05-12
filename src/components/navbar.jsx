import React from "react";
import { gql } from "@apollo/client";
import { client } from "../App";
import { NavLink } from "react-router-dom";
import classes from "../styles/navbar.module.css";
import { cartContext } from "../Context/Context";
export class Navbar extends React.Component {
  state = {
    active: false,
    ON: false,
    Currencies: { currencies: [] },
  };

  componentDidMount() {
    const GET_Currencies = gql`
      query {
        currencies {
          label
          symbol
        }
      }
    `;
    client.query({ query: GET_Currencies }).then((res) => {
      const Currencies = res.data;

      this.setState({ Currencies: Currencies });
    });
  }
  // componentWillUnmount() {}
  render() {
    // const handleClickOutside = (event) => {
    // console.log(event);
    // event.stopPropagation();
    // console.log(menuRef);

    //   if (!menuRef?.current?.contains(event.target)) {
    //     this.setState({ ON: false });
    //   }
    // };

    // this.componentDidMount = () => {
    //   document.addEventListener("mousedown", (event) =>
    //     handleClickOutside(event)
    //   );

    // };

    // this.componentWillUnmount = () => {
    //   document.removeEventListener("mousedown", (event) =>
    //     handleClickOutside(event)
    //   );
    // };

    // let mRef = this.props.mRef;
    const { add, clear, remove, cart, setCurrency, choosenCurrency } =
      this.context;
    let cartPrices =
      cart?.map((item) => item?.prices?.map((price) => price?.amount)) || [];
    // console.log(x.map((item) => item[1]));
    let total =
      choosenCurrency === "USD" && cartPrices.length > 0
        ? cartPrices?.map((item) => item[0])?.reduce((a, b) => a + b)
        : choosenCurrency === "GBP"
        ? cartPrices?.map((item) => item[1])?.reduce((a, b) => a + b)
        : choosenCurrency === "AUD"
        ? cartPrices?.map((item) => item[2])?.reduce((a, b) => a + b)
        : choosenCurrency === "JPY"
        ? cartPrices?.map((item) => item[3])?.reduce((a, b) => a + b)
        : choosenCurrency === "RUB" &&
          cartPrices?.map((item) => item[4])?.reduce((a, b) => a + b);

    const toggle = () => {
      if (this.state.active === false) {
        this.setState({ active: true });
      } else {
        this.setState({ active: false });
      }
    };
    const on = () => {
      if (this.state.ON === false) {
        this.setState({ ON: true });
      } else {
        this.setState({ ON: false });
      }
    };
    // let menuRef = React.createRef();

    // console.log(mRef);
    // console.log(this.state);

    return (
      <>
        <div
          className={classes.navConatiner}

          // onClick={(event) => {
          //   handleClickOutside(event);
          // }}
        >
          <div>
            <div className={classes.con1}>
              <NavLink to="/" className={classes.button}>
                Home
              </NavLink>
            </div>
            <div>
              <NavLink to="/electronics" className={classes.button}>
                Electronics
              </NavLink>
            </div>
            <div>
              <NavLink to="/clothes" className={classes.button}>
                Clothes
              </NavLink>
            </div>
          </div>
          {/* ////////////////////////////////////////////////////////////////////////// */}
          <div>
            <div>
              <NavLink to="/cart">cart</NavLink>
            </div>{" "}
          </div>
          {/* //////////////////////////////////////////////////////////////////////////// */}
          <div className={classes.con3}>
            {choosenCurrency === "USD" ? (
              <span>{this?.state?.Currencies?.currencies[0]?.symbol}</span>
            ) : choosenCurrency === "GBP" ? (
              <span>{this?.state?.Currencies?.currencies[1]?.symbol}</span>
            ) : choosenCurrency === "AUD" ? (
              <span>{this?.state?.Currencies?.currencies[2]?.symbol}</span>
            ) : choosenCurrency === "JPY" ? (
              <span>{this?.state?.Currencies?.currencies[3]?.symbol}</span>
            ) : (
              choosenCurrency === "RUB" && (
                <span>{this?.state?.Currencies?.currencies[4]?.symbol}</span>
              )
            )}
            <button
              onClick={() => {
                on();
              }}
            >
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5L4 3.5L7 0.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              // ref={menuRef}
              // onClick={() => handleClickOutside(menuRef)}
              className={
                this.state.ON === true ? classes.active : classes.inactive
              }
            >
              {this?.state?.Currencies?.currencies?.map((currency) => (
                <div>
                  <span
                    onClick={() => {
                      setCurrency(currency.label);
                      this.setState({ ON: false });
                    }}
                  >
                    {" "}
                    {currency.label + currency.symbol}
                  </span>
                </div>
              ))}
            </div>
            {/* //////////////Cart Page Button///////////////////////// */}
            {/* ////////////////////////////CART_LAY_OUT////////////////////////////////////////////// */}
            <svg
              onClick={() => toggle()}
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z"
                fill="#43464E"
              />
              <path
                d="M8.44437 13.9814C7.2443 13.9814 6.25488 14.9276 6.25488 16.0751C6.25488 17.2226 7.24439 18.1688 8.44437 18.1688C9.64445 18.1696 10.6339 17.2234 10.6339 16.0757C10.6339 14.928 9.64436 13.9812 8.44437 13.9812V13.9814ZM8.44437 16.9011C7.9599 16.9011 7.58071 16.5385 7.58071 16.0752C7.58071 15.6119 7.9599 15.2493 8.44437 15.2493C8.92885 15.2493 9.30804 15.6119 9.30804 16.0752C9.30722 16.5188 8.90748 16.9011 8.44437 16.9011Z"
                fill="#43464E"
              />
              <path
                d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z"
                fill="#43464E"
              />
            </svg>
            <div
              className={
                this.state.active === true ? classes.active : classes.inactive
              }
            >
              <div>My Bag</div>
              {cart?.map((product) => (
                <div key={Math.random()} className={classes.card}>
                  <div>
                    <NavLink exact to={`/product/${product.id}`}>
                      <img
                        className={classes.overimg}
                        src={product.gallery[0]}
                        alt="Girl in a jacket"
                        width="200"
                        height="200"
                      />
                    </NavLink>
                  </div>
                  <div>
                    <button>+</button>
                    <span>1</span>
                    <button>-</button>
                  </div>
                  <div>
                    <h6>{product.id} </h6>
                    <h6>{product.brand} </h6>
                    <h6>Price : </h6>
                    {choosenCurrency === "USD" ? (
                      <span>
                        {product.prices[0]?.amount +
                          " " +
                          product.prices[0]?.currency?.symbol}{" "}
                      </span>
                    ) : choosenCurrency === "GBP" ? (
                      <span>
                        {product.prices[1]?.amount +
                          " " +
                          product.prices[1]?.currency?.symbol}{" "}
                      </span>
                    ) : choosenCurrency === "AUD" ? (
                      <span>
                        {product.prices[2]?.amount +
                          " " +
                          product.prices[2]?.currency?.symbol}{" "}
                      </span>
                    ) : choosenCurrency === "JPY" ? (
                      <span>
                        {product.prices[3]?.amount +
                          " " +
                          product.prices[3]?.currency?.symbol}{" "}
                      </span>
                    ) : (
                      choosenCurrency === "RUB" && (
                        <span>
                          {product.prices[4]?.amount +
                            " " +
                            product.prices[4]?.currency?.symbol}{" "}
                        </span>
                      )
                    )}

                    <div>
                      {product.attributes.map((attr) => {
                        return (
                          <div>
                            <div>{attr.name}</div>
                            {attr.items.map((item) => (
                              <button
                                style={{
                                  backgroundColor:
                                    item?.value?.split("")?.includes("#") &&
                                    item?.value,
                                  color:
                                    item?.value?.split("")?.includes("#") &&
                                    item?.value,
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
                  </div>
                  {/* <button onClick={() => add(product)}>
                    {" "}
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z"
                        fill="#43464E"
                      />
                      <path
                        d="M8.44437 13.9814C7.2443 13.9814 6.25488 14.9276 6.25488 16.0751C6.25488 17.2226 7.24439 18.1688 8.44437 18.1688C9.64445 18.1696 10.6339 17.2234 10.6339 16.0757C10.6339 14.928 9.64436 13.9812 8.44437 13.9812V13.9814ZM8.44437 16.9011C7.9599 16.9011 7.58071 16.5385 7.58071 16.0752C7.58071 15.6119 7.9599 15.2493 8.44437 15.2493C8.92885 15.2493 9.30804 15.6119 9.30804 16.0752C9.30722 16.5188 8.90748 16.9011 8.44437 16.9011Z"
                        fill="#43464E"
                      />
                      <path
                        d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z"
                        fill="#43464E"
                      />
                    </svg>
                  </button> */}

                  <button onClick={() => remove(product)}>remove </button>
                </div>
              ))}{" "}
              <div>
                <div>Total : {total}</div>
                <button onClick={() => clear()}>View Bag </button>
                <button onClick={() => clear()}>Check Out </button>
              </div>
            </div>
            {/* ///////////////////////////////////////////////////END OF CART LAY OUT////////////////////////////////// */}
          </div>
        </div>
      </>
    );
  }
}
Navbar.contextType = cartContext;
