// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget({sym,stockflag,thememode}) {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;


      function createWidget() {
      // let sym = "MSFT"

        if (document.getElementById('tradingview_4f722') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: false,
            symbol: `${sym}`,
            interval: "D",
            timezone: "Etc/UTC",
            theme: thememode==="dark"?"dark":"light",
            style: "1",
            locale: "in",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_4f722"
          });
        }
      }
    },
    [stockflag,thememode,sym]
  );

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%" }}>
      <div id='tradingview_4f722' style={{ height: "calc(100% - 32px)", width: "100%" }} />
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}
