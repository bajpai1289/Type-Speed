import './App.css'
import axios from 'axios'
import { useState } from 'react'
const openai_key =  process.env.open_ai_key
function App() {
  
  let [runner, setRunner] = useState('')
  const [timeInterval, setTimeInterval] = useState(20);
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
  const handleSubmit =async(e)=>{
    e.preventDefault()
    const {promptin} = e.target;
    const prompt = promptin.value;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: prompt,
          max_tokens: 200,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openai_key}`,
          },
        }
      );
      const result = await response.data.choices[0].text;
      console.log(result);
      let k = 0;
      const interval = setInterval(() => {
        if (k < result.length) {
          setRunner(runner => runner + result.charAt(k));
          k += 1;
        } else {
          clearInterval(interval);
        }
      }, timeInterval);
    } catch (error) {

      console.error('Error:', error);
    }
  }
  const handleIntervalChange = (event) => {
    setTimeInterval(Number(event.target.value));
  };
  return (
    <>
      <div className="para">
        <h3>Chat GPT Analysis</h3>
        <p>{runner}</p>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name='promptin' />
        </form>
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
        <button onClick={()=>window.location.reload()}>Click To Stop</button>
      </div>
    </>
  )
}

export default App
