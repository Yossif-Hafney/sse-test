import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState("");
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/events");
    let timeoutId: number;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      // If we don't get a message for 3 seconds, assume the connection dropped
      timeoutId = window.setTimeout(() => {
        setStatus("Disconnected (Timeout)");
        setError("Network connection lost. Trying to reconnect...");
        eventSource.close(); // Close the stuck connection
        setRetry((r) => r + 1); // Trigger a reconnection attempt
      }, 3000) as unknown as number;
    };

    eventSource.onopen = () => {
      setStatus("Connected");
      setError(null);
      resetTimeout();
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTime(data.time);
      if (data.prices) {
        setPrices(data.prices);
      }
      resetTimeout(); // Reset the timer every time we get data
    };

    eventSource.onerror = (err) => {
      setStatus("Disconnected (Attempting to reconnect...)");
      setError(
        "Failed to connect to the SSE server. Make sure the backend is running.",
      );
      console.error("SSE Error:", err);
      clearTimeout(timeoutId);
    };

    return () => {
      eventSource.close();
      clearTimeout(timeoutId);
    };
  }, [retry]);
  return (
    <>
      <div>
        <h1>Server-Sent Events Demo</h1>
        <p>
          <strong>Status: </strong>
          <span style={{ color: status === "Connected" ? "green" : "orange" }}>
            {status}
          </span>
        </p>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        <p>Current Time: {time}</p>
        <h2>Live Prices</h2>
        <ul>
          {Object.entries(prices).map(([coin, price]) => (
            <li key={coin}>
              {coin}: ${price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;
