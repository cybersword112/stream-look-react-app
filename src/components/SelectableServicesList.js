import React from 'react'
import SelectableServicesItem from './SelectableServicesItem'
const SelectableServicesList = () => {

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
    

  return (
    <ul>
        {shortListServices.map(serviceItem=>{
            return <SelectableServicesItem key={serviceItem['id']} serviceItem={serviceItem} />
        })}
    </ul>
  )
}

export default SelectableServicesList