import AddProductForm from './AddProductForm';
import './App.css';
import ProductsListning from './ProductsListning';
import ResponsiveAppBar from './ResponsiveAppBar';

window.addEventListener("arweaveWalletLoaded", () => {
  window.arweaveWallet.connect(["ACCESS_ADDRESS", "ACCESS_PUBLIC_KEY"]);
});

function App() {
  const showListening = window.location.pathname === "/";
  return (
    <div className="App">
      <ResponsiveAppBar />
      {showListening ?
          <ProductsListning />
        :
          <AddProductForm />
      }
    </div>
  );
}

export default App;
