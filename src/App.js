import Example from './components/Example';
import SearchInput from './components/SearchInput';
import ResultList from './components/ResultList';
import ServiceResultList from './components/ServiceResultList';
import React from 'react';
// use local storage and useeffect to store what services someone has subscribed too

function App() {

  const [list,setList] = React.useState([])
  const [search,setSearch] =React.useState('')
  const [services,setServices] = React.useState([])
  const [movieId,setMovieId] = React.useState('')

async function fetchMovies(){
  const KEY = "cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ"
  let choice = search
  const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${KEY}&search_value=${choice}&search_type=2`

  let result = await fetch(url)
  let data = await result.json()
  console.log(data.results)
  let list = (data.results)
  setList(list)
}

// React.useEffect(()=>{
//   async function fetchMovies(){
//     const KEY = "cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ"
//     let choice = search
//     const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${KEY}&search_value=${choice}&search_type=2`
  
//     let result = await fetch(url)
//     let data = await result.json()
//     console.log(data.results)
//     let list = (data.results)
//     setList((previousState)=>{
//       return [...list]
//     })
//   }
//   fetchMovies()

// },[])


async function fetchServices(e,id){
  e.preventDefault()
  const KEY = "cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ"
  const title_id = id;
  console.log(title_id)
  const sourceurl = `https://api.watchmode.com/v1/title/${title_id}/sources/?apiKey=${KEY}`
  let result = await fetch(sourceurl)
  let services = await result.json()
  services.map((service,index)=>{
    service.id = index
  })
  console.log(services)
  setServices(services)
}

function updateId(e,id){
  setMovieId(id)
}

function updateSearch(e){
  setSearch(e.target.value)
}

  return (
<div className="bg-slate-500">
  <div className="flex flex-col items-center mt-16">
    <h1 className="text-4xl text-center">
      StreamLook!
    </h1>
    <div className = "m-5 flex-col">
      <SearchInput fetchMovies={fetchMovies} updateSearch={updateSearch} search = {search}/>
    </div>
    <div className='container w-9/12'>
      <ResultList list={list} updateId={updateId} fetchServices={fetchServices}/>
    </div>
    <div>
      <ServiceResultList services={services} />
    </div>
    <Example />
  </div>
</div>
  );
}

export default App;
