import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Modal from 'react-modal';
import queryString from 'query-string';
import './App.css';
import Chart from './Chart';
import { getProductInfo } from '../app/src/utils/request';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#react-app');
class App extends Component {
  state = { product: {}, modalIsOpen: false, variant: null };
  componentDidMount() {
    const { productId, variant } = this.props;
    getProductInfo(productId, ({ product }) => {
      this.setState({ product });
    });
  }
  toggleModal = () => {
    const { modalIsOpen } = this.state;
    const link = window.location.href;
    const {
      query: { variant },
    } = queryString.parseUrl(link);

    if (variant) {
      this.setState({ variant });
    }
    this.setState({ modalIsOpen: !modalIsOpen });
  };
  render() {
    const {
      product: { isShow },
      variant,
    } = this.state;
    const { variant: variantProp, productId } = this.props;
    if (!isShow) return null;
    return (
      <div className="App">
        <button onClick={this.toggleModal} className="price-history">
          Price History
        </button>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.toggleModal} style={customStyles}>
          <Chart id={productId} variant={variant || variantProp} />
        </Modal>
      </div>
    );
  }
}

export default hot(module)(App);
