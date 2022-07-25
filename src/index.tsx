import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom'
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import App from './App';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

setInterval(
  () => fetch(process.env.REACT_APP_API as any).then(resp => resp.status !== 200 && window.location.reload()),
  300000
)

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <HashRouter>
      <App />
    </HashRouter>
  </Web3ReactProvider>
);
