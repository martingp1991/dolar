

function Calculadora({
    amount,
    selectedCurrency,
    exchangeType,
    handleAmountChange,
    handleCurrencyChange,
    handleExchangeTypeChange,
    convertCurrency,
    convertedAmount,
    exchangeRates
}) {
    return (
        <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Convertir de ARS a:</h2>
            <div className="flex items-center gap-4">
                <input
                    className="p-2 border border-gray-400 rounded"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <select
                    className="p-2 border border-gray-400 rounded"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                >
                    {exchangeRates && exchangeRates.map((rate) => (
                        <option key={rate.casa.nombre} value={rate.casa.nombre}>{rate.casa.nombre}</option>
                    ))}
                </select>
                <select
                    className="p-2 border border-gray-400 rounded"
                    value={exchangeType}
                    onChange={handleExchangeTypeChange}
                >
                    <option value="venta">Venta</option>
                    <option value="compra">Compra</option>
                </select>
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                    onClick={convertCurrency}
                >
                    Convertir
                </button>
            </div>
            <p className="mt-4 text-2xl font-extrabold">
                Monto convertido: <span className="font-extrabold text-green-800">${convertedAmount}</span>
            </p>
        </div>
    );
}


export default Calculadora;
