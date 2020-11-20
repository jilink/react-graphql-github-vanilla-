import React, { Component } from "react";
import axios from "axios";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const TITLE = "React GraphQl Github Client";

const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

class App extends Component {
  state = {
    path: "the-road-to-learn-react/the-road-to-learn-react",
  };
  componentWillMount() {
    this.onFetchFromGitHub();
  }

  onChange = (event) => {
    this.setState({ path: event.target.value });
  };

  onSubmit = (event) => {
    //fetch data
    event.preventDefault();
  };

  onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post("", { query: GET_ORGANIZATION })
      .then((result) => console.log(result));
  };

  render() {
    const { path } = this.state;
    return (
      <div>
        <h1>{TITLE}</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: "300px" }}
          />
        </form>
        <hr />
      </div>
    );
  }
}

export default App;
