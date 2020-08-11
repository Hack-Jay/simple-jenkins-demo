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
    // 返回action将来中间件用
    return action;
  }

  function subscribe(cb) {
    currentListener.push(cb);
  }

  // init data
  dispatch({ type: "@Z_ZPP/INIT_DATA" });
  return { getState, dispatch, subscribe };
}

// 强化dispatch
export function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    // 将来中间件函数签名如下： funtion ({}) {}
    //[fn1(dispatch),fn2(dispatch)] => fn(diaptch)
    const chain = middlewares.map((mv) => mv(midApi));
    dispatch = compose(...chain)(store.dispatch);
    // dispatch is : (action) => {
    // 	console.log(action.type + " logger2 is exec!", "logger dispatch", dispatch);
    // 	return dispatch(action);
    //   };
    console.log("dispatch", dispatch);
    console.log("compose(...chain)", compose(...chain));
    return {
      ...store,
      dispatch,
    };
  };
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((left, right) => (...args) => {
    console.log("left(...args)", left(...args));
	console.log("right", right);
	console.log("right(left(...args))", right(left(...args)))

    return right(left(...args));
  });
}

// compose组合后的参数值： 第一个函数执行完后返回的值为第二个函数的参数值，
// 所以第二个参数还是原来的参数，只是dispatch为上一个函数的返回值
// let right = dispatch => action => {
//     console.log(action.type + " logger2 is exec!", "logger dispatch", dispatch);
//     return dispatch(action);
//   }

// right(action => {
//     console.log(action.type + " logger is exec!", "dispath", dispatch);
//     return dispatch(action);
//   })
// const fn = [ dispatch => action => {
//     console.log(action.type + " logger is exec!", "dispath", dispatch);
//     return dispatch(action);
//   },
//   dispatch => action => {
//     console.log(action.type + " logger2 is exec!", "logger dispatch", dispatch);
//     return dispatch(action);
//   }] (store.dispatch)
