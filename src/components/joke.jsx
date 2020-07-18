import React from "react";

class Joke extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-4">
        <div className="card">
          <div className="card-header">{this.props.joke.title}</div>
          <div className="card-body">{this.props.joke.body}</div>
        </div>
      </div>
    );
  }
}

export default Joke;
