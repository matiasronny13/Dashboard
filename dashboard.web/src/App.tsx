import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    interface IWeatherData {
        temperatureC?: string
    }

    const [count, setCount] = useState(0);
    const [data, setData] = useState<IWeatherData[]>([]);

    useEffect(() => {
        void fetch('/api/WeatherForecast')
            .then(res => res.json())
            .then(json => {
                setData(json);
                console.log(json);
            })
    }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
                {
                    data.map((d, index) => <div key={index}>{index}-{d.temperatureC}</div>)
                }
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
