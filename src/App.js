import logo from './logo.svg';
import Example from './components/Example';
import SearchInput from './components/SearchInput';
import ResultList from './components/ResultList';
import React from 'react';
// use local storage and useeffect to store what services someone has subscribed too

function App() {

  const [list,setList] = React.useState([])

async function fetchMovies(choice){
  const KEY = "cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ"
  const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${KEY}&search_value=${choice}&search_type=2`

  let result = await fetch(url)
  let data = await result.json()
  console.log(data)
  let list = (data["results"])
  setList(list)
}

  return (
<div className="bg-slate-500">
  <div className="flex flex-col items-center mt-16">
    <h1 className="text-4xl text-center">
      StreamLook!
    </h1>
    <div className = "m-5 flex-col">
      <SearchInput fetchMovies={fetchMovies} />
    </div>
    <div>
    <ResultList list={list}/>
    </div>
    <Example />
  </div>
</div>
  );
}

export default App;
