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
      <li className="w-1/2 sm:w-2/6 lg:w-1/4 p-4">
        <div className="bg-gray-600/50 p-5 rounded">
          <a className="hover:underline  hover:text-2xl text-xl text-white" href="" onClick={(e)=>{
            fetchServices(e)
          }}>
              <h2 className="pb-2 text-center">
                  {props.movie.name} ({props.movie.year})
              </h2>
              <img src={props.movie.image_url} className="w-full rounded"/>
          </a>
        </div>
          <div className="bg-grey-800 ">
            <ServiceResultList services={services} servicesSelected={props.servicesSelected}/>
            <span hidden={servicesAvailable}>Not available on your selected services</span>
          </div>
      </li>
    )
}

export default ResultItem