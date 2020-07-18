import React from "react";
import Joke from "./joke";
import $ from "jquery";

class JokesRow extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    $.ajax({
      url : "/api/hello",
      success : (data) => {
        console.log(data);
        this.setState({
          jokes : data,
        })
      }
    });
  }
  render() {
    if(!this.state) {
      return (<div>Loading...</div>);
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            {this.state.jokes.map((joke) => (
              <Joke key={joke.id} joke={joke} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default JokesRow;
