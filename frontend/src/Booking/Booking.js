import React, { useEffect, useState } from "react";
class Booking extends React.Component {

    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        items: [],
    };
    }
    componentDidMount() {
      let initialPlanets = [];
      fetch('http://localhost:8515/schedule')
          .then(response => {
              return response.json();
          }).then(data => {
          initialPlanets = data.results.map((planet) => {
              return planet
          });
          console.log(initialPlanets);
          this.setState({
              planets: initialPlanets,
          });
      });
    }

  
    handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      
      fetch('/api/form-submit-url', {
        method: 'POST',
        body: data,
      });
    }
    
    render() {
      // let classl = this.state.items;
      //   let classList = classl.map((planet) =>
      //     <option key={planet.name}>{planet.name}</option>
      // );

      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="classid">Class ID</label>
          {/* <select>
				    {classList}
			    </select> */}
          {/* <input id="classid" name="classid" type="text" /> */}
          <label htmlFor="quantity">Enter your quantity</label>
          <input id="quantity" name="quantity" type="text" />
  
          <label htmlFor="paymenttype">Payment Type</label>
            <select name="payment">
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
            </select>
          <button>CONFIRM BOOKING </button>
        </form>
      );
    }
  }

  export default Booking;