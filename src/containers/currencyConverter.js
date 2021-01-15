import React, { Component } from "react";
import { getApi } from "../library/helpers/utility";
import { currencyList } from "../config";
class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenctCurrency: "",
      currencyData: [],
    };
  }

  async componentDidMount() {
    var result = await getApi(currencyList);
    // console.log("result", result);
    if (result) {
      var currencyData = result.result;
      if (currencyData && currencyData.length > 0) {
        this.setState({ currencyData: currencyData });
      }
    }
  }
  async handleDropDownChange(name, e) {
    var element = e.target.value;
    this.setState({ [name]: element });
    let restCurrencies = [];
    this.state.currencyData.filter(function (values) {
      if (values.currency_code !== element) restCurrencies.push(values.currency_code);
    });

    let exchangeRates = await getApi("https://api.exchangeratesapi.io/latest?base=" + element + "&symbols=" + restCurrencies.join(","));
    console.log("exchangeRates", exchangeRates);
    if (element !== "") {
      this.setState({ exchangeRates: exchangeRates });
    } else {
      this.setState({ exchangeRates: null });
    }
  }
  getRates() {
    var exchangeRates = this.state.exchangeRates;
    var finalData = [];

    if (exchangeRates) {
      finalData.push(
        <div style={{ marginTop: "10px" }} key="exchange_rates">
          Exchange Rates: <span>date: {exchangeRates.date}</span>
        </div>
      );
      for (const [key, value] of Object.entries(exchangeRates.rates)) {
        var currencyName = this.state.currencyData.filter((data) => {
          return data.currency_code == key;
        });
        finalData.push(
          <div key={key}>
            <p>{currencyName[0].currency_name + " (" + key + ")"}</p>
            <p>{value}</p>
          </div>
        );
      }
    }
    return finalData;
  }
  render() {
    var CurrencyArr = [];
    CurrencyArr.push(
      <option value={""} key="select">
        Select
      </option>
    );
    if (this.state.currencyData) {
      var val = this.state.currencyData;
      for (var i = 0; i < val.length; i++) {
        var loopData = val[i];
        CurrencyArr.push(
          <option value={loopData.currency_code} key={loopData.currency_code}>
            {loopData.currency_name + " (" + loopData.currency_code + ")"}
          </option>
        );
      }
    }
    return (
      <React.Fragment>
        <h1>Currency Converter</h1>
        <form>
          <label>Currency : </label>
          <select placeholder="select" onChange={this.handleDropDownChange.bind(this, "currenctCurrency")}>
            {CurrencyArr}
          </select>
        </form>
        {this.getRates()}
      </React.Fragment>
    );
  }
}
export default CurrencyConverter;
