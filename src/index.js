import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/lh1z4hbvnhdl',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': `Bearer KtwZ5ExVEUXipPqI74DsdMsYs9YMtZL2xrDCmWKOzCY`
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router history={createBrowserHistory()}>
        <Route
          component={({ history }) => {
            window.appHistory = history;
            return <App />;
          }}
        />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
