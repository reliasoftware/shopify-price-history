import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/styles.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Cookies from 'js-cookie';
import './App.css';
import Products from './containers/Products';

const HOST = process.env.HOST;
const client = new ApolloClient({
  uri: `${HOST}/graphql`,
});
const config = {
  apiKey: 'e43b73524b43b97d08e7db1292699930',
  shopOrigin: Cookies.get('shopOrigin'),
  forceRedirect: true,
};
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider config={config}>
          <AppProvider>
            <ApolloProvider client={client}>
              <Products />
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </div>
    );
  }
}

export default hot(module)(App);
