import React, {useState, useEffect} from "react";
import './App.css';
import CurrencyFromRow from "./components/CurrencyFromRow";
import CurrencyToRow from "./components/CurrencyToRow";
import {myData} from "./data/data";




function App() {




    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [data, setData] = useState();
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [toAmount, setToAmount] = useState();


    useEffect(() => {
        getResults();
    }, []);

    const getResults = () => {
        fetch("./data/data.json")
            .then(res => res.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                console.log(data);
                console.log(data["eur"]);
                setData(data);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRate(data.rates[firstCurrency]);
                setToAmount(exchangeRate);
            })}

    const handleSubmit = event =>{
        event.preventDefault();
        setExchangeRate(data.rates[toCurrency]);
        setToCurrency(setToCurrency);
        let toAmount = amount * exchangeRate;
        setToAmount(toAmount);
    }

    return (
        <div className="App">
        <h1>Convert</h1>
        <form onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={event => setAmount(event.target.value)}/>
    <CurrencyFromRow
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeCurrency={event => {setFromCurrency(event.target.value); console.log(event.target.value);}}
    />
    <div>=</div>
    <CurrencyToRow
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency={event => setToCurrency(event.target.value)}
    />
    </form>
    <div>{toAmount}</div>
    </div>
);
}

export default App;


