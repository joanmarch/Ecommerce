import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar.js";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { findDOMNode } from "react-dom";
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';
import {toast} from 'react-toastify';
import { URL } from '../../../../config'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false,
      showCheckout: false
    };
  }
  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }
  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }
 
  async handleCheckout(token, addresses ){
    let purchasedProducts = []
    let url = URL + "/purchase/order";
    this.state.cart.map(product => {
      purchasedProducts.push({
        id : product.id,
        price: product.price,
        quantity : product.quantity
      })
    })
  try{
      
      let response = await axios.post(url, {token, purchasedProducts}  );
     
      
      
      const {status} = response.data;
      
      toast.configure();
      if (status === "success"){
        toast ("Success! Check email for details", {type: 'success'})
      }else{
        toast ("Something went wrong", {type: 'error'})
      }
           
  }catch (error){
      console.log(error);
  }
  // var stripeHandler = StripeCheckout.configure ({
  //   key:stripePublicKey,
  //   locale:'en',
  //   // this token method is going to be called after the person fills out all bank info, clicks de purchase button, stipe verifies everything, send back a response and call this method

  //   token: function(token){
  //     //need to send to the server items and quantities so it can calculate the total price to be charged
  //     var items = [];
  //     // var carRows = document.getElementsByClassName.name....
  //     // for (var = i= 0; i<)
  //     // item.push({
  //     //   id:id,
  //     //   quantity:quantity
  //     // })
  //     // axious.post("/purchase")
  //     // payload = {
  //     //   stripeTokenId : token.id,
  //     //   items: items
  //     // }
  //   }
  // })
  // stripeHandler.open({
  //   amount : totalPrice
  // })
}

  
   
  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    const buttonNode = findDOMNode(this.refs.cartButton);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.getElementById('mainPage').addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.getElementById('mainPage').removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      false
    );
  }

  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="#"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            ×
          </a>
        </li>
      );
    });
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
      <header>
        <div className="container">
          <div className="brand">
            <img
              className="logo"
              src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
              alt="Veggy Brand Logo"
            />
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
                alt="search"
              />
            </a>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <img
                  src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                  alt="back"
                />
              </a>
              <input
                type="search"
                ref="searchBox"
                placeholder="Search for Vegetables and Fruits"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
              <button
                className="search-button"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
              />
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img
                className={this.props.cartBounce ? "tada" : " "}
                src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>{view}</CartScrollBar>
              {/* <div className="action-block">
                <button
                  type="button"
                  className={this.state.cart.length > 0 ? " " : "disabled"}
                  onClick={this.handleCheckout.bind(this)}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div> */}
              <StripeCheckout
                stripeKey ="pk_test_0Bq7kFqTeBgymShgty7TgBBI00hGkx0XWn" 
                token ={this.handleCheckout.bind(this)}
                billingAddress
                shippingAddress
                amount={this.props.total * 100}
                name = {"Pago cesta de la compra"}
                currency = 'EUR'
              > 
              
              </StripeCheckout>           
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;