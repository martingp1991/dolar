import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function Card({ exchangeRates }) {



    const getRateChangeColor = (rate) => {
        const compra = parseFloat(rate.casa.compra.replace(",", "."));
        const venta = parseFloat(rate.casa.venta.replace(",", "."));

        if (compra > venta) {
            return 'text-red-500';
        } else if (venta > compra) {
            return 'text-green-500';
        }

        return 'text-gray-800';
    };



    return (
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-2">
            {exchangeRates ? (
                exchangeRates.map((rate) => (
                    <div
                        key={rate.casa.nombre}
                        href="#"
                        className="relative block p-4 border-t-4 rounded-sm shadow-xl sm:p-6 lg:p-8"
                    >
                        <div className="flex items-center gap-4 text-gray-800">
                            <h3 className="text-3xl font-extrabold sm:text-2xl">{rate.casa.nombre}</h3>
                            {getRateChangeColor(rate) === 'text-green-500' ? (
                                <FaArrowUp className="text-green-500" />
                            ) : (
                                <FaArrowDown className="text-red-500" />
                            )}
                            <p className={`font-extrabold ${getRateChangeColor(rate)}`}>
                                Variación: <span className='text-green-800'>${rate.casa.variacion}</span>
                            </p>
                        </div>
                        <div className="mt-4 text-2xl">
                            <p className={`font-extrabold ${getRateChangeColor(rate)}`}>
                                Compra: <span className='text-green-800'>${rate.casa.compra}</span>
                            </p>
                            <p className={`font-extrabold ${getRateChangeColor(rate)}`}>
                                Venta: <span className='text-green-800'>${rate.casa.venta}</span>
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='mb-10 text-3xl text-center sm:text-4xl'>Cargando tipos de cambio...</p>
            )}
        </div>
    );
}



export default Card;
