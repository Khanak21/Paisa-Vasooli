// // TradingViewWidget.jsx
import React, { useEffect, useRef, memo,useState } from 'react';
import axios from "axios"

function StockWidget({user,stockData}) {
  const container = useRef();

  useEffect(
    () => {
      const getStocks=async()=>{
        try{
        
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
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(StockWidget);

