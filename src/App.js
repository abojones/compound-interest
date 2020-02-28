import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loan: 0,
      years: 1,
      maxYears: 12,
      payment: 0,
      interest: 10,
    }
  }

  changeHandler = (e) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    this.setState({
      [name]: value
    })
  };

  generateYears = () => {
    let {
      maxYears
    } = this.state;
    let options = [];
    for (let i=1; i<=maxYears; i++) {
      options.push(
        <option key={i} value={i}>{i}</option>
      );
    }
    return options;
  };

  repaymentCalc = (e) => {
    e.preventDefault();
    let {
      years,
      loan,
      interest
    } = this.state;
    let convertedInt = (interest + 100)/100;
    let payment = loan * Math.pow(convertedInt, years);
    payment = payment.toFixed(2);
    this.setState({
      payment
    })
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.repaymentCalc}>
          <div>
            <label htmlFor="interest">Interest (%)
              <input name="interest" onChange={this.changeHandler} value={this.state.interest}/>
            </label>
          </div>
          <div>
            <label htmlFor="loan">Amount
              <input name="loan" onChange={this.changeHandler} value={this.state.loan} type="number"/>
            </label>
          </div>
          <div>
            <label htmlFor="years">Years
              <select onChange={this.changeHandler} name="years">
                {this.generateYears()}
              </select>
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.payment}</p>
      </div>
    );
  }
}

export default App;
