import React, {useState, useEffect} from "react"
import './App.css'
import SelectRow from "./components/SelectRow"
function App() {
    const [data, setData] = useState()
    const [selectedFromCurrencyStream, setSelectedFromCurrencyStream] = useState()
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [toAmount, setToAmount] = useState()

    useEffect(() => {
        getResults()
    }, [])

    const getResults = () => {
        fetch('./data/data.json')
            .then(res => res.json())
            .then(data => {
                const firstCurrency = Object.keys(data[0].rates)[1]
                const currencyOptions = data.map(
                    currency => (
                        currency.base
                    )
                )
                setCurrencyOptions(currencyOptions)
                setData(data);
                setSelectedFromCurrencyStream(data[0])
                setFromCurrency(data[0].base)
                setToCurrency(Object.keys(data[0].rates)[1])
                setExchangeRate(data[0].rates[firstCurrency])
                const initialAmount = Math.round(1 * data[0].rates[firstCurrency] * 100) / 100
                setToAmount(initialAmount)
            })}


    const handleCurrencyBase = event =>{
        let selectedFromCurrencyStream = data.filter(
            currency => currency.base === event
        )

        setSelectedFromCurrencyStream(selectedFromCurrencyStream[0]);
        let selectedExchangeRate
        Object.entries(selectedFromCurrencyStream[0].rates).forEach(
            currency => {
                if(currency[0] === toCurrency){
                    selectedExchangeRate = currency[1]
                }
            }
        )

        setExchangeRate(selectedExchangeRate);
        //let calculatedAmount = amount * selectedExchangeRate;
        //setToAmount(calculatedAmount);
    }

    const handleToCurrency = event =>{
       let selectedExchangeRate;
       Object.entries(selectedFromCurrencyStream.rates).forEach(
            currency => {
                if(currency[0] === event){
                    selectedExchangeRate = currency[1]
                }
            }
        )
        setExchangeRate(selectedExchangeRate);
        //let calculatedAmount = amount * selectedExchangeRate;
        //setToAmount(calculatedAmount)
    }

    const handleSubmit = event =>{
        event.preventDefault()
        let calculatedAmount = Math.round(amount * exchangeRate * 100) / 100
        setToAmount(calculatedAmount)
    }

    return (
        <div className="App">
            <div className="container converter-wrapper">
                <form onSubmit={handleSubmit} className="row">
                    <div className="offset-md-2 col-sm-8 title-wrapper"><h4>Currency converter</h4></div>
                    <div className="offset-md-2 col-md-8 input-wrapper">
                        <div>Amount</div>
                        <input type="number" value={amount} onChange={event => setAmount(event.target.value)} min="1"/>
                    </div>
                    <div className="offset-md-2 col-md-5 col-sm-12 select-wrapper">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div>from</div>
                                <div>
                                    <SelectRow
                                        currencyOptions={currencyOptions}
                                        selectedCurrency={fromCurrency}
                                        onChangeCurrency={event => {setFromCurrency(event.target.value); handleCurrencyBase(event.target.value);}}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div>to</div>
                                <div>
                                    <SelectRow
                                        currencyOptions={currencyOptions}
                                        selectedCurrency={toCurrency}
                                        onChangeCurrency={event => {setToCurrency(event.target.value); handleToCurrency(event.target.value);}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 button-wrapper">
                        <button type="submit">Convert</button>
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="offset-md-2 col-md-8 calculated-amount">Conversion amounts {toAmount}</div>
                </form>
            </div>
        </div>
);}

export default App;


