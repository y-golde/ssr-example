import React from "react";
import "./css/main.scss";

import Nav from "./components/navbar";
import Joke from "./components/joke";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [
        {
          id: 1,
          title: "exam1",
          body: "testtesttesttest",
        },
        {
          id: 2,
          title: "exam2",
          body: "test2test2test2test2",
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            {this.state.jokes.map((exam) => (
              <Joke key={exam.id} joke={exam} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
