import React from "react"
import ServiceResultList from "./ServiceResultList"

const ResultItem = (props) => {
  const [services,setServices] = React.useState([])
  // const [showList,setShowList] = React.useState(false)
  // const [movieId,setMovieId] = React.useState(props.movie.id)

  async function fetchServices(e){
    e.preventDefault()
    const KEY = "cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ"
    const title_id = props.movie.id
    console.log(title_id)
    const sourceurl = `https://api.watchmode.com/v1/title/${title_id}/sources/?apiKey=${KEY}`
    let result = await fetch(sourceurl)
    let services = await result.json()
    services.map((service,index)=>{
      return service.id = index
    })
    console.log(services)
    setServices(services)
  }


    return (
      <li className="w-1/4 p-4">
      <a href="" onClick={(e)=>fetchServices(e)}>
          <h2 className="text-center">
              {props.movie.name} ({props.movie.year})
          </h2>
          <img src={props.movie.image_url} className="w-full"/>
      </a>
        <ul>
          <ServiceResultList services={services} />
        </ul>
      </li>
    )
  
}

export default ResultItem

// {
//     "results": [
//         {
//             "name": "Hey Arnold!",
//             "relevance": 193.2,
//             "type": "tv_series",
//             "id": 352234,
//             "year": 1996,
//             "result_type": "title",
//             "tmdb_id": 537,
//             "tmdb_type": " w-fulltv",
//             "image_url": "https://cdn.watchmode.com/posters/0352234_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Arnold! The Jungle Movie",
//             "relevance": 167.18,
//             "type": "tv_movie",
//             "id": 446730,
//             "year": 2017,
//             "result_type": "title",
//             "tmdb_id": 439058,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/0446730_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Duggee",
//             "relevance": 155.41,
//             "type": "tv_series",
//             "id": 352244,
//             "year": 2014,
//             "result_type": "title",
//             "tmdb_id": 74280,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/0352244_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Arnold! The Movie",
//             "relevance": 124.9,
//             "type": "movie",
//             "id": 1164576,
//             "year": 2002,
//             "result_type": "title",
//             "tmdb_id": 17710,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164576_poster_w185.jpg"
//         },
//         {
//             "name": "Hey You!",
//             "relevance": 99.07,
//             "type": "movie",
//             "id": 1688904,
//             "year": 2022,
//             "result_type": "title",
//             "tmdb_id": 1005166,
//             "tmdb_type": "movie",
//             "image_url": null
//         },
//         {
//             "name": "Heyy Babyy",
//             "relevance": 98.03,
//             "type": "movie",
//             "id": 1164642,
//             "year": 2007,
//             "result_type": "title",
//             "tmdb_id": 4157,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164642_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Ram",
//             "relevance": 97.75,
//             "type": "movie",
//             "id": 1164606,
//             "year": 2000,
//             "result_type": "title",
//             "tmdb_id": 60579,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164606_poster_w185.jpg"
//         },
//         {
//             "name": "Hey! Sinamika",
//             "relevance": 94.12,
//             "type": "movie",
//             "id": 1630036,
//             "year": 2022,
//             "result_type": "title",
//             "tmdb_id": 803736,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01630036_poster_w185.jpg"
//         },
//         {
//             "name": "The Heyday of the Insensitive Bastards",
//             "relevance": 91.45,
//             "type": "movie",
//             "id": 1396899,
//             "year": 2015,
//             "result_type": "title",
//             "tmdb_id": 333033,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01396899_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Hey It's Esther Blueburger",
//             "relevance": 89.5,
//             "type": "movie",
//             "id": 1164592,
//             "year": 2008,
//             "result_type": "title",
//             "tmdb_id": 50700,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164592_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Dude",
//             "relevance": 88.39,
//             "type": "tv_series",
//             "id": 352243,
//             "year": 1989,
//             "result_type": "title",
//             "tmdb_id": 2020,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/0352243_poster_w185.jpg"
//         },
//         {
//             "name": "Hey... Stop Stabbing Me!",
//             "relevance": 86.62,
//             "type": "movie",
//             "id": 1664063,
//             "year": 2003,
//             "result_type": "title",
//             "tmdb_id": 206721,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01664063_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Babu Riba",
//             "relevance": 86.62,
//             "type": "movie",
//             "id": 1164578,
//             "year": 1985,
//             "result_type": "title",
//             "tmdb_id": 42024,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164578_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Bartender",
//             "relevance": 85.97,
//             "type": "movie",
//             "id": 1164579,
//             "year": 2013,
//             "result_type": "title",
//             "tmdb_id": 169860,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164579_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, Mr. Producer! The Musical World of Cameron Mackintosh",
//             "relevance": 85.97,
//             "type": "movie",
//             "id": 527350,
//             "year": 1998,
//             "result_type": "title",
//             "tmdb_id": 213807,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/0527350_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Man",
//             "relevance": 85.97,
//             "type": "short_film",
//             "id": 2739623,
//             "year": 2022,
//             "result_type": "title",
//             "tmdb_id": 978904,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/02739623_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, Boo: Harper Lee & To Kill a Mockingbird",
//             "relevance": 84.22,
//             "type": "movie",
//             "id": 1164626,
//             "year": 2011,
//             "result_type": "title",
//             "tmdb_id": 70758,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164626_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Watch This",
//             "relevance": 84.22,
//             "type": "movie",
//             "id": 1562348,
//             "year": 2010,
//             "result_type": "title",
//             "tmdb_id": 36566,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01562348_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Good Lookin'",
//             "relevance": 83.64,
//             "type": "movie",
//             "id": 1164589,
//             "year": 1982,
//             "result_type": "title",
//             "tmdb_id": 32202,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164589_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Prabhu!",
//             "relevance": 83.54,
//             "type": "tv_series",
//             "id": 3160959,
//             "year": 2019,
//             "result_type": "title",
//             "tmdb_id": 87020,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/03160959_poster_w185.jpg"
//         },
//         {
//             "name": "Hey There, It's Yogi Bear",
//             "relevance": 82.21,
//             "type": "movie",
//             "id": 1164612,
//             "year": 1964,
//             "result_type": "title",
//             "tmdb_id": 33037,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164612_poster_w185.jpg"
//         },
//         {
//             "name": "Hey! Little Bones",
//             "relevance": 81.04,
//             "type": "movie",
//             "id": 1622924,
//             "year": 2020,
//             "result_type": "title",
//             "tmdb_id": 729119,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01622924_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, Cinderella!",
//             "relevance": 77.55,
//             "type": "tv_movie",
//             "id": 446731,
//             "year": 1969,
//             "result_type": "title",
//             "tmdb_id": 41607,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/0446731_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Vern, It's Ernest!",
//             "relevance": 77.53,
//             "type": "tv_series",
//             "id": 352282,
//             "year": 1988,
//             "result_type": "title",
//             "tmdb_id": 10026,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/0352282_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, Night",
//             "relevance": 75.75,
//             "type": "short_film",
//             "id": 2712753,
//             "year": 2021,
//             "result_type": "title",
//             "tmdb_id": 811448,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/02712753_poster_w185.jpg"
//         },
//         {
//             "name": "Hey! …Keep the Change",
//             "relevance": 75.75,
//             "type": "short_film",
//             "id": 2725525,
//             "year": 2021,
//             "result_type": "title",
//             "tmdb_id": 892436,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/02725525_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Deer!",
//             "relevance": 73.54,
//             "type": "short_film",
//             "id": 2656642,
//             "year": 2015,
//             "result_type": "title",
//             "tmdb_id": 497324,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/02656642_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, It's Me",
//             "relevance": 73.54,
//             "type": "short_film",
//             "id": 2704366,
//             "year": 2020,
//             "result_type": "title",
//             "tmdb_id": 755216,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/02704366_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, Mr. Postman!",
//             "relevance": 70.65,
//             "type": "movie",
//             "id": 1563801,
//             "year": 2018,
//             "result_type": "title",
//             "tmdb_id": 583177,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01563801_poster_w185.jpg"
//         },
//         {
//             "name": "HEYBOT!",
//             "relevance": 69.46,
//             "type": "tv_series",
//             "id": 3173822,
//             "year": 2016,
//             "result_type": "title",
//             "tmdb_id": 67902,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/03173822_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, Class President!",
//             "relevance": 67.89,
//             "type": "tv_series",
//             "id": 536203,
//             "year": 2009,
//             "result_type": "title",
//             "tmdb_id": 83770,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/0536203_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Sensei, Don't you know?",
//             "relevance": 64.8,
//             "type": "tv_series",
//             "id": 541943,
//             "year": 2019,
//             "result_type": "title",
//             "tmdb_id": 100211,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/0541943_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Ash, Whatcha Playin'?",
//             "relevance": 63.08,
//             "type": "tv_series",
//             "id": 3183802,
//             "year": 2008,
//             "result_type": "title",
//             "tmdb_id": 113006,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/03183802_poster_w185.jpg"
//         },
//         {
//             "name": "Hey! Bumboo",
//             "relevance": 62.01,
//             "type": "tv_series",
//             "id": 3169730,
//             "year": 1985,
//             "result_type": "title",
//             "tmdb_id": 13488,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/03169730_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Dad..!",
//             "relevance": 60.98,
//             "type": "tv_series",
//             "id": 352241,
//             "year": 1987,
//             "result_type": "title",
//             "tmdb_id": 2314,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/0352241_poster_w185.jpg"
//         },
//         {
//             "name": "Hey Mulligan",
//             "relevance": 53.86,
//             "type": "tv_series",
//             "id": 3158421,
//             "year": 1954,
//             "result_type": "title",
//             "tmdb_id": 26129,
//             "tmdb_type": "tv",
//             "image_url": null
//         },
//         {
//             "name": "Hey Hey It's Saturday",
//             "relevance": 52.09,
//             "type": "tv_series",
//             "id": 352249,
//             "year": 1971,
//             "result_type": "title",
//             "tmdb_id": 4341,
//             "tmdb_type": "tv",
//             "image_url": "https://cdn.watchmode.com/posters/0352249_poster_w185.jpg"
//         },
//         {
//             "name": "Hey! Hey! USA",
//             "relevance": 39.79,
//             "type": "movie",
//             "id": 1164622,
//             "year": 1938,
//             "result_type": "title",
//             "tmdb_id": 173447,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01164622_poster_w185.jpg"
//         },
//         {
//             "name": "Hey, Lads and Lasses",
//             "relevance": 35.04,
//             "type": "movie",
//             "id": 1292064,
//             "year": 1991,
//             "result_type": "title",
//             "tmdb_id": 365282,
//             "tmdb_type": "movie",
//             "image_url": "https://cdn.watchmode.com/posters/01292064_poster_w185.jpg"
//         }
//     ]
// }