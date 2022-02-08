import React, { useState, useEffect, useCallback } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(true);
      console.log(error)
    }
  }, []);

  useEffect(() => {
    fetchTours(url);
  }, []);

  if (loading) {
    return <main>
      <Loading />
    </main>
  }
  if (!tours.length) {
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button className="btn" onClick={() => fetchTours(url)}>refresh</button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={tours} removeTour={removeTour} />
  </main>
}

export default App
