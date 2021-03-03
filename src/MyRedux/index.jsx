import React, { Component } from "react";
import { createStore, applyMiddleware } from "./redux";

const counterReducer = function (state = 0, action) {
  const num = action.payload || 1;
  console.log(action);
  switch (action.type) {
    case "add":
      return state + num;
    case "minus":
      return state - num;
    default:
      return state;
  }
};

// 自定义中间件
function logger({ dispatch, getState }) {
  return (dispatch) => (action) => {
    console.log(action.type + " logger is exec!", "dispath", dispatch);
    return dispatch(action);
  };
}

function logger2({ dispatch, getState }) {
  return (dispatch) => (action) => {
    console.log(action.type + " logger2 is exec!", "logger dispatch", dispatch);
    return dispatch(action);
  };
}

const store = createStore(counterReducer, applyMiddleware(logger, logger2));

class MyRedux extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    return (
      <div>
        State: {store.getState()}
        <button onClick={() => store.dispatch({ type: "add" })}> Add </button>
      </div>
    );
  }
}

export default MyRedux;