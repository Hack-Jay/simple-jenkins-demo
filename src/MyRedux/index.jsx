import React, { Component } from "react";
import { createStore } from "./redux";

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

const store = createStore(counterReducer);

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
