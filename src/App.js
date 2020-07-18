import React from "react";
import "./css/main.scss";

import Nav from "./components/navbar";
import JokesRow from "./components/jokesRow";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav />
        <JokesRow />
      </div>
    );
  }
}

export default App;
