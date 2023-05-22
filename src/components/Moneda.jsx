import { useEffect, useState } from 'react';
import Card from './Card';
import Calculadora from './Calculadora';

function Moneda() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeType, setExchangeType] = useState("venta");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleExchangeTypeChange = (event) => {
    setExchangeType(event.target.value);
  };

  const convertCurrency = () => {
    const selectedRate = exchangeRates.find((rate) => rate.casa.nombre === selectedCurrency);
    if (selectedRate) {
      const rateValue =
        exchangeType === "venta"
          ? parseFloat(selectedRate.casa.venta.replace(",", "."))
          : parseFloat(selectedRate.casa.compra.replace(",", "."));
      const convertedValue = amount / rateValue;
      setConvertedAmount(convertedValue.toFixed(2));
    }
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
        const data = await response.json();
        setExchangeRates(data);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    const updateDateTime = () => {
      const dateTime = new Date().toLocaleString();
      setCurrentDateTime(dateTime);
    };

    fetchExchangeRates();
    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-extrabold text-center text-gray-800 sm:text-5xl">Tipos de Cambio en Argentina</h1>
      <p className='mb-4 text-3xl text-center text-gray-800 sm:text-4xl'>Fecha y Hora Actual: {currentDateTime}</p>
      <br />
      <Calculadora
        amount={amount}
        selectedCurrency={selectedCurrency}
        exchangeType={exchangeType}
        handleAmountChange={handleAmountChange}
        handleCurrencyChange={handleCurrencyChange}
        handleExchangeTypeChange={handleExchangeTypeChange}
        convertCurrency={convertCurrency}
        convertedAmount={convertedAmount}
        exchangeRates={exchangeRates}
      />
      <Card exchangeRates={exchangeRates} />
    </div>
  );
}

export default Moneda;
