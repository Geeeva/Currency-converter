import React from "react";
const CurrencyFromRow = (props) => {
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
export default CurrencyFromRow;