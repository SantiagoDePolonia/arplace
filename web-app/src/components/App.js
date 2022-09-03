import AddProductForm from './AddProductForm';
import AnnouncementsListning from './AnnouncementsListning';
import ResponsiveAppBar from './ResponsiveAppBar';

window.addEventListener("arweaveWalletLoaded", () => {
  window.arweaveWallet.connect(["ACCESS_ADDRESS", "ACCESS_PUBLIC_KEY", "SIGN_TRANSACTION"]);
});

function App() {
  const showListening = window.location.pathname === "/";

  return (
    <div className="App">
      <ResponsiveAppBar />
      {showListening ?
          <AnnouncementsListning />
        :
          <AddProductForm />
      }
    </div>
  );
}

export default App;
