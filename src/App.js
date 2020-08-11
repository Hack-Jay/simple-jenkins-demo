import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyRedux from "./MyRedux";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Link to="/" className="App-link">
            Home
          </Link>
          <Link to="/redux" className="App-link">
            MyRedux
          </Link>
          <br />
          <Switch>
            <Route component={MyRedux} exact path="/redux" />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
