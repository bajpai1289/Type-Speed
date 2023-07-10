import './App.css'
import { useState } from 'react'
function App() {
  let [runner, setRunner] = useState('')
  const [timeInterval, setTimeInterval] = useState(20);
  const para = "The sentiment of these statements is mixed. Some express frustration and negative experiences with AT&T, particularly regarding issues with technology and privacy. Others express support for Randall Stephenson's decision to resign from the PGA Tour policy board due to concerns about the tour's deal with Saudi backers. There is also mention of controversy surrounding AT&T's involvement with Liv Golf and criticism of the internet's treatment of an AT&T woman."
  const handleRunner = () => {
    let k = 0;
    const interval = setInterval(() => {
      if (k < para.length) {
        setRunner(runner => runner + para.charAt(k));
        k += 1;
      } else {
        clearInterval(interval);
      }
    }, timeInterval);
  };
  const handleIntervalChange = (event) => {
    setTimeInterval(Number(event.target.value));
  };
  return (
    <>
      <div className="para">
        <h3>Chat GPT Analysis</h3>
        <p>{runner}</p>
        <div>
          <input
            type="number"
            value={timeInterval}
            onChange={handleIntervalChange}
            min="1"
            step="1"
          />
          <label htmlFor="timeInterval">Time Interval (ms)</label>
        </div>
        <button onClick={handleRunner}>Click To Run</button>
      </div>
    </>
  )
}

export default App
