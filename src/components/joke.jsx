import React from "react";
import $ from "jquery";

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {joke : this.props.joke};
  }
  render() {
    return (
      <div className="col-4">
        <div className="card">
          <div className="card-header">{this.state.joke.title}</div>
          <div className="card-body">{this.state.joke.body}</div>
          <div className="card-footer">
            <div className="btn-group float-right">
              <button className="btn btn-outline-dark" onClick={() => this.like(this.state.joke.uid)}>like</button>
              <button className="btn btn-outline-dark" onClick={() => this.unlike(this.state.joke.uid)}>unlike</button>
            </div>
            <span className="badge badge-info float-right mr-2">{this.state.joke.likes + " likes"}</span>
            <span className="text-muted float-left">{this.timeSince(this.state.joke.createdDate)}</span>
          </div>
        </div>
      </div>
    );
  }

  like(jokeId){
    $.ajax({
      method : "POST",
      url : "/api/like/" + jokeId,
      success : (data) => {
        let joke = {...this.state.joke};
        joke.likes = joke.likes + 1;
        this.setState({joke});
        //this.setState({joke.likes : joke.likes+1});
      }
    });
  }

  unlike(jokeId){
    $.ajax({
      method : "POST",
      url : "/api/unlike/" + jokeId,
      success : (data) => {
        let joke = {...this.state.joke};
        joke.likes = joke.likes - 1;
        this.setState({joke});
        //this.setState({joke.likes : joke.likes+1});
      }
    });
  }

  timeSince(timeStamp) {
    console.log(timeStamp);
    let now = new Date(),
      secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast < 60) {
      return parseInt(secondsPast) + "s ago ";
    }
    if (secondsPast < 3600) {
      return parseInt(secondsPast / 60) + "m ago ";
    }
    if (secondsPast <= 86400) {
      return parseInt(secondsPast / 3600) + "h ago ";
    }
    if (secondsPast > 86400) {
      let day = timeStamp.getDate();
      let month = timeStamp
        .toDateString()
        .match(/ [a-zA-Z]*/)[0]
        .replace(" ", "");
      let year =
        timeStamp.getFullYear() == now.getFullYear()
          ? ""
          : " " + timeStamp.getFullYear();
      return day + " " + month + year;
    }
  }
}

export default Joke;
