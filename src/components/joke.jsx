import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <div className="card-footer">
            <div className="btn-group float-right">
              <button className="btn btn-outline-dark">like</button>
              <button className="btn btn-outline-dark">unlike</button>
            </div>
            <span className="badge badge-info float-right mr-2">{this.props.joke.likes + " likes"}</span>
            <span className="text-muted float-left">{this.timeSince(this.props.joke.createdDate)}</span>
          </div>
        </div>
      </div>
    );
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
