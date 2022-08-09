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
  },[allChecked]);


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
  // let ids = []
  // for(let i =0;i<shortListServices.length;i++){
  //         ids.push(shortListServices[i]['id'])
  // }
  // setAllChecked(!allChecked)
  // localStorage.setItem('allChecked',JSON.stringify(!allChecked))

  // let equality = true
  // for(let i =0;i<ids.length;i++){
  //   if(ids[i] !== servicesSelected[i]){
  //     equality= false
  //     break
  //   }
  // }

  // if(equality){
  //   console.log('all')
  //   selectServices([])
  // }else{
  //   selectServices(ids)
  // }
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
    <div className='bg-slate-500 min-h-screen h-fitflex flex-col'>
        <Header />
        <div className="bg-blue-400/70 flex flex-col items-center shadow-inner h-max">
          <div className="w-full text-center bg-black text-white p-5">
            <h2 className="text-2xl">
              Search for movies or TV shows<br/>Find where they are available to stream or rent
            </h2>
          </div>
          <div id="search" className="flex sm:flex-row items-center sm:justify-center p-5 flex-col bg-slate-500 w-full">
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
          <div className='container w-9/12 pt-5'>
            <ResultList list={list} servicesSelected={servicesSelected}/>
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default App;

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

let sourceIds = [
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

let sourcesUSandSUB=[
  {
      "id": 203,
      "name": "Netflix",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/netflix_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/netflix/id363590051",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en",
      "android_scheme": "nflx",
      "ios_scheme": "nflx",
      "regions": [
          "US",
          "CA",
          "GB",
          "AU",
          "BR",
          "AR",
          "BE",
          "BG",
          "CH",
          "CL",
          "CO",
          "CZ",
          "DE",
          "DK",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GR",
          "HK",
          "HR",
          "HU",
          "ID",
          "IE",
          "IL",
          "IN",
          "IS",
          "JP",
          "KR",
          "LT",
          "MX",
          "MY",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "RO",
          "RS",
          "RU",
          "SE",
          "SG",
          "TH",
          "TR",
          "UA",
          "VN",
          "ZA",
          "ar",
          "ch",
          "cl",
          "co",
          "ec",
          "ee",
          "fr",
          "gr",
          "id",
          "jp",
          "kr",
          "lt",
          "mx",
          "my",
          "pe",
          "ph",
          "sg",
          "th",
          "tr",
          "vn",
          "za"
      ]
  },
  {
      "id": 157,
      "name": "Hulu",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hulu_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/hulu-plus/id376510438",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hulu.plus",
      "android_scheme": "hulu",
      "ios_scheme": "hulu",
      "regions": [
          "US"
      ]
  },
  {
      "id": 26,
      "name": "Amazon Prime",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/prime_video_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id545519333",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "AR",
          "CH",
          "CL",
          "CO",
          "EC",
          "FR",
          "MX",
          "PA",
          "PE",
          "US",
          "IE",
          "GB",
          "ES",
          "DK",
          "FI",
          "SE",
          "JP",
          "IN",
          "NZ",
          "PH",
          "ZA",
          "BE",
          "DE",
          "HK",
          "ID",
          "MY",
          "PT",
          "TH",
          "VN",
          "RO",
          "IL",
          "KR",
          "RU",
          "IS",
          "NO",
          "PL",
          "NL",
          "SG",
          "HU",
          "BG",
          "CZ",
          "EE",
          "GR",
          "HR",
          "LT",
          "RS",
          "TR",
          "UA",
          "BR",
          "CA",
          "AU",
          "be",
          "dk",
          "fi",
          "in",
          "nl",
          "no",
          "se"
      ]
  },
  {
      "id": 387,
      "name": "HBO MAX",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hbomax_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "hbomax",
      "ios_scheme": "hbomax",
      "regions": [
          "US",
          "AR",
          "CL",
          "CO",
          "EC",
          "MX",
          "PE",
          "BG",
          "CZ",
          "DK",
          "ES",
          "FI",
          "HR",
          "HU",
          "NL",
          "NO",
          "PL",
          "PT",
          "RO",
          "RS",
          "SE",
          "BR"
      ]
  },
  {
      "id": 372,
      "name": "Disney+",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/disneyPlus_100px.png",
      "ios_appstore_url": "https://apps.apple.com/app/disney/id1446075923",
      "android_playstore_url": null,
      "android_scheme": "disneyplus",
      "ios_scheme": "disneyplus",
      "regions": [
          "FR",
          "US",
          "CA",
          "GB",
          "AU",
          "BR",
          "AR",
          "BE",
          "CH",
          "CL",
          "CO",
          "DE",
          "DK",
          "ES",
          "FI",
          "MX",
          "NL",
          "NO",
          "NZ",
          "PT",
          "SE",
          "SG",
          "HK",
          "EC",
          "IS",
          "PA",
          "PE",
          "IE",
          "JP",
          "KR"
      ]
  },
  {
      "id": 371,
      "name": "AppleTV+",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/appleTvPlus_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA",
          "GB",
          "AU",
          "BR",
          "AR",
          "BE",
          "BG",
          "CH",
          "CL",
          "CO",
          "CZ",
          "DE",
          "DK",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GR",
          "HK",
          "HU",
          "ID",
          "IE",
          "IL",
          "IN",
          "JP",
          "KR",
          "LT",
          "MX",
          "MY",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "RU",
          "SE",
          "SG",
          "TH",
          "UA",
          "VN",
          "ZA"
      ]
  },
  {
      "id": 444,
      "name": "Paramount+",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/paramountPlus_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "pplus",
      "ios_scheme": "cbs",
      "regions": [
          "US",
          "AU",
          "BR",
          "CA"
      ]
  },
  {
      "id": 248,
      "name": "Showtime",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/showtime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/showtime/id996246479",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.showtime.standalone",
      "android_scheme": "intent",
      "ios_scheme": "showtime",
      "regions": [
          "US"
      ]
  },
  {
      "id": 389,
      "name": "Peacock Premium",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/peacockPremium_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "peacock",
      "ios_scheme": "peacock",
      "regions": [
          "US"
      ]
  },
  {
      "id": 232,
      "name": "STARZ",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/starz_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/starz-play/id550221096",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.bydeluxe.d3.android.program.starz",
      "android_scheme": "starz",
      "ios_scheme": "starz",
      "regions": [
          "US"
      ]
  },
  {
      "id": 367,
      "name": "Kanopy",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/kanopy_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/kanopy/id1205614510",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.kanopy",
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "AU"
      ]
  },
  {
      "id": 159,
      "name": "Hulu with Showtime",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hulu_showtime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/hulu-plus/id376510438",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hulu.plus",
      "android_scheme": "hulu",
      "ios_scheme": "hulu",
      "regions": [
          "US"
      ]
  },
  {
      "id": 368,
      "name": "Youtube Premium",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/youtubePremium_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/youtube/id544007664",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.google.android.youtube",
      "android_scheme": null,
      "ios_scheme": "youtube",
      "regions": [
          "US"
      ]
  },
  {
      "id": 80,
      "name": "Crunchyroll Premium",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/crunchyroll_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/crunchyroll-watch-anime-drama/id329913454",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.crunchyroll.crunchyroid",
      "android_scheme": "crunchyroll",
      "ios_scheme": "crunchyroll",
      "regions": [
          "US",
          "CA",
          "GB",
          "AU",
          "BR"
      ]
  },
  {
      "id": 366,
      "name": "The Criterion Channel",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/criterion_100px.png",
      "ios_appstore_url": "http://apps.apple.com/app/the-criterion-channel/id1454275199",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.criterionchannel",
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA"
      ]
  },
  {
      "id": 125,
      "name": "Fandor",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/fandor_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/fandor-movies-watch-only-great/id474930762",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.fandor.android",
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA"
      ]
  },
  {
      "id": 252,
      "name": "Shudder",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/shudder_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/shudder-screams-on-demand/id919790315",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.dramafever.shudder",
      "android_scheme": null,
      "ios_scheme": "onemainstream.A7TIV9SL",
      "regions": [
          "US",
          "CA",
          "GB",
          "AU"
      ]
  },
  {
      "id": 318,
      "name": "WWE Network",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/wwe_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/wwe/id551798799",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.wwe.universe",
      "android_scheme": "wwe",
      "ios_scheme": "wwe",
      "regions": [
          "US"
      ]
  },
  {
      "id": 293,
      "name": "Tribeca Shortlist",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/tribeca_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/tribeca-shortlist/id993038295",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.tribeca.shortlist",
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US"
      ]
  },
  {
      "id": 18,
      "name": "Acorn TV (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/acorn_tv_prime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv-uk",
      "regions": [
          "GB",
          "US",
          "CA"
      ]
  },
  {
      "id": 27,
      "name": "Ameba (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/ameba_prime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 357,
      "name": "Boomerang (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/boomerang_prime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 68,
      "name": "Cinemax (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/cinemax_prime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 73,
      "name": "Comedy Central Stand-Up Plus (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/cc_now_prime_video_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 81,
      "name": "Curiosity Stream (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/curiosity_stream_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "GB",
          "US"
      ]
  },
  {
      "id": 84,
      "name": "Daring Docs (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/daring_docs_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 101,
      "name": "Docurama (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/docurama_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 102,
      "name": "Dove Channel (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/dove_channel_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 103,
      "name": "Dox (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/103_autogenerated.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 126,
      "name": "Fandor (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/fandor_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US",
          "GB"
      ]
  },
  {
      "id": 129,
      "name": "Filmbox Live (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/filmbox_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 138,
      "name": "Gaia (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/gaia_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 358,
      "name": "Hallmark Movies Now (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hallmark_movies_now_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 144,
      "name": "HBO (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hbo_prime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 148,
      "name": "HISTORY Vault (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/history_vault_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 163,
      "name": "IndieFlix Shorts (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/indie_flx_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 172,
      "name": "Lifetime Movie Club (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/lifetime_movie_club_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 216,
      "name": "PBS KIDS (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/pbs_kids_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 227,
      "name": "Qello Concerts (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/quello_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 238,
      "name": "Screambox (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/screambox_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 247,
      "name": "Shout! Factory TV (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/shout_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US",
          "GB"
      ]
  },
  {
      "id": 249,
      "name": "Showtime (via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/showtime_amazon_prime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 253,
      "name": "Shudder (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/shudder_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "US",
          "CA",
          "GB"
      ]
  },
  {
      "id": 256,
      "name": "Smithsonian Earth (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/smithsonian_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 234,
      "name": "STARZ (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/starz_amazon_prime_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US",
          "GB"
      ]
  },
  {
      "id": 269,
      "name": "SundanceNow Doc Club (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/sundance_now_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "GB",
          "CA",
          "US"
      ]
  },
  {
      "id": 294,
      "name": "Tribeca Shortlist (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/tribeca_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 295,
      "name": "True Crime Files by ID (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/true_crime_files_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 301,
      "name": "Urban Movie Channel (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/umc_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 442,
      "name": "DirecTV On Demand",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/442_autogenerated.png",
      "ios_appstore_url": "https://apps.apple.com/app/directv/id307386350",
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": "directv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 443,
      "name": "Spectrum On Demand",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/443_autogenerated.png",
      "ios_appstore_url": "https://apps.apple.com/app/spectrum-tv/id420455839",
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US"
      ]
  },
  {
      "id": 6,
      "name": "60 Minutes All Access",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/60minutes_all_access_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US"
      ]
  },
  {
      "id": 17,
      "name": "Acorn TV",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/acorn_tv_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/acorn-tv/id896014310",
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": "acorn",
      "regions": [
          "GB",
          "AU",
          "US",
          "CA"
      ]
  },
  {
      "id": 378,
      "name": "AMC Premiere",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/amcPremiere_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amc-stream-tv-shows-movies/id1025120568",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.amctve.amcfullepisodes",
      "android_scheme": "amcmobileapp",
      "ios_scheme": "amcmobileapp",
      "regions": [
          "US"
      ]
  },
  {
      "id": 382,
      "name": "BET+",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/betplus_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/id1456618978",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.viacom.betplus",
      "android_scheme": "betplus",
      "ios_scheme": "betplus",
      "regions": [
          "US"
      ]
  },
  {
      "id": 374,
      "name": "BET+ (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/betplus_primeVideo_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 376,
      "name": "Britbox",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/britbox_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "GB",
          "US",
          "AU",
          "CA"
      ]
  },
  {
      "id": 377,
      "name": "Britbox (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/britbox_primeVideo_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "intent",
      "ios_scheme": "aiv-uk",
      "regions": [
          "GB",
          "US",
          "CA"
      ]
  },
  {
      "id": 384,
      "name": "Cinemax (Via Hulu)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/384_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "hulu",
      "ios_scheme": "hulu",
      "regions": [
          "US"
      ]
  },
  {
      "id": 421,
      "name": "Curiosity Stream",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/421_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": "curiositystream",
      "regions": [
          "US",
          "CA",
          "GB",
          "AU",
          "BR",
          "AR",
          "BE",
          "BG",
          "CH",
          "CL",
          "CO",
          "CZ",
          "DE",
          "DK",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GR",
          "HK",
          "HR",
          "HU",
          "ID",
          "IE",
          "IL",
          "IN",
          "IS",
          "JP",
          "KR",
          "LT",
          "MX",
          "MY",
          "NL",
          "NO",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "RO",
          "RS",
          "RU",
          "SE",
          "SG",
          "TH",
          "TR",
          "UA",
          "VN",
          "ZA",
          "NZ"
      ]
  },
  {
      "id": 405,
      "name": "Darkmatter TV",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/405_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA"
      ]
  },
  {
      "id": 445,
      "name": "Discovery+",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/445_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US"
      ]
  },
  {
      "id": 375,
      "name": "Epix (Via Amazon Prime)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/epixPrimeVideo_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": "aiv",
      "regions": [
          "US"
      ]
  },
  {
      "id": 379,
      "name": "Epix Now",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/epixNow_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/epix-now/id1387514950",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.epix.epix.now",
      "android_scheme": "epixnow",
      "ios_scheme": "epixnow",
      "regions": [
          "US"
      ]
  },
  {
      "id": 422,
      "name": "Flix Premiere",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/422_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "GB",
          "US"
      ]
  },
  {
      "id": 399,
      "name": "FlixFling",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/399_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA"
      ]
  },
  {
      "id": 373,
      "name": "fuboTV",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/fuboTV_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US"
      ]
  },
  {
      "id": 381,
      "name": "Funimation",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/funimation_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/funimation/id1075603018",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.Funimation.FunimationNow",
      "android_scheme": null,
      "ios_scheme": "funi",
      "regions": [
          "AU",
          "US",
          "GB",
          "CA",
          "BR"
      ]
  },
  {
      "id": 401,
      "name": "GuideDoc",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/401_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA",
          "GB",
          "AU"
      ]
  },
  {
      "id": 152,
      "name": "Hallmark Movies Now",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hallmark_movies_now_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/feeln-movies-together/id472567577",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.feeln.android",
      "android_scheme": "hmnow",
      "ios_scheme": "com.spiritclips.sc",
      "regions": [
          "US"
      ]
  },
  {
      "id": 385,
      "name": "HBO (Via Hulu)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/385_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "hulu",
      "ios_scheme": "hulu",
      "regions": [
          "US"
      ]
  },
  {
      "id": 420,
      "name": "HiDive",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/420_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA",
          "GB",
          "AU"
      ]
  },
  {
      "id": 390,
      "name": "Hoopla",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/390_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US",
          "CA"
      ]
  },
  {
      "id": 162,
      "name": "IndieFlix",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/indie_flx_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/id919741804",
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US"
      ]
  },
  {
      "id": 181,
      "name": "MUBI",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/mubi_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/mubi/id626148774",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mubi",
      "android_scheme": null,
      "ios_scheme": "mubi",
      "regions": [
          "CA",
          "MX",
          "GB",
          "BR",
          "AR",
          "BE",
          "BG",
          "CL",
          "CO",
          "DE",
          "EC",
          "ES",
          "FR",
          "HR",
          "HU",
          "ID",
          "IE",
          "IN",
          "JP",
          "KR",
          "MY",
          "NL",
          "PA",
          "PE",
          "PH",
          "RO",
          "RS",
          "SG",
          "TH",
          "TR",
          "VN",
          "ZA",
          "AU",
          "CH",
          "DK",
          "FI",
          "HK",
          "IL",
          "NO",
          "NZ",
          "SE",
          "EE",
          "GR",
          "LT",
          "PL",
          "RU",
          "UA",
          "US",
          "PT"
      ]
  },
  {
      "id": 386,
      "name": "STARZ (Via Hulu)",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/386_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "hulu",
      "ios_scheme": "hulu",
      "regions": [
          "US"
      ]
  },
  {
      "id": 433,
      "name": "Sun Nxt",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/433_autogenerated.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "CA",
          "AU",
          "US",
          "GB",
          "BR"
      ]
  },
  {
      "id": 268,
      "name": "SundanceNow Doc Club",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/sundance_now_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/sundancenow-doc-club-documentaries/id879902807",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.dramafever.docclub",
      "android_scheme": null,
      "ios_scheme": null,
      "regions": [
          "US"
      ]
  }
]

let regions = [
  {
    "country": "US",
    "name": "USA",
    "flag": "https://cdn.watchmode.com/misc_images/icons/usFlag2.png",
    "data_tier": 1,
    "plan_enabled": true
  },
  {
    "country": "CA",
    "name": "Canada",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagCA.png",
    "data_tier": 1,
    "plan_enabled": false
  },
  {
    "country": "GB",
    "name": "Great Britain",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagGB.png",
    "data_tier": 1,
    "plan_enabled": false
  },
  {
    "country": "AU",
    "name": "Australia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagAU.png",
    "data_tier": 1,
    "plan_enabled": false
  },
  {
    "country": "AR",
    "name": "Argentina",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagAR.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "BE",
    "name": "Belgium",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagBE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "BG",
    "name": "Bulgaria",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagBG.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "BR",
    "name": "Brazil",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagBR.png",
    "data_tier": 1,
    "plan_enabled": false
  },
  {
    "country": "CL",
    "name": "Chile",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagCL.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "CO",
    "name": "Colombia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagCO.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "HR",
    "name": "Croatia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagHR.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "CZ",
    "name": "Czech Republic",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagCZ.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "DK",
    "name": "Denmark",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagDK.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "EC",
    "name": "Ecuador",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagEC.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "EE",
    "name": "Estonia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagEE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "FI",
    "name": "Finland",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagFI.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "FR",
    "name": "France",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagFR.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "DE",
    "name": "Germany",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagDE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "GR",
    "name": "Greece",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagGR.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "HK",
    "name": "Hong Kong",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagHK.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "HU",
    "name": "Hungary",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagHU.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "IS",
    "name": "Iceland",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagIS.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "IN",
    "name": "India",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagIN.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "ID",
    "name": "Indonesia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagID.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "IE",
    "name": "Ireland",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagIE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "IL",
    "name": "Israel",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagIL.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "JP",
    "name": "Japan",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagJP.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "LT",
    "name": "Lithuania",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagLT.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "MY",
    "name": "Malaysia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagMY.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "MX",
    "name": "Mexico",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagMX.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "NL",
    "name": "Netherlands",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagNL.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "NZ",
    "name": "New Zealand",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagNZ.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "NO",
    "name": "Norway",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagNO.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "PA",
    "name": "Panama",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagPA.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "PE",
    "name": "Peru",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagPE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "PH",
    "name": "Philippines",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagPE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "PL",
    "name": "Poland",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagPE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "PT",
    "name": "Portugal",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagPT.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "RO",
    "name": "Romania",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagRO.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "RU",
    "name": "Russia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagRU.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "RS",
    "name": "Serbia",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagRS.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "SG",
    "name": "Singapore",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagSG.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "ZA",
    "name": "South Africa",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagZA.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "KR",
    "name": "South Korea",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagKR.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "ES",
    "name": "Spain",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagES.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "SE",
    "name": "Sweden",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagSE.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "CH",
    "name": "Switzerland",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagCH.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "TH",
    "name": "Thailand",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagTH.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "TR",
    "name": "Turkey",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagTR.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "UA",
    "name": "Ukraine",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagMX.png",
    "data_tier": 2,
    "plan_enabled": false
  },
  {
    "country": "VN",
    "name": "Vietnam",
    "flag": "https://cdn.watchmode.com/misc_images/icons/flagVN.png",
    "data_tier": 2,
    "plan_enabled": false
  }
]

let sources = [
    {
        "id": 203,
        "name": "Netflix",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/netflix_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/netflix/id363590051",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en",
        "android_scheme": "nflx",
        "ios_scheme": "nflx",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU",
            "BR",
            "AR",
            "BE",
            "BG",
            "CH",
            "CL",
            "CO",
            "CZ",
            "DE",
            "DK",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GR",
            "HK",
            "HR",
            "HU",
            "ID",
            "IE",
            "IL",
            "IN",
            "IS",
            "JP",
            "KR",
            "LT",
            "MX",
            "MY",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "RS",
            "RU",
            "SE",
            "SG",
            "TH",
            "TR",
            "UA",
            "VN",
            "ZA",
            "ar",
            "ch",
            "cl",
            "co",
            "ec",
            "ee",
            "fr",
            "gr",
            "id",
            "jp",
            "kr",
            "lt",
            "mx",
            "my",
            "pe",
            "ph",
            "sg",
            "th",
            "tr",
            "vn",
            "za"
        ]
    },
    {
        "id": 157,
        "name": "Hulu",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hulu_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/hulu-plus/id376510438",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hulu.plus",
        "android_scheme": "hulu",
        "ios_scheme": "hulu",
        "regions": [
            "US"
        ]
    },
    {
        "id": 26,
        "name": "Amazon Prime",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/prime_video_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id545519333",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "AR",
            "CH",
            "CL",
            "CO",
            "EC",
            "FR",
            "MX",
            "PA",
            "PE",
            "US",
            "IE",
            "GB",
            "ES",
            "DK",
            "FI",
            "SE",
            "JP",
            "IN",
            "NZ",
            "PH",
            "ZA",
            "BE",
            "DE",
            "HK",
            "ID",
            "MY",
            "PT",
            "TH",
            "VN",
            "RO",
            "IL",
            "KR",
            "RU",
            "IS",
            "NO",
            "PL",
            "NL",
            "SG",
            "HU",
            "BG",
            "CZ",
            "EE",
            "GR",
            "HR",
            "LT",
            "RS",
            "TR",
            "UA",
            "BR",
            "CA",
            "AU",
            "be",
            "dk",
            "fi",
            "in",
            "nl",
            "no",
            "se"
        ]
    },
    {
        "id": 387,
        "name": "HBO MAX",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hbomax_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "hbomax",
        "ios_scheme": "hbomax",
        "regions": [
            "US",
            "AR",
            "CL",
            "CO",
            "EC",
            "MX",
            "PE",
            "BG",
            "CZ",
            "DK",
            "ES",
            "FI",
            "HR",
            "HU",
            "NL",
            "NO",
            "PL",
            "PT",
            "RO",
            "RS",
            "SE",
            "BR"
        ]
    },
    {
        "id": 372,
        "name": "Disney+",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/disneyPlus_100px.png",
        "ios_appstore_url": "https://apps.apple.com/app/disney/id1446075923",
        "android_playstore_url": null,
        "android_scheme": "disneyplus",
        "ios_scheme": "disneyplus",
        "regions": [
            "FR",
            "US",
            "CA",
            "GB",
            "AU",
            "BR",
            "AR",
            "BE",
            "CH",
            "CL",
            "CO",
            "DE",
            "DK",
            "ES",
            "FI",
            "MX",
            "NL",
            "NO",
            "NZ",
            "PT",
            "SE",
            "SG",
            "HK",
            "EC",
            "IS",
            "PA",
            "PE",
            "IE",
            "JP",
            "KR"
        ]
    },
    {
        "id": 371,
        "name": "AppleTV+",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/appleTvPlus_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA",
            "GB",
            "AU",
            "BR",
            "AR",
            "BE",
            "BG",
            "CH",
            "CL",
            "CO",
            "CZ",
            "DE",
            "DK",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GR",
            "HK",
            "HU",
            "ID",
            "IE",
            "IL",
            "IN",
            "JP",
            "KR",
            "LT",
            "MX",
            "MY",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "RU",
            "SE",
            "SG",
            "TH",
            "UA",
            "VN",
            "ZA"
        ]
    },
    {
        "id": 409,
        "name": "BBC iPlayer",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/409_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "bbciplayer",
        "regions": [
            "GB"
        ]
    },
    {
        "id": 392,
        "name": "Hayu",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/392_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "hayuapp",
        "regions": [
            "GB",
            "AU",
            "CA"
        ]
    },
    {
        "id": 444,
        "name": "Paramount+",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/paramountPlus_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "pplus",
        "ios_scheme": "cbs",
        "regions": [
            "US",
            "AU",
            "BR",
            "CA"
        ]
    },
    {
        "id": 248,
        "name": "Showtime",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/showtime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/showtime/id996246479",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.showtime.standalone",
        "android_scheme": "intent",
        "ios_scheme": "showtime",
        "regions": [
            "US"
        ]
    },
    {
        "id": 393,
        "name": "Crave",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/393_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "onemainstream.HTNJ5TAR",
        "regions": [
            "CA"
        ]
    },
    {
        "id": 388,
        "name": "Peacock",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/peacock_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "peacock",
        "ios_scheme": "peacock",
        "regions": [
            "US"
        ]
    },
    {
        "id": 389,
        "name": "Peacock Premium",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/peacockPremium_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "peacock",
        "ios_scheme": "peacock",
        "regions": [
            "US"
        ]
    },
    {
        "id": 250,
        "name": "Showtime Anytime",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/showtime_anytime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id484232467",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.showtime.showtimeanytime",
        "android_scheme": null,
        "ios_scheme": "shoany",
        "regions": [
            "US"
        ]
    },
    {
        "id": 365,
        "name": "Amazon Freevee",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/freevee_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 394,
        "name": "Crave Plus",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/394_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "onemainstream.HTNJ5TAR",
        "regions": [
            "CA"
        ]
    },
    {
        "id": 440,
        "name": "Netflix Free",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/netflixFree_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/netflix/id363590051",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en",
        "android_scheme": "nflx",
        "ios_scheme": "nflx",
        "regions": [
            "US"
        ]
    },
    {
        "id": 395,
        "name": "Crave Starz",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/395_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "onemainstream.HTNJ5TAR",
        "regions": [
            "CA"
        ]
    },
    {
        "id": 425,
        "name": "Stan",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/425_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "stan",
        "regions": [
            "AU"
        ]
    },
    {
        "id": 232,
        "name": "STARZ",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/starz_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/starz-play/id550221096",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.bydeluxe.d3.android.program.starz",
        "android_scheme": "starz",
        "ios_scheme": "starz",
        "regions": [
            "US"
        ]
    },
    {
        "id": 402,
        "name": "CBC Gem",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/402_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "cbctv",
        "regions": [
            "CA"
        ]
    },
    {
        "id": 424,
        "name": "Foxtel Now",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/424_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 408,
        "name": "Sky Go",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/408_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "skygo",
        "ios_scheme": "skygo",
        "regions": [
            "GB"
        ]
    },
    {
        "id": 77,
        "name": "Crackle",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/sony_crackle_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/crackle-movies-tv/id377951542",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.gotv.crackle.handset",
        "android_scheme": "crackle",
        "ios_scheme": "crackle",
        "regions": [
            "US"
        ]
    },
    {
        "id": 406,
        "name": "Now TV",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/406_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "nowtv",
        "ios_scheme": "nowtv",
        "regions": [
            "GB",
            "IE",
            "ie"
        ]
    },
    {
        "id": 407,
        "name": "All 4",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/407_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "intent",
        "ios_scheme": "all4",
        "regions": [
            "IE",
            "GB"
        ]
    },
    {
        "id": 423,
        "name": "BINGE",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/423_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 419,
        "name": "Britbox UK",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/419_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB",
            "ZA"
        ]
    },
    {
        "id": 296,
        "name": "Tubi TV",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tubi_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/tubi-tv-watch-free-movies/id886445756",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.tubitv",
        "android_scheme": null,
        "ios_scheme": "tubitv",
        "regions": [
            "US",
            "CA",
            "AU"
        ]
    },
    {
        "id": 10,
        "name": "ABC",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/abc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/abc-player/id364191819",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.disney.datg.videoplatforms.android.abc",
        "android_scheme": "abcplayer",
        "ios_scheme": "abcplayer",
        "regions": [
            "US"
        ]
    },
    {
        "id": 13,
        "name": "AMC",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/amc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amc-latest-full-episodes-extras/id1025120568",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.amctve.amcfullepisodes",
        "android_scheme": "amcmobileapp",
        "ios_scheme": "AMCTVOSAPP",
        "regions": [
            "US"
        ]
    },
    {
        "id": 108,
        "name": "EPIX",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/epix_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/epix/id430018488",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.epix.epix",
        "android_scheme": "epix",
        "ios_scheme": "epixnow",
        "regions": [
            "US"
        ]
    },
    {
        "id": 364,
        "name": "Facebook Watch",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/facebook_watch_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 122,
        "name": "FX",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fx_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/fxnow/id767268733",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.fxnetworks.fxnow",
        "android_scheme": "x-fxnow",
        "ios_scheme": "x-fxnow",
        "regions": [
            "US"
        ]
    },
    {
        "id": 367,
        "name": "Kanopy",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/kanopy_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/kanopy/id1205614510",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.kanopy",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "AU"
        ]
    },
    {
        "id": 174,
        "name": "MAX GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/maxgo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/max-go/id453560335",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.MAXGo",
        "android_scheme": "maxgo",
        "ios_scheme": "maxgo",
        "regions": [
            "US"
        ]
    },
    {
        "id": 192,
        "name": "NBC",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/nbc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nbc/id442839435",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nbcuni.nbc",
        "android_scheme": "nbctve",
        "ios_scheme": "nbctve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 299,
        "name": "USA",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/usa_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/usa-now/id661695783",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.usanetwork.watcher",
        "android_scheme": "usatve",
        "ios_scheme": "usatve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 369,
        "name": "Youtube Premium",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/youtubePremium_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/youtube/id544007664",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.google.android.youtube",
        "android_scheme": null,
        "ios_scheme": "youtube",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU"
        ]
    },
    {
        "id": 159,
        "name": "Hulu with Showtime",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hulu_showtime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/hulu-plus/id376510438",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hulu.plus",
        "android_scheme": "hulu",
        "ios_scheme": "hulu",
        "regions": [
            "US"
        ]
    },
    {
        "id": 368,
        "name": "Youtube Premium",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/youtubePremium_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/youtube/id544007664",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.google.android.youtube",
        "android_scheme": null,
        "ios_scheme": "youtube",
        "regions": [
            "US"
        ]
    },
    {
        "id": 80,
        "name": "Crunchyroll Premium",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/crunchyroll_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/crunchyroll-watch-anime-drama/id329913454",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.crunchyroll.crunchyroid",
        "android_scheme": "crunchyroll",
        "ios_scheme": "crunchyroll",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU",
            "BR"
        ]
    },
    {
        "id": 439,
        "name": "Plex",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/439_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 366,
        "name": "The Criterion Channel",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/criterion_100px.png",
        "ios_appstore_url": "http://apps.apple.com/app/the-criterion-channel/id1454275199",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.criterionchannel",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA"
        ]
    },
    {
        "id": 125,
        "name": "Fandor",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fandor_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/fandor-movies-watch-only-great/id474930762",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.fandor.android",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA"
        ]
    },
    {
        "id": 252,
        "name": "Shudder",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/shudder_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/shudder-screams-on-demand/id919790315",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.dramafever.shudder",
        "android_scheme": null,
        "ios_scheme": "onemainstream.A7TIV9SL",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU"
        ]
    },
    {
        "id": 318,
        "name": "WWE Network",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/wwe_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/wwe/id551798799",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.wwe.universe",
        "android_scheme": "wwe",
        "ios_scheme": "wwe",
        "regions": [
            "US"
        ]
    },
    {
        "id": 349,
        "name": "iTunes",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/apple_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "com.apple.TVShows",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU",
            "BR"
        ]
    },
    {
        "id": 215,
        "name": "PBS",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/pbs_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/pbs-video/id398349296",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 293,
        "name": "Tribeca Shortlist",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tribeca_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/tribeca-shortlist/id993038295",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.tribeca.shortlist",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 140,
        "name": "Google Play",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/googlePlay_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": "https://play.google.com/store",
        "android_scheme": "3CBMKWkagp_Y97R_Qfm-fQ",
        "ios_scheme": null,
        "regions": [
            "US",
            "CA",
            "GB",
            "AU",
            "BR"
        ]
    },
    {
        "id": 270,
        "name": "Syfy",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/syfy_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/syfy-now/id378092432",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nbcu.tve.syfy",
        "android_scheme": "syfytve",
        "ios_scheme": "syfytve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 271,
        "name": "Syfy",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/syfy_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/syfy-now/id378092432",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nbcu.tve.syfy",
        "android_scheme": "syfytve",
        "ios_scheme": "syfytve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 18,
        "name": "Acorn TV (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/acorn_tv_prime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv-uk",
        "regions": [
            "GB",
            "US",
            "CA"
        ]
    },
    {
        "id": 27,
        "name": "Ameba (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/ameba_prime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 357,
        "name": "Boomerang (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/boomerang_prime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 68,
        "name": "Cinemax (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cinemax_prime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 73,
        "name": "Comedy Central Stand-Up Plus (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cc_now_prime_video_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 81,
        "name": "Curiosity Stream (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/curiosity_stream_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "GB",
            "US"
        ]
    },
    {
        "id": 84,
        "name": "Daring Docs (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/daring_docs_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 101,
        "name": "Docurama (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/docurama_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 102,
        "name": "Dove Channel (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/dove_channel_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 103,
        "name": "Dox (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/103_autogenerated.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 126,
        "name": "Fandor (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fandor_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US",
            "GB"
        ]
    },
    {
        "id": 129,
        "name": "Filmbox Live (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/filmbox_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 138,
        "name": "Gaia (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/gaia_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 358,
        "name": "Hallmark Movies Now (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hallmark_movies_now_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 360,
        "name": "HBO",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hbo_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 144,
        "name": "HBO (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hbo_prime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 148,
        "name": "HISTORY Vault (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/history_vault_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 163,
        "name": "IndieFlix Shorts (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/indie_flx_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 172,
        "name": "Lifetime Movie Club (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/lifetime_movie_club_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 216,
        "name": "PBS KIDS (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/pbs_kids_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 227,
        "name": "Qello Concerts (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/quello_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 238,
        "name": "Screambox (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/screambox_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 247,
        "name": "Shout! Factory TV (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/shout_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US",
            "GB"
        ]
    },
    {
        "id": 249,
        "name": "Showtime (via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/showtime_amazon_prime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 253,
        "name": "Shudder (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/shudder_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "US",
            "CA",
            "GB"
        ]
    },
    {
        "id": 256,
        "name": "Smithsonian Earth (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/smithsonian_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 234,
        "name": "STARZ (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/starz_amazon_prime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US",
            "GB"
        ]
    },
    {
        "id": 269,
        "name": "SundanceNow Doc Club (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/sundance_now_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "GB",
            "CA",
            "US"
        ]
    },
    {
        "id": 294,
        "name": "Tribeca Shortlist (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tribeca_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 295,
        "name": "True Crime Files by ID (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/true_crime_files_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 301,
        "name": "Urban Movie Channel (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/umc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id5455193",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 442,
        "name": "DirecTV On Demand",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/442_autogenerated.png",
        "ios_appstore_url": "https://apps.apple.com/app/directv/id307386350",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "directv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 443,
        "name": "Spectrum On Demand",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/443_autogenerated.png",
        "ios_appstore_url": "https://apps.apple.com/app/spectrum-tv/id420455839",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 404,
        "name": "FX Now Canada",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/404_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "fxnowcanada",
        "regions": [
            "CA"
        ]
    },
    {
        "id": 6,
        "name": "60 Minutes All Access",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/60minutes_all_access_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 427,
        "name": "7plus",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/427_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "seven",
        "regions": [
            "AU"
        ]
    },
    {
        "id": 426,
        "name": "9Now",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/426_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "ninenow",
        "regions": [
            "AU"
        ]
    },
    {
        "id": 7,
        "name": "A&E",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/ae_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/a-e/id571711580",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.aetn.aetv.watch",
        "android_scheme": "aetvplus",
        "ios_scheme": "x-ae-services",
        "regions": [
            "US"
        ]
    },
    {
        "id": 8,
        "name": "A&E",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/ae_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/a-e/id571711580",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.aetn.aetv.watch",
        "android_scheme": "aetvplus",
        "ios_scheme": "aetvplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 9,
        "name": "ABC",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/abc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/abc-player/id364191819",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.disney.datg.videoplatforms.android.abc",
        "android_scheme": "abcplayer",
        "ios_scheme": "abcplayer",
        "regions": [
            "US"
        ]
    },
    {
        "id": 428,
        "name": "ABC iview",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/428_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "iview",
        "regions": [
            "AU"
        ]
    },
    {
        "id": 17,
        "name": "Acorn TV",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/acorn_tv_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/acorn-tv/id896014310",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "acorn",
        "regions": [
            "GB",
            "AU",
            "US",
            "CA"
        ]
    },
    {
        "id": 19,
        "name": "Adult Swim",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/adultswim_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/adult-swim/id417871100",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.adultswim.videoapp.android",
        "android_scheme": "adultswim",
        "ios_scheme": "adultswim",
        "regions": [
            "US"
        ]
    },
    {
        "id": 20,
        "name": "Adult Swim",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/adultswim_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/adult-swim/id417871100",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.adultswim.videoapp.android",
        "android_scheme": "adultswim",
        "ios_scheme": "adultswim",
        "regions": [
            "US"
        ]
    },
    {
        "id": 12,
        "name": "AHC GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/ahc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1111279987",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.ahcgo",
        "android_scheme": "ahc-go",
        "ios_scheme": "ahc-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 24,
        "name": "Amazon",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/amazon_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id545519333",
        "android_playstore_url": "http://amazon.com/GetAndroidVideo",
        "android_scheme": "intent",
        "ios_scheme": "aiv",
        "regions": [
            "US",
            "GB",
            "AU",
            "CA",
            "BR"
        ]
    },
    {
        "id": 378,
        "name": "AMC Premiere",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/amcPremiere_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/amc-stream-tv-shows-movies/id1025120568",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.amctve.amcfullepisodes",
        "android_scheme": "amcmobileapp",
        "ios_scheme": "amcmobileapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 30,
        "name": "Animal Planet GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/apgo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1101434093",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.aplgo",
        "android_scheme": "apl-go",
        "ios_scheme": "apl-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 32,
        "name": "BBC America",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/bbc_america_100px.png",
        "ios_appstore_url": "itms-apps:/itunes.apple.com/us/app/bbc-america/id1089249069",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.bbca.bbcafullepisodes",
        "android_scheme": null,
        "ios_scheme": "bbcatvapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 437,
        "name": "Beamafilm",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/437_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 34,
        "name": "BET",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/bet_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/bet-now-watch-shows/id841118013",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.bet.shows",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 35,
        "name": "BET",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/bet_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/bet-now-watch-shows/id841118013",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.bet.shows",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 382,
        "name": "BET+",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/betplus_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1456618978",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.viacom.betplus",
        "android_scheme": "betplus",
        "ios_scheme": "betplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 374,
        "name": "BET+ (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/betplus_primeVideo_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 410,
        "name": "BFI Player",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/410_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 46,
        "name": "Bravo",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/bravo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/bravo-now/id383925190",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nbcu.tve.bravo",
        "android_scheme": "bravotve",
        "ios_scheme": "bravotve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 376,
        "name": "Britbox",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/britbox_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB",
            "US",
            "AU",
            "CA"
        ]
    },
    {
        "id": 377,
        "name": "Britbox (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/britbox_primeVideo_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "intent",
        "ios_scheme": "aiv-uk",
        "regions": [
            "GB",
            "US",
            "CA"
        ]
    },
    {
        "id": 62,
        "name": "Cartoon Network",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cn_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-cartoon-network-videos/id404593641",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.turner.cnvideoapp",
        "android_scheme": "cartoonnetwork",
        "ios_scheme": "cartoonnetwork",
        "regions": [
            "US"
        ]
    },
    {
        "id": 63,
        "name": "Cartoon Network",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cn_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-cartoon-network-videos/id404593641",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.turner.cnvideoapp",
        "android_scheme": "cartoonnetwork",
        "ios_scheme": "cartoonnetwork",
        "regions": [
            "US"
        ]
    },
    {
        "id": 50,
        "name": "CBS",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cbs_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/cbs/id530168168",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.cbs.app",
        "android_scheme": "cbs",
        "ios_scheme": "cbstve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 53,
        "name": "CBS News",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cbs_news_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/cbs-news/id334256223",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.treemolabs.apps.cbsnews",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 441,
        "name": "Chili",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/441_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 384,
        "name": "Cinemax (Via Hulu)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/384_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "hulu",
        "ios_scheme": "hulu",
        "regions": [
            "US"
        ]
    },
    {
        "id": 397,
        "name": "Cineplex",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/397_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "CA"
        ]
    },
    {
        "id": 449,
        "name": "Clarovideo",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/449_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "BR"
        ]
    },
    {
        "id": 54,
        "name": "CMT",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cmt_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/cmt-app/id730993656",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.cmtandroid",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 55,
        "name": "CMT",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cmt_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/cmt-app/id730993656",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.cmtandroid",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 56,
        "name": "CNBC",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cnbc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/cnbc-business-news-finance/id398018310",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.cnbc.client",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 57,
        "name": "CNBC",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cnbc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/cnbc-business-news-finance/id398018310",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.cnbc.client",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 71,
        "name": "Comedy Central",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/comedy-central/id799551807",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vmn.android.comedycentral",
        "android_scheme": "ccnetworkapp",
        "ios_scheme": "ccnetworkapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 72,
        "name": "Comedy Central",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/comedy-central/id799551807",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vmn.android.comedycentral",
        "android_scheme": "ccnetworkapp",
        "ios_scheme": "ccnetworkapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 79,
        "name": "Crunchyroll",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/crunchyroll_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/crunchyroll-watch-anime-drama/id329913454",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.crunchyroll.crunchyroid",
        "android_scheme": "crunchyroll",
        "ios_scheme": "crunchyroll",
        "regions": [
            "US"
        ]
    },
    {
        "id": 403,
        "name": "CTV",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/403_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "CA"
        ]
    },
    {
        "id": 421,
        "name": "Curiosity Stream",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/421_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "curiositystream",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU",
            "BR",
            "AR",
            "BE",
            "BG",
            "CH",
            "CL",
            "CO",
            "CZ",
            "DE",
            "DK",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GR",
            "HK",
            "HR",
            "HU",
            "ID",
            "IE",
            "IL",
            "IN",
            "IS",
            "JP",
            "KR",
            "LT",
            "MX",
            "MY",
            "NL",
            "NO",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "RS",
            "RU",
            "SE",
            "SG",
            "TH",
            "TR",
            "UA",
            "VN",
            "ZA",
            "NZ"
        ]
    },
    {
        "id": 412,
        "name": "Curzon Home Cinema",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/412_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 284,
        "name": "The CW",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cw_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/the-cw-network/id491730359",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.cw.fullepisodes.android",
        "android_scheme": "cwtv",
        "ios_scheme": "cwtv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 61,
        "name": "CW Seed",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cw_seed_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "cwseed",
        "regions": [
            "US"
        ]
    },
    {
        "id": 405,
        "name": "Darkmatter TV",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/405_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA"
        ]
    },
    {
        "id": 86,
        "name": "Destination America GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/dest_america_go_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1111281674",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.damgo",
        "android_scheme": "dam-go",
        "ios_scheme": "dam-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 91,
        "name": "Discovery GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/discovery_go_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1039067950",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.discoverygo",
        "android_scheme": "discovery-go",
        "ios_scheme": "dsc-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 93,
        "name": "Discovery Life GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/discover_life_go_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1111281680",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.dlfgo",
        "android_scheme": "dlf-go",
        "ios_scheme": "dlf-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 445,
        "name": "Discovery+",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/445_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 96,
        "name": "Disney Junior",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/disney_junior_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 355,
        "name": "DisneyNOW",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/disney_now_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/disneynow-shows-live-tv/id529997671",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.disney.datg.videoplatforms.android.watchdc",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 356,
        "name": "DisneyNOW",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/disney_now_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/disneynow-shows-live-tv/id529997671",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.disney.datg.videoplatforms.android.watchdc",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 82,
        "name": "DIY",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/diy_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 107,
        "name": "E!",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/e_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/e!-now/id876520365",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nbcu.tve.e",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 375,
        "name": "Epix (Via Amazon Prime)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/epixPrimeVideo_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "aiv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 379,
        "name": "Epix Now",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/epixNow_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/epix-now/id1387514950",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.epix.epix.now",
        "android_scheme": "epixnow",
        "ios_scheme": "epixnow",
        "regions": [
            "US"
        ]
    },
    {
        "id": 124,
        "name": "FandangoNOW",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fandangoNow_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/m-go-movies-+-tv/id738201550",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mgo.application",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 436,
        "name": "Fetch TV",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/436_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 422,
        "name": "Flix Premiere",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/422_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB",
            "US"
        ]
    },
    {
        "id": 399,
        "name": "FlixFling",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/399_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA"
        ]
    },
    {
        "id": 131,
        "name": "Food Network",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/foodnet_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 114,
        "name": "FOX",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fox_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/fox-now/id571096102",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.fox.now",
        "android_scheme": null,
        "ios_scheme": "foxapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 115,
        "name": "FOX",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fox_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/fox-now/id571096102",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.fox.now",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 361,
        "name": "Freeform",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/freeform_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/abc-family/id505728417",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.disney.datg.videoplatforms.android.abcf",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 132,
        "name": "Freeform",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/freeform_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/abc-family/id505728417",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.disney.datg.videoplatforms.android.abcf",
        "android_scheme": null,
        "ios_scheme": "abcfamilyplayer",
        "regions": [
            "US"
        ]
    },
    {
        "id": 373,
        "name": "fuboTV",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fuboTV_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 380,
        "name": "Funimation",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/funimation_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/funimation/id1075603018",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.Funimation.FunimationNow",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 381,
        "name": "Funimation",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/funimation_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/funimation/id1075603018",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.Funimation.FunimationNow",
        "android_scheme": null,
        "ios_scheme": "funi",
        "regions": [
            "AU",
            "US",
            "GB",
            "CA",
            "BR"
        ]
    },
    {
        "id": 134,
        "name": "Funny or Die",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fod_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/funny-or-die/id299546679",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.funnyordie.videos",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 135,
        "name": "Fuse",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fuse_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/fuse-tv/id967013714",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.fuse.fusetv",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 347,
        "name": "fyi",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fyi_logo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/fyi-tv/id887597381",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "fyiplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 348,
        "name": "fyi",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/fyi_logo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/fyi-tv/id887597381",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "fyiplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 448,
        "name": "Globalplay",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/448_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "BR"
        ]
    },
    {
        "id": 401,
        "name": "GuideDoc",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/401_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA",
            "GB",
            "AU"
        ]
    },
    {
        "id": 151,
        "name": "Hallmark Channel Everywhere",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hallmark_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/hallmark-channel-everywhere/id739360888",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hallmarkchannel.awe",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 152,
        "name": "Hallmark Movies Now",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hallmark_movies_now_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/feeln-movies-together/id472567577",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.feeln.android",
        "android_scheme": "hmnow",
        "ios_scheme": "com.spiritclips.sc",
        "regions": [
            "US"
        ]
    },
    {
        "id": 383,
        "name": "HBO",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hbo_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 385,
        "name": "HBO (Via Hulu)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/385_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "hulu",
        "ios_scheme": "hulu",
        "regions": [
            "US"
        ]
    },
    {
        "id": 147,
        "name": "HGTV",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hgtv_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 420,
        "name": "HiDive",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/420_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA",
            "GB",
            "AU"
        ]
    },
    {
        "id": 287,
        "name": "The History Channel",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/history_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/history/id576009463",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.aetn.history.watch",
        "android_scheme": "historyplus",
        "ios_scheme": "historyplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 288,
        "name": "The History Channel",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/history_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/history/id576009463",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.aetn.history.watch",
        "android_scheme": "historyplus",
        "ios_scheme": "historyplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 149,
        "name": "HLN",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hln_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/hln-to-go/id945045501",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hln.mobile.hlnApp",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 150,
        "name": "HLN",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hln_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/hln-to-go/id945045501",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hln.mobile.hlnApp",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 400,
        "name": "Hollywood Suite",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/400_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "CA"
        ]
    },
    {
        "id": 390,
        "name": "Hoopla",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/390_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA"
        ]
    },
    {
        "id": 447,
        "name": "Hotstar",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/447_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "IN"
        ]
    },
    {
        "id": 396,
        "name": "ICI TOU.TV",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/396_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "toutv",
        "ios_scheme": "toutv",
        "regions": [
            "CA"
        ]
    },
    {
        "id": 160,
        "name": "IFC",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/ifc_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 162,
        "name": "IndieFlix",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/indie_flx_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id919741804",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 165,
        "name": "Investigation Discovery",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/165_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "ids-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 166,
        "name": "Investigation Discovery GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/id_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1101436941",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.idsgo",
        "android_scheme": "ids-go",
        "ios_scheme": "ids-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 413,
        "name": "ITV Player",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/413_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "itvplayer",
        "regions": [
            "GB"
        ]
    },
    {
        "id": 170,
        "name": "Lifetime",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/lifetime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/lifetime/id579966222",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.aetn.lifetime.watch",
        "android_scheme": "lifetimeplus",
        "ios_scheme": "lifetimeplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 171,
        "name": "Lifetime",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/lifetime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/lifetime/id579966222",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.aetn.lifetime.watch",
        "android_scheme": "lifetimeplus",
        "ios_scheme": "lifetimeplus",
        "regions": [
            "US"
        ]
    },
    {
        "id": 168,
        "name": "LOGO",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/logo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/logotv/id795019155",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.logoandroid",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 169,
        "name": "LOGO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/logo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/logotv/id795019155",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.logoandroid",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 398,
        "name": "Microsoft Store",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/398_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "GB",
            "CA",
            "AU",
            "BR"
        ]
    },
    {
        "id": 178,
        "name": "MTV",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/mtv_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/mtv/id422366403",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.mtvPrimeAndroid",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 179,
        "name": "MTV",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/mtv_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/mtv/id422366403",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.mtvPrimeAndroid",
        "android_scheme": null,
        "ios_scheme": "mtvnetworkapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 181,
        "name": "MUBI",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/mubi_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/mubi/id626148774",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mubi",
        "android_scheme": null,
        "ios_scheme": "mubi",
        "regions": [
            "CA",
            "MX",
            "GB",
            "BR",
            "AR",
            "BE",
            "BG",
            "CL",
            "CO",
            "DE",
            "EC",
            "ES",
            "FR",
            "HR",
            "HU",
            "ID",
            "IE",
            "IN",
            "JP",
            "KR",
            "MY",
            "NL",
            "PA",
            "PE",
            "PH",
            "RO",
            "RS",
            "SG",
            "TH",
            "TR",
            "VN",
            "ZA",
            "AU",
            "CH",
            "DK",
            "FI",
            "HK",
            "IL",
            "NO",
            "NZ",
            "SE",
            "EE",
            "GR",
            "LT",
            "PL",
            "RU",
            "UA",
            "US",
            "PT"
        ]
    },
    {
        "id": 418,
        "name": "My5",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/418_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "my5",
        "ios_scheme": "my5",
        "regions": [
            "GB"
        ]
    },
    {
        "id": 196,
        "name": "Nat Geo Wild",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/natgeo_wild100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 197,
        "name": "Nat Geo Wild",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/natgeo_wild100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 198,
        "name": "National Geographic",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/natgeo_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 199,
        "name": "National Geographic",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/natgeo_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 201,
        "name": "National Geographic Kids",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/natgeo_kids_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 191,
        "name": "NBC",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/nbc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nbc/id442839435",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nbcuni.nbc",
        "android_scheme": "nbctve",
        "ios_scheme": "nbctve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 193,
        "name": "NBC News",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/nbc_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nbc-news/id319740707",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.zumobi.msnbc",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 194,
        "name": "NBC News",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/nbc_news_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nbc-news/id319740707",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.zumobi.msnbc",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 195,
        "name": "NBC UNIVERSO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/universo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nbc-universo-now/id869444353",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 204,
        "name": "Nick Jr.",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/nickjr_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nick-jr./id911115712",
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 206,
        "name": "Nickelodeon",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/nick_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nick/id596133590",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nickonline.android.nickapp",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 207,
        "name": "Nickelodeon",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/nick_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/nick/id596133590",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nickonline.android.nickapp",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 214,
        "name": "Oxygen",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/oxygen_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/oxygen-now/id700797306",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.nbcu.tve.oxygen",
        "android_scheme": "oxygentve",
        "ios_scheme": "oxygentve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 435,
        "name": "OzFlix",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/435_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 414,
        "name": "Pantaflix",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/414_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "pantaflix",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU"
        ]
    },
    {
        "id": 221,
        "name": "Paramount Network",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/paramount_network_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/paramount-network/id906788127",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vmn.android.spike",
        "android_scheme": null,
        "ios_scheme": "paramountnetwork",
        "regions": [
            "US"
        ]
    },
    {
        "id": 217,
        "name": "PBS Kids",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/pbs_kids_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/pbs-kids-video/id435138734",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=org.pbskids.video",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 391,
        "name": "Pluto TV",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/391_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "GB",
            "BR"
        ]
    },
    {
        "id": 225,
        "name": "Popcornflix",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/popcornflix_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/popcornflix-free-movies/id493605531",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.curiousbrain.popcornflix",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US",
            "CA"
        ]
    },
    {
        "id": 431,
        "name": "Quickflix",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/431_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 432,
        "name": "Quickflix Store",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/432_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 417,
        "name": "Rakuten TV",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/417_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 429,
        "name": "SBS On Demand",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/429_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "sbsondemand",
        "regions": [
            "AU"
        ]
    },
    {
        "id": 237,
        "name": "Science GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/scigo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1111281685",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.scigo",
        "android_scheme": "sci-go",
        "ios_scheme": "sci-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 246,
        "name": "Shout! Factory TV",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/shout_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 251,
        "name": "Showtime FREEview",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/showtime_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/showtime-anytime/id484232467",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.showtime.showtimeanytime",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 411,
        "name": "Sky Store",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/411_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 255,
        "name": "Smithsonian Channel",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/smithsonian_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/smithsonian-channel/id482096908",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.smithsonian.android",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 257,
        "name": "SnagFilms",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/snagfilms_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/snagfilms-watch-free-movies/id404906625",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=air.com.snagfilms",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 259,
        "name": "South Park Studios",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/sps_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 231,
        "name": "STARZ",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/starz_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/starz-play/id550221096",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.bydeluxe.d3.android.program.starz",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 386,
        "name": "STARZ (Via Hulu)",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/386_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": "hulu",
        "ios_scheme": "hulu",
        "regions": [
            "US"
        ]
    },
    {
        "id": 433,
        "name": "Sun Nxt",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/433_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "CA",
            "AU",
            "US",
            "GB",
            "BR"
        ]
    },
    {
        "id": 267,
        "name": "Sundance",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/sundance_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "onemainstream.MG9WJCOV",
        "regions": [
            "US",
            "CA"
        ]
    },
    {
        "id": 268,
        "name": "SundanceNow Doc Club",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/sundance_now_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/sundancenow-doc-club-documentaries/id879902807",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.dramafever.docclub",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 415,
        "name": "Talk Talk TV",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/415_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 272,
        "name": "TBS",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tbs_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-tbs/id462780547",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.turner.tbs.android.networkapp",
        "android_scheme": "watchtbs",
        "ios_scheme": "watchtbs",
        "regions": [
            "US"
        ]
    },
    {
        "id": 282,
        "name": "Telemundo Now",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/telemundo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/telemundo-now/id680595680",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.telemundo.awe",
        "android_scheme": "telemundotve",
        "ios_scheme": "telemundotve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 434,
        "name": "Telstra TV",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/434_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AU"
        ]
    },
    {
        "id": 430,
        "name": "tenplay",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/430_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "tenplay",
        "regions": [
            "AU"
        ]
    },
    {
        "id": 274,
        "name": "TLC GO",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tlcgo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/id1101436320",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.discovery.tlcgo",
        "android_scheme": "tlc-go",
        "ios_scheme": "tlc-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 276,
        "name": "TNT",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tnt_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-tnt/id460494135",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.turner.tnt.android.networkapp",
        "android_scheme": "watchtnt",
        "ios_scheme": "watchtnt",
        "regions": [
            "US"
        ]
    },
    {
        "id": 292,
        "name": "Travel Channel",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/trvl_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "trav-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 353,
        "name": "truTV",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/trutv_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-trutv/id396972659",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.turner.trutv",
        "android_scheme": "watchtrutv",
        "ios_scheme": "watchtrutv",
        "regions": [
            "US"
        ]
    },
    {
        "id": 277,
        "name": "TV Land",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tvland_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/us/app/tv-land/id1065978080",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vmn.playplex.tvland",
        "android_scheme": "tvlandnetworkapp",
        "ios_scheme": "tvlandnetworkapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 278,
        "name": "TV Land",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tvland_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/us/app/tv-land/id1065978080",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vmn.playplex.tvland",
        "android_scheme": "tvlandnetworkapp",
        "ios_scheme": "tvlandnetworkapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 416,
        "name": "UKTV Play",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/416_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": "uktvplay",
        "regions": [
            "GB"
        ]
    },
    {
        "id": 298,
        "name": "USA",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/usa_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/usa-now/id661695783",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.usanetwork.watcher",
        "android_scheme": "usatve",
        "ios_scheme": "usatve",
        "regions": [
            "US"
        ]
    },
    {
        "id": 311,
        "name": "Verizon On Demand",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/verizon_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 302,
        "name": "VH1",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/vh1_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/vh1/id413522634",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.vh1android",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 303,
        "name": "VH1",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/vh1_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/vh1/id413522634",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.mtvn.vh1android",
        "android_scheme": null,
        "ios_scheme": "vh1networkapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 305,
        "name": "VICELAND",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/viceland_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/viceland/id1075922366",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vice.viceland",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 306,
        "name": "VICELAND",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/viceland_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/viceland/id1075922366",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vice.viceland",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 313,
        "name": "Vimeo",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/vimeo_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/vimeo/id425194759",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.vimeo.android.videoapp",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 446,
        "name": "Virgin TV GO",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/446_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "GB"
        ]
    },
    {
        "id": 307,
        "name": "VUDU",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/vudu-player-movies-tv/id487285735",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=air.com.vudu.air.DownloaderTablet",
        "android_scheme": "vuduapp",
        "ios_scheme": "vuduapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 308,
        "name": "VUDU",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/vudu-player-movies-tv/id487285735",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=air.com.vudu.air.DownloaderTablet",
        "android_scheme": "vuduapp",
        "ios_scheme": "vuduapp",
        "regions": [
            "US"
        ]
    },
    {
        "id": 321,
        "name": "Watch Cooking Channel",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/cooking_channel_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-cooking-channel/id675276583",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.cookingchannel.watcher",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 322,
        "name": "Watch DIY Network",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/diy_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/diy-watch/id485756277",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.diy.watcher",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 330,
        "name": "Watch Food Network",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/foodnet_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-food-network/id642410271",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.foodnetwork.watcher",
        "android_scheme": null,
        "ios_scheme": "food-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 331,
        "name": "Watch HGTV",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/hgtv_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/hgtv-watch/id376038666",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hgtv.watcher",
        "android_scheme": null,
        "ios_scheme": "hgtv-go",
        "regions": [
            "US"
        ]
    },
    {
        "id": 332,
        "name": "Watch TCM",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/tcm_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-tcm/id341161319",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.tcm.tcm",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 333,
        "name": "Watch Travel Channel",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/trvl_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/watch-travel-channel/id596546023",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.travelchannel.watcher",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 315,
        "name": "WE tv",
        "type": "tve",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/wetv_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/we-tv-mobile-for-ipad/id546812802",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.wetv.WEtviPhoneApp",
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 342,
        "name": "Yahoo View",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/yahoo_view_100px.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "US"
        ]
    },
    {
        "id": 344,
        "name": "YouTube",
        "type": "purchase",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/youtube_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/youtube/id544007664",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.google.android.youtube",
        "android_scheme": null,
        "ios_scheme": "youtube",
        "regions": [
            "US",
            "CA",
            "GB",
            "AU"
        ]
    },
    {
        "id": 345,
        "name": "YouTube",
        "type": "free",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/youtube_100px.png",
        "ios_appstore_url": "http://itunes.apple.com/app/youtube/id544007664",
        "android_playstore_url": "https://play.google.com/store/apps/details?id=com.google.android.youtube",
        "android_scheme": null,
        "ios_scheme": "youtube",
        "regions": [
            "US",
            "AU"
        ]
    },
    {
        "id": 450,
        "name": "Zee5",
        "type": "sub",
        "logo_100px": "https://cdn.watchmode.com/provider_logos/450_autogenerated.png",
        "ios_appstore_url": null,
        "android_playstore_url": null,
        "android_scheme": null,
        "ios_scheme": null,
        "regions": [
            "AR",
            "BE",
            "BG",
            "CH",
            "CL",
            "CO",
            "CZ",
            "DE",
            "DK",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GR",
            "HK",
            "HR",
            "HU",
            "ID",
            "IE",
            "IL",
            "IN",
            "IS",
            "JP",
            "KR",
            "LT",
            "MX",
            "MY",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "RO",
            "RS",
            "RU",
            "SE",
            "SG",
            "TH",
            "TR",
            "UA",
            "VN",
            "ZA"
        ]
    }
]
