import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  prevPage = () => {
    if (!this.hasPrevious()) return;

    const pageNumber = this.state.page - 1;
    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    if (!this.hasNext()) return;

    const pageNumber = this.state.page + 1;
    this.loadProducts(pageNumber);
  };

  hasPrevious = () => {
    return this.state.page > 1;
  };

  hasNext = () => {
    return this.state.page < this.state.productInfo.pages;
  };

  render() {
    const { products } = this.state;

    return (
      <div className="product-list">
        <h1>Lista de Produtos</h1>
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button onClick={this.prevPage} disabled={!this.hasPrevious()}>
            Anterior
          </button>
          <button onClick={this.nextPage} disabled={!this.hasNext()}>
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
