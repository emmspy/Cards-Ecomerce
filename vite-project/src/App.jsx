import { useState, useEffect } from 'react'


import './App.css'

function App() {
  // creacion de dos estado, para almacenar el texto y la imagen
  const [catFact, setFact] = useState('')
  const [catImageUrl, setCatImageUrl] = useState('')
  const [error, setError] = useState(0)

  // useEffect para obtener la informacion de la API
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://catfact.ninja/facts')
        const data = await response.json()
        console.log({ data })
        const {fact} = data.data[0];
        setFact(fact)
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])

  // verificar si
  useEffect(() => {
    /** IIFE: Funcion inmediata */
    // (() => {

    // })()

    /** opcion 2: */
    async function guardarImagenDeGato() {
      const firstWord = catFact.split(' ', 3).join('');

      try {
        const data = await fetch(`https://catfact.ninja/cat/says/${firstWord}`)
        console.log(data)
        const { url } = data
        setCatImageUrl(url)

      } catch (err) {
        console.log(err)
        setError(err.message)

      }
    }
    if(catFact) {
      guardarImagenDeGato();
    }

  }, [catFact])

  return (
    <>
      <h1>UseState, useEffect example: Random Cat</h1>
      {catFact ? (<p>{catFact}</p>) : null}
      {catImageUrl ? (<img src={catImageUrl} alt="cat" style={{ height: 200, width: 200 }} />) : null}
      {error ? (<p style={{ color: 'red'}}>{error}</p>) : null}
    </>
  )
}

export default App
