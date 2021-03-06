/*
 * Parent cart component displays all cart items in a table,
 * and changes to cart are handled through here.
 * Interfaces for submitting cart are presented through modal.
 */

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import { Ghost } from "react-kawaii";
import * as userProfile from "../../store/userProfile";
import * as user from "../../store/user";
import * as orders from "../../store/orders";
import * as messages from "../../store/messages";
import * as locations from "../../store/deliveryLocations";
import ReactTable from "react-table";
import Form from "./markup/fields";
import Messages from "../utilities/messages";
import ErrorHandler from "../../functions/errorHandler";

type props = {
  user: types.user;
  userProfile: types.userProfile;
  locations: types.location[];
  loadLocations: () => void;
  setUserProfile: (object: types.userProfile) => void;
  updateCart: (newProfile) => void;
  newOrder: (newOrder) => boolean;
  errorMessage: () => void;
  successMessage: () => void;
};

type state = {
  limitExceeded: boolean;
  cart: types.supplyItem[];
  showForm: boolean;
};

export class Cart extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      limitExceeded: false,
      cart: props.userProfile.cart,
      showForm: false
    };
  }

  componentDidMount() {
    this.props.loadLocations();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cart: nextProps.userProfile.cart
    });
  }

  // delete item from cart
  deleteItem(item: types.supplyItem): void {
    try {
      // copy cart, sub item
      const itemDeleted = this.state.cart.filter(
        i => i.item.cartegraphID != item.item.cartegraphID
      );
      // send it to the store
      this.postCart(itemDeleted);
    } catch (err) {
      ErrorHandler(err);
    }
  }

  // increase quantity of item in cart
  increaseQuantity(item: types.supplyItem): void {
    try {
      // copy the cart
      const cartCopy = this.state.cart;
      // find the item that needs increased
      const itemIndex = cartCopy.findIndex(
        i => i.item.cartegraphID == item.item.cartegraphID
      );
      if (
        // where PBF, cap at 60
        cartCopy[itemIndex].quantity + 1 > 60 &&
        item.item.department == "Bureau of Fire"
      ) {
        this.setState({ limitExceeded: true });
      } else {
        // increase the quantity, and post cart copy to store
        cartCopy[itemIndex].quantity++;
        this.postCart(cartCopy);
      }
    } catch (err) {
      ErrorHandler(err);
    }
  }

  // decrease quantity of item in cart
  decreaseQuantity(item: types.supplyItem) {
    try {
      // copy cart
      const cartCopy = this.state.cart;
      // find item to be decreased
      const itemIndex = cartCopy.findIndex(
        i => i.item.cartegraphID == item.item.cartegraphID
      );
      // if drawing to zero, just delete it
      if (cartCopy[itemIndex].quantity - 1 < 1) {
        this.deleteItem(item);
      } else {
        // increase by 1, and post copy  to store
        cartCopy[itemIndex].quantity--;
        this.postCart(cartCopy);
      }
    } catch (err) {
      ErrorHandler(err);
    }
  }

  // updates cart in store by passing new user profile
  postCart(newCart: types.supplyItem[]): void {
    try {
      const newUserProfile = {
        user: this.props.user.email,
        cart: newCart
      };
      this.setState({ limitExceeded: false });
      this.props.updateCart(newUserProfile);
    } catch (err) {
      ErrorHandler(err);
    }
  }

  showForm() {
    this.setState({ showForm: true });
  }

  render() {
    const { limitExceeded, cart, showForm } = this.state;

    const columns: Array<any> = [
      {
        Header: "Item",
        accessor: "item",
        Cell: props => <b>{props.value.itemName}</b>
      },
      {
        Header: "Quantity",
        accessor: "quantity"
      },
      {
        Header: "Type",
        accessor: "item",
        Cell: props => <div>{props.value.itemType}</div>
      },
      {
        Header: "",
        accessor: "item",
        Cell: props => (
          <button
            onClick={() => this.decreaseQuantity(props.original)}
            className="btn btn-warning"
            title="Decrease quantity"
          >
            <span className="glyphicon glyphicon-minus" />
          </button>
        ),
        maxWidth: 65
      },
      {
        Header: "",
        accessor: "item",
        Cell: props => (
          <button
            onClick={() => this.increaseQuantity(props.original)}
            className="btn btn-success"
            title="Increase quantity"
          >
            <span className="glyphicon glyphicon-plus" />
          </button>
        ),
        maxWidth: 65
      },
      {
        Header: "",
        accessor: "item",
        Cell: props => (
          <button
            onClick={() => this.deleteItem(props.original)}
            className="btn btn-danger"
            title="Delete item"
          >
            <span className="glyphicon glyphicon-remove" />
          </button>
        ),
        maxWidth: 65
      }
    ];

    // PBF likes to see those units with inventory items
    if (this.props.userProfile.department == "Bureau of Fire") {
      columns.splice(1, 0, {
        Header: "Unit",
        accessor: "item",
        Cell: props => <div>{props.value.itemUnit}</div>
      });
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h2 className="oswald">Your cart</h2>
          <hr />
        </div>
        <Messages />
        {cart.length > 0 && (
          <div>
            {limitExceeded && (
              <div className="col-md-12 text-center">
                <div className="alert alert-danger">
                  Sorry, you can't have that much.
                </div>
              </div>
            )}
            <ReactTable
              data={cart}
              columns={columns}
              loading={false}
              minRows={0}
              showPagination={false}
              showPageSizeOptions={false}
              noDataText=""
              getTdProps={() => ({
                style: {
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: "14px"
                }
              })}
            />
            <div className="col-md-12 text-center">
              <br />
              <button
                onClick={this.showForm.bind(this)}
                className="btn btn-primary"
              >
                <span style={{ fontSize: "1.2em", padding: "25px" }}>
                  <b>Complete order</b>
                  <span
                    style={{ marginLeft: "15px" }}
                    className="glyphicon glyphicon-ok"
                  />
                </span>
              </button>
            </div>
          </div>
        )}
        {cart.length == 0 && (
          <div className="col-md-12 text-center" style={{ margin: "60px 0px" }}>
            <Ghost size={200} mood="shocked" color="#AED3E5" />
            <div
              className="alert alert-info"
              style={{ maxWidth: "650px", margin: "0 auto" }}
            >
              <h3>Your cart is empty</h3>
            </div>
          </div>
        )}
        {showForm && (
          <Form
            closeForm={() => this.setState({ showForm: false })}
            user={this.props.user}
            userProfile={this.props.userProfile}
            locations={this.props.locations}
            updateCart={this.props.updateCart.bind(this)}
            newOrder={this.props.newOrder.bind(this)}
            successMessage={this.props.successMessage.bind(this)}
            errorMessage={this.props.errorMessage.bind(this)}
            formType="Complete"
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.userProfile,
    ...state.user,
    ...state.orders,
    ...state.locations,
    ...state.messages
  }),
  {
    ...userProfile.actionCreators,
    ...user.actionCreators,
    ...orders.actionCreators,
    ...locations.actionCreators,
    ...messages.actionCreators
  }
)(Cart as any);
