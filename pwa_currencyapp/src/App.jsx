import { Note, Card } from "./components/";
import "./App.css";
import UseInfo from "./hooks/useinfo";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import codeToCountry from "./data/CoutryCode.js";
import { setCA } from "./features/currency.js";
import { setFrom, setTo } from "./features/currency.js";

function App() {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.currency.amount);
  const base = useSelector((state) => state.currency.base);
  const target = useSelector((state) => state.currency.target);
  const currencyInfo = UseInfo(base);
  const option = Object.keys(codeToCountry);

  const swap = () => {
    let temp = base;
    dispatch(setFrom(target));
    dispatch(setTo(temp));
  };

  const convert = () => {
    if (currencyInfo[target]) {
      let rate = currencyInfo[target];
      let result = amount * rate;
      dispatch(setCA(result));
    }
  };

  //----------------- Hooks-------------------------- //
  useEffect(convert, [amount, currencyInfo, target, base]);

  // Add this to one of your components
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPrompt(e);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setInstallPrompt(e);
      });
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      // Show the install prompt
      installPrompt.prompt();
      // Wait for the user to respond to the prompt
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setInstallPrompt(null);
      });
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync
          .register("sync-exchange-data")
          .then(() => {
            console.log("✅ sync-exchange-data registered!");
          })
          .catch((err) => {
            console.error("❌ Failed to register sync:", err);
          });
      });
    } else {
      console.warn("⚠️ Background Sync not supported.");
    }
  }, []);

  return (
    <>
      {installPrompt && <button onClick={handleInstallClick}>Install App</button>}
      <Note />
      <div className="Box">
        <Card name="From" options={option}></Card>
        <button onClick={swap}>
          <i className="fa-solid fa-right-left"></i>
        </button>
        <Card name="To" options={option} disabledin={true}></Card>
      </div>
    </>
  );
}

export default App;
