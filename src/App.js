import React, {useState, useEffect} from "react";
import './App.css';
import CurrencyFromRow from "./components/CurrencyFromRow";
import CurrencyToRow from "./components/CurrencyToRow";
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
        fetch('./data.json'
   )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const firstCurrency = Object.keys(data[0].rates)[0];
                const currencyOptions = data.map(
                    currency => (
                        currency.base
                    )
                )
                setCurrencyOptions(currencyOptions);
                setData(data);
                setFromCurrency(data[0].base);
                setToCurrency(firstCurrency);
                setExchangeRate(data[0].rates[firstCurrency]);
                setToAmount(exchangeRate);
            })}

    const handleSubmit = event =>{
        event.preventDefault();
        /*setExchangeRate(data[0].rates[toCurrency]);
        console.log(data[0].rates[toCurrency]);
        setToCurrency(setToCurrency);
        let toAmount = amount * exchangeRate;
        setToAmount(toAmount);*/
        data.map(currency =>(
            currency.filter()
        ))
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


