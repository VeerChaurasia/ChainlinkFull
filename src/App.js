// import React, { useState } from 'react';

// function App() {
//     const [symbol, setSymbol] = useState('');
//     const [stockData, setStockData] = useState(null);
//     const [error, setError] = useState('');

//     const fetchStockData = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/stock/${symbol}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setStockData(data);
//             setError('');
//         } catch (err) {
//             setError('Error fetching data');
//             setStockData(null);
//         }
//     };

//     return (
//         <div>
//             <h1>Stock Data</h1>
//             <input
//                 type="text"
//                 value={symbol}
//                 onChange={(e) => setSymbol(e.target.value)}
//                 placeholder="Enter stock symbol"
//             />
//             <button onClick={fetchStockData}>Fetch Data</button>
//             {error && <p>{error}</p>}
//             {stockData && (
//                 <div>
//                     <h2>Stock Information for {symbol.toUpperCase()}</h2>
//                     {stockData['Time Series (Daily)'] && (
//                         <ul>
//                             {Object.keys(stockData['Time Series (Daily)']).map((date) => (
//                                 <li key={date}>
//                                     {date}: Open: {stockData['Time Series (Daily)'][date]['1. open']}, 
//                                     High: {stockData['Time Series (Daily)'][date]['2. high']}, 
//                                     Low: {stockData['Time Series (Daily)'][date]['3. low']}, 
//                                     Close: {stockData['Time Series (Daily)'][date]['4. close']}
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';

function App() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const fetchStockData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/stock/${symbol}`);
      const data = await response.json();
      if (response.ok) {
        setStockData(data);
        setError('');
      } else {
        setError(data);
        setStockData(null);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Error fetching stock data');
      setStockData(null);
    }
  };

  return (
    <div className="App">
      <h1>Stock Data</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <button onClick={fetchStockData}>Fetch Data</button>
      {error && <p>{error}</p>}
      {stockData && (
        <div>
          <h2>Stock Information for {stockData.symbol.toUpperCase()}</h2>
          <p>Price: {stockData.price}</p>
          <p>Time: {stockData.time}</p>
        </div>
      )}
    </div>
  );
}

export default App;
