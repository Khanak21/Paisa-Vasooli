// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function HeatmapStocks({thememode}) {
  const container = useRef();
  

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "exchanges": [],
          "dataSource": "SPX500",
          "grouping": "sector",
          "blockSize": "market_cap_basic",
          "blockColor": "change",
          "locale": "in",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "width": "70%",
          "height": "40%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container mx-4" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(HeatmapStocks);
