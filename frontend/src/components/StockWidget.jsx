// // TradingViewWidget.jsx
import React, { useEffect, useRef, memo,useState } from 'react';
import axios from "axios"

function StockWidget({user}) {
  const container = useRef();
  const [stockData,setStockData]=useState([{ ticker: 'AAPL', company: 'Apple' }])

  useEffect(
    () => {
      const getStocks=async()=>{
        try{
          const res=await axios.get(`http://localhost:3001/api/user/getStocks/${user._id}`)
          console.log("widget",res.data)
          setStockData(res.data.val)
          const convertedArray = stockData?.map((item) => {
            return [item.company, `${item.ticker} | 1D`];
          });
          const jsonString = JSON.stringify(convertedArray)
          console.log(convertedArray)
          
          const script = document.createElement("script");
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
          script.type = "text/javascript";
          script.async = true;
          script.innerHTML = `
            {
              "symbols": ${jsonString},
              "chartOnly": false,
              "width": 800,
              "height": 400,
              "locale": "in",
              "colorTheme": "light",
              "autosize": false,
              "showVolume": false,
              "showMA": false,
              "hideDateRanges": false,
              "hideMarketStatus": false,
              "hideSymbolLogo": false,
              "scalePosition": "right",
              "scaleMode": "Normal",
              "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
              "fontSize": "10",
              "noTimeScale": false,
              "valuesTracking": "1",
              "changeMode": "price-and-percent",
              "chartType": "area",
              "maLineColor": "#2962FF",
              "maLineWidth": 1,
              "maLength": 9,
              "lineWidth": 2,
              "lineType": 0,
              "dateRanges": [
                "1d|1",
                "1m|30",
                "3m|60",
                "12m|1D",
                "60m|1W",
                "all|1M"
              ]
            }`;
          container.current.appendChild(script);
        }catch(err){
          console.log(err)
        }
      }
      getStocks()
      
    },
    [user._id]
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(StockWidget);

// import React, { useEffect, useRef, memo, useState } from 'react';
// import axios from 'axios';

// function StockWidget({ user }) {
//   const container = useRef();
//   const [stockData, setStockData] = useState([]);

//   const getStocks = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3001/api/user/getStocks/${user._id}`);
//       console.log('widget', res.data);
//       setStockData(res.data.val);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getStocks();
//   }, [user._id]);

//   useEffect(() => {
//     const convertedArray = stockData?.map((item) => {
//       return [item.company, `${item.ticker} | 1D`];
//     });

//     const jsonString = JSON.stringify(convertedArray);

//     const script = document.createElement('script');
//     script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
//     script.type = 'text/javascript';
//     script.async = true;
//     script.innerHTML = `
//       {
//         "symbols": ${jsonString},
//         "chartOnly": false,
//         "width": 800,
//         "height": 400,
//                   "locale": "in",
//                        "colorTheme": "light",
//                        "autosize": false,
//                        "showVolume": false,
//                        "showMA": false,
//                        "hideDateRanges": false,
//                        "hideMarketStatus": false,
//                        "hideSymbolLogo": false,
//                        "scalePosition": "right",
//                        "scaleMode": "Normal",
//                        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
//                        "fontSize": "10",
//                        "noTimeScale": false,
//                        "valuesTracking": "1",
//                        "changeMode": "price-and-percent",
//                       "chartType": "area",
//                        "maLineColor": "#2962FF",
//                       "maLineWidth": 1,
//                        "maLength": 9,
//                        "lineWidth": 2,
//                        "lineType": 0,
//                        "dateRanges": [
//                          "1d|1",
//                         "1m|30",
//                          "3m|60",
//                          "12m|1D",
//                          "60m|1W",
//                         "all|1M"
//                        ]
//       }`
//     container.current.appendChild(script);

//     // Cleanup function to remove the script on component unmount
//     return () => {
//       container.current.removeChild(script);
//     };
//   }, [stockData]);

//   return (
//     <div className="tradingview-widget-container" ref={container}>
//       <div className="tradingview-widget-container__widget"></div>
//     </div>
//   );
// }

// export default memo(StockWidget);
// ... (other imports)

// function StockWidget({ user }) {
//   const container = useRef();
//   const [stockData, setStockData] = useState([]);

//   const getStocks = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3001/api/user/getStocks/${user._id}`);
//       console.log('widget', res.data);
//       setStockData(res.data.val);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getStocks();
//   }, []);

//   useEffect(() => {
//     const convertedArray = stockData?.map((item) => {
//       return [item.company, `${item.ticker} | 1D`];
//     });

//     const jsonString = JSON.stringify(convertedArray);
//     console.log(convertedArray)

//     const script = document.createElement('script');
//     script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
//     script.type = 'text/javascript';
//     script.async = true;
//     script.innerHTML = `
//       {
//         "symbols":[["Microsoft","MSFT"]],
//         // ... (rest of the configuration)
//         "chartOnly": false,
//         "width": 800,
//         "height": 400,
//                   "locale": "in",
//                        "colorTheme": "light",
//                        "autosize": false,
//                        "showVolume": false,
//                        "showMA": false,
//                        "hideDateRanges": false,
//                        "hideMarketStatus": false,
//                        "hideSymbolLogo": false,
//                        "scalePosition": "right",
//                        "scaleMode": "Normal",
//                        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
//                        "fontSize": "10",
//                        "noTimeScale": false,
//                        "valuesTracking": "1",
//                        "changeMode": "price-and-percent",
//                       "chartType": "area",
//                        "maLineColor": "#2962FF",
//                       "maLineWidth": 1,
//                        "maLength": 9,
//                        "lineWidth": 2,
//                        "lineType": 0,
//                        "dateRanges": [
//                          "1d|1",
//                         "1m|30",
//                          "3m|60",
//                          "12m|1D",
//                          "60m|1W",
//                         "all|1M"
//                        ]
//       }`;

//     // Check if container.current is not null before appending the script
//     if (container.current) {
//       container.current.appendChild(script);
//     }

//     // Cleanup function to remove the script on component unmount
//     return () => {
//       if (container.current && script.parentNode) {
//         container.current.removeChild(script);
//       }
//     };
//   }, [stockData]);

//   return (
//     <div className="tradingview-widget-container" ref={container}>
//       <div className="tradingview-widget-container__widget"></div>
//     </div>
//   );
// }

// export default memo(StockWidget);
