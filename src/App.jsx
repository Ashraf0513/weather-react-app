import { useState } from 'react'
import './App.css';
import { Search, Cloud, Thermometer, FileText } from "lucide-react";
import axios from 'axios'

function App() {
  const [city, setcity] = useState("")

  const [cloud,setcloud]=useState("");
  const [temp,settemp]=useState("");
  const [desc,setdesc]=useState("");
  const [error,seterror]=useState("");

  function handlechange(event){
    setcity(event.target.value)
  }

  function handlereport(){

    var weatherdata=axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7cdddf32ceb3afb0d0645c999c98f005`)

    weatherdata.then(function (sucess){
          setcloud(sucess.data.weather[0].main)
          setdesc(sucess.data.weather[0].description)
          settemp(sucess.data.main.temp)
          seterror("")
          
    })

    weatherdata.catch(function(){
      seterror("Enter the Valid City Name Bro")
      setcloud("")
      setdesc("")
      settemp("")
    })
  }



  return (
    <>
      <div className='w-[80%] h-[80vh] shadow-[0_4px_20px_rgba(0,0,0,0.12)] mx-auto mt-20 border rounded-lg border-none bg-[#FAFAEE]'>
        <div className='text-center'>
          <h1 className='pt-14 text-6xl font-serif font-bold text-[#DA7D37] sm:text-4xl'>Weather App</h1>
          <h1 className='text-[#DA7D37] mt-1'>Simple, fast, and accurate weather updates</h1>
        </div>

        <div className='flex justify-center items-center w-[50%] ml-72 mt-8 border rounded-lg max-[640px]:mx-auto max-[1000px]:mx-auto'>
          <Search />
          <input onChange={handlechange} type='text' placeholder='Search the Weather condition of any city' className='w-[50%]  p-2 outline-none' />
        </div>
        
        <div className='text-center mt-8'>
          <button onClick={handlereport} className='bg-[#FCCFB0] p-2 border rounded-lg border-none font-serif font-medium'>Get Report</button>
        </div>
        

        <div className='flex mt-10 justify-around font-serif text-xl text-[#BF9A69] font-bold max-[640px]:text-base'>
          <div>
            <div className='flex items-center gap-1'>
              <h1>Weather</h1>
              <span><Cloud /></span>
            </div>
            <p className='text-blue-500 mt-2 text-2xl max-[640px]:text-xl'>{cloud}</p>
          </div>

          <div>
            <div className='flex items-center gap-1'>
              <h1>Temperature </h1>
              <span><Thermometer /></span>
              <br />
            </div>
            <p className='text-red-700  mt-2 text-2xl max-[640px]:text-xl'>{temp}</p>
          </div>

          <div>
            <div className='flex items-center gap-1'>
              <h1>Describtion </h1>
              <span><FileText /></span>
            </div>
            <p className='text-green-700 mt-2 text-2xl max-[640px]:text-xl'>{desc}</p>
          </div>


        </div>

        <div className='text-center'>
          <p className='text-3xl mt-20 text-red-600'>{error}</p>
        </div>
        
      </div>
    </>
  )
}

export default App
