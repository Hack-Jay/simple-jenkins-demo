export function createStore(reducer, enhancer) {
	if (enhancer) {
		return enhancer(createStore)(reducer);
	}

	let currentState = undefined;
	const currentListener = [];

	function getState() {
		return currentState;
	}

	function dispatch(action) {
		currentState = reducer(currentState, action);
		currentListener.forEach((v) => v());
		return action;
	}

	function subscribe(cb) {
		currentListener.push(cb);
	}

	// init data
	dispatch({ type: "@Z_ZPP/INIT_DATA" });
	return { getState, dispatch, subscribe };
}

export function applyMiddleware(...middlewares) {}
