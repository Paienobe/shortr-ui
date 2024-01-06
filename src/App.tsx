import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { copyToClipboard, isValidUrl } from "./utils";
import { shortrInstance } from "./axios";
import { Shortr } from "./types";
import { TbCopy } from "react-icons/tb";
import { ImSpinner } from "react-icons/im";

function App() {
  const [url, setUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [shortr, setShortr] = useState<Shortr | null>(null);

  const shortenUrl = async () => {
    setIsShortening(true);
    setShortr(null);
    try {
      const request = await shortrInstance("/create-link", {
        method: "POST",
        data: { url },
      });
      const response = request.data;
      return response;
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const urlIsValid = isValidUrl(url);
          urlIsValid
            ? shortenUrl().then((result) => {
                setShortr(result);
                setIsShortening(false);
              })
            : toast.error("URL is invalid! Place a valid URL.");
        }}
      >
        <h1>SHORTR</h1>

        <div>
          <input
            type="text"
            placeholder="Paste a long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" disabled={url.length < 1}>
            SHORTEN
          </button>
        </div>

        {!shortr && isShortening && (
          <ImSpinner className="spinner" color="white" size={25} />
        )}

        {shortr && (
          <div>
            <p>{shortr?.short_url}</p>
            <TbCopy
              color="white"
              size={25}
              onClick={() => {
                copyToClipboard(shortr?.short_url);
                toast.success("Copied!");
              }}
            />
          </div>
        )}
      </form>

      <ToastContainer />
    </main>
  );
}

export default App;
