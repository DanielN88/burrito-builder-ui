import React, { Component } from 'react';
import './App.css';
// import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/orders')
    .then((response) => response.json())
    .then(data => this.setState({orders: data.orders}))
    .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (newOrder) => {
    fetch('http://localhost:3001/api/v1/orders', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newOrder)
    }).then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then((response) => {
      this.setState({
        orders: [...this.state.orders, response]
      })
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.addNewOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
