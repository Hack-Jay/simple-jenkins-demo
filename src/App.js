import React from "react";
import logo from "./logo.svg";
// comp
import MyRedux from "./MyRedux";

import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{/* <p> */}
					<MyRedux />
				{/* </p> */}
			</header>
		</div>
	);
}

export default App;
