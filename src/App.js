import SearchInput from './components/SearchInput';
import ResultList from './components/ResultList';
import React from 'react';
import Header from './components/Header';
import SideCard from './components/SideCard';
import Footer from './components/Footer';
// use local storage and useeffect to store what services someone has subscribed too

function App() {

  const [list, setList] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [servicesSelected,setServicesSelected] = React.useState([])
  const [showCard, setShowCard] = React.useState(false)

  const [allChecked,setAllChecked] = React.useState(false)

  React.useEffect(() => {
    if(localStorage.getItem('services')){
      let list = JSON.parse(localStorage.getItem('services'))
      setServicesSelected(list)
    }else(
      localStorage.setItem('services',JSON.stringify(servicesSelected))
    )
  },[servicesSelected,allChecked]);


  const shortListServices = [
  {
      "id": 203,
      "name": "Netflix",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/netflix_100px.png",
  },
  {
      "id": 157,
      "name": "Hulu",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hulu_100px.png",
  },
  {
      "id": 26,
      "name": "Amazon Prime",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/prime_video_100px.png",
  },
  {
      "id": 387,
      "name": "HBO MAX",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hbomax_100px.png",
  },
  {
      "id": 372,
      "name": "Disney+",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/disneyPlus_100px.png",
  },
  {
      "id": 371,
      "name": "AppleTV+",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/appleTvPlus_100px.png",

  },
  {
      "id": 444,
      "name": "Paramount+",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/paramountPlus_100px.png",
  },
  {
      "id": 248,
      "name": "Showtime",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/showtime_100px.png",

  },
  {
      "id": 389,
      "name": "Peacock Premium",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/peacockPremium_100px.png",
  },
  {
      "id": 232,
      "name": "STARZ",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/starz_100px.png",
  },
  {
      "id": 367,
      "name": "Kanopy",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/kanopy_100px.png",
  },
  {
      "id": 368,
      "name": "Youtube Premium",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/youtubePremium_100px.png",
  },
  {
      "id": 80,
      "name": "Crunchyroll Premium",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/crunchyroll_100px.png",
  },
]

function checkAll(){
  selectServices(null,'all')
  setAllChecked(!allChecked)
}

  async function fetchMovies() {
    const KEY = process.env.REACT_APP_WATCHMODE_API_KEY
    let choice = search
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${KEY}&search_value=${choice}&search_type=2`
    let result = await fetch(url)
    let data = await result.json()
    let list = (data.results)
    setList(list)
  }

  function openSelectServices() {
    setShowCard(!showCard)
  }

  function selectServices(id,all){
    if(all){
      console.log(servicesSelected.length)
      if(servicesSelected.length){
        console.log('all, servicessellected')
        localStorage.setItem('services',[])
        setServicesSelected([])
      }else{
        console.log('all,else')
        let services =[]
        shortListServices.forEach(item=>services.push(item['id']))
        localStorage.setItem('services',JSON.stringify(services))
        setServicesSelected(services)
      }
    }else{
      console.log(id)
      let services = servicesSelected
      let index = services.indexOf(id)
      if(index !== -1){
        services.splice(index,1)
      }else{
        services.push(id)
      }
      localStorage.setItem('services',JSON.stringify(services))
      setServicesSelected(services)
    }
  }

  function updateSearch(e) {
    setSearch(e.target.value)
  }

  return (
    <div className='bg-gradient-to-t from-blue-500 to-cyan-500 min-h-screen h-fitflex flex-col shadow-inner'>
        <Header />
        <div className="flex flex-col items-center h-max ">
          <div className="w-full text-center text-white p-5 bg-gradient-to-r from-cyan-500 to-blue-500 ">
            <h2 className="text-2xl ">
              Search for movies or TV shows<br/>Find where they are available to stream or rent
            </h2>
          </div>
          <div id="search" className="flex sm:flex-row items-center sm:justify-center p-5 flex-col bg-gray-800/40 shadow-xl w-full">
            <SearchInput fetchMovies={fetchMovies} updateSearch={updateSearch} search={search} openSelectServices={openSelectServices}  />
          </div>
          <div>
            <SideCard showCard={showCard} 
            openSelectServices={openSelectServices} 
            selectServices={selectServices} 
            servicesSelected={servicesSelected} 
            checkAll = {checkAll}
            allChecked= {allChecked}
            shortListServices = {shortListServices}
            />
          </div>
          <div className='container w-11/12 sm:w-9/12 pt-5 pb-5 min-h-screen shadow-2xl bg-indigo-400/50'>
            <h2 className='text-center text-2xl hover:font-bold mb-3'>Results: {list.length}</h2>
            <ResultList list={list} servicesSelected={servicesSelected} />
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default App;
