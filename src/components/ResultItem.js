import React from "react"
import ServiceResultList from "./ServiceResultList"

const ResultItem = (props) => {
  const [services,setServices] = React.useState([])
  const [servicesAvailable,setServicesAvailable] = React.useState(true)

  async function fetchServices(e){
    e.preventDefault()
    const KEY = process.env.REACT_APP_WATCHMODE_API_KEY
    const title_id = props.movie.id
    const sourceurl = `https://api.watchmode.com/v1/title/${title_id}/sources/?apiKey=${KEY}`
    let result = await fetch(sourceurl)
    let services = await result.json()
    services.map((service,index)=>{
      return service.id = index
    })
    services = services.filter((v,i,a)=>a.findIndex(v2=>(v.source_id === v2.source_id))===i)
    setServices(services)

    let filteredServices = services.filter(service=>{
      if(props.servicesSelected.length > 0 ){
        return props.servicesSelected.includes(service['source_id'])
      }else{
        return true
      }
    })
    if(filteredServices.length){
      setServicesAvailable(true)
    }else{
      setServicesAvailable(false)
    }
  }
    return (
      <li className="w-11/12 sm:w-1/2 lg:w-1/4 p-4">
        <a href="" onClick={(e)=>{
          fetchServices(e)
          }}>
            <h2 className="text-center">
                {props.movie.name} ({props.movie.year})
            </h2>
            <img src={props.movie.image_url} className="w-full rounded"/>
        </a>
        <ServiceResultList services={services} servicesSelected={props.servicesSelected}/>
        <span hidden={servicesAvailable}>Not available on your selected services</span>
      </li>
    )
}

export default ResultItem