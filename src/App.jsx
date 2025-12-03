import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [loading, setloading] = useState(false)
  const [movies, setmovies] = useState([])
  const [query, setquery] = useState("batman")

  const API_KEY = "ea8a1420"

  useEffect(() => {
    const fetchData = async () => {
      setloading(true)
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)

      const data = await res.json()
      console.log(data);

      if (data.Response === "True") {
        setmovies(data.Search)
      } else {
        setmovies([])
      }

      setloading(false)
    }

    fetchData()

  }, [query])


  return (
    <>
      <div className='p-20'>
        <input type="text" placeholder='Search Any Movie' value={query} onChange={(e) => setquery(e.target.value)} className='p-10 w-300' />

        {loading && <h2>Loading...</h2>}
        {!loading && movies.length === 0 && <h2>No movies found!</h2>}

        <div className='flex flex-wrap'>
          {movies.map((movie) => (
            <div key={movie.imbdID} className='w-100 m-10 p-10 border-black border-2 rounded-lg'>
              <img src={movie.Poster} alt={movie.Title} className='' />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
