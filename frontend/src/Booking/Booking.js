import React, { useEffect, useState } from "react";
class Booking extends React.Component {

    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        items: [],
        value: ''
      }
    }
    componentDidMount() {
      fetch('http://localhost:8314/avail-schedule')
        .then(response => response.json())
        .then(items => {
            this.setState({items})
            console.log(this.state)
        })
        .catch(err => console.log(err))
    }

    handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      
      fetch('http://localhost:8314/home/checkout', {
        method: 'POST',
        body: data,
      });
      console.log(data);
    }
    
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="classid">Choose your class</label>
          <select>
            {this.state.items.map(data => (
              <option value={data.classid}>{data.name}</option>
            ))}
			    </select>
          {/* <input id="classid" name="classid" type="text" /> */}
          <label htmlFor="quantity">Enter your quantity</label>
          <input id="quantity" name="quantity" type="text" />
  
          <label htmlFor="paymenttype">Payment Type</label>
            <select name="payment">
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
            </select>
          <button> CONFIRM BOOKING </button>
        </form>
      );
    }
  }

  export default Booking;
  // ReactDOM.render(<Booking />, document.getElementById('root'));