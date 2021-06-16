import React from 'react';
import { hydrate, render } from "react-dom";
import "./index.css";
import reportWebVitals from './reportWebVitals';
import { SWRConfigProvider } from './providers/SWRConfigProvider';
import { SearchView } from "./views";

const rootElement = document.getElementById("root") as HTMLElement;

const App = () => (
  <React.StrictMode>
    <SWRConfigProvider>
      <SearchView />
    </SWRConfigProvider>
  </React.StrictMode>
);;

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
