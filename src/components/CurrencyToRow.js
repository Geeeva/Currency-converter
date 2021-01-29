import React  from "react";
const CurrencyToRow = (props) => {
    const {currencyOptions, selectedCurrency, onChangeCurrency} = props;

    return(
        <div>
            <select value={selectedCurrency} onChange={onChangeCurrency}>{
                currencyOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
export default CurrencyToRow;