import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {

  const apiKey = "1d25ded7b8093a55b13845cdd5e49ade"
  const [inputCity, setInputCity] = useState("")
  const [data,setData] = useState({})

  const getWeatherDetails = (cityName) =>{
    if(!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+apiKey
    axios.get(apiURL).then((res)=>{
      console.log("response",res.data)

      setData(res.data)
    }).catch((err)=>{
      console.log("err",err)
    })
  }

  const handleChangeInput = (e) =>{
    console.log("value",e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch= () =>{
    getWeatherDetails(inputCity)
  }

  useEffect(()=> {
    getWeatherDetails("delhi")
  }, [])

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" 
          value={inputCity}
            onChange={handleChangeInput}/>
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      <div className="col-md-12 text-centre mt-5">

        <div className="shadow rounded weatherResultBox">
          
          <img className="weatherIcon" 
            src="https://tse1.mm.bing.net/th?id=OIP.dwuAXVyZx5MTZsLoTojyUQHaHa&pid=Api&P=0" alt="Icon Error">
          </img>
        
          <h5 className="weatherCity">
            {data?.name}
          </h5>

          <h6 className="weatherTemp">
            {((data?.main?.temp) - 273.15).toFixed(2)}° C
          </h6>

        </div>
      </div>

    </div>
  );
}

export default App;
