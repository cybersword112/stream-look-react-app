import SearchInput from './components/SearchInput';
import ResultList from './components/ResultList';
import React from 'react';

// use local storage and useeffect to store what services someone has subscribed too

function App() {

  const [list,setList] = React.useState([])
  const [search,setSearch] =React.useState('')

async function fetchMovies(){
  const KEY = process.env.REACT_APP_WATCHMODE_API_KEY
  let choice = search
  const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${KEY}&search_value=${choice}&search_type=2`

  let result = await fetch(url)
  let data = await result.json()
  console.log(data.results)
  let list = (data.results)
  setList(list)
}

function updateSearch(e){
  setSearch(e.target.value)
}

  return (
  <div className="bg-lime-400 min-h-screen mt-0 pt-0">
    <div className="flex flex-col items-center">
      <h1 className="text-4xl text-center mt-16 bg-slate-600/50 p-5 rounded-xl">
        StreamLook!
      </h1>
      <div className = "m-5 flex-col">
        <SearchInput fetchMovies={fetchMovies} updateSearch={updateSearch} search = {search}/>
      </div>
      <div className='container w-9/12'>
        <ResultList list={list}/>
      </div>
    </div>
  </div>
  );
}

export default App;
