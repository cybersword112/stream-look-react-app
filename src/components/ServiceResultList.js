import ServiceItem from './ServiceItem'

const ServiceResultList = (props) => {
  return (
    <ul id="services" className='bg-slate-900/50 text-white text-xl list-disc pl-7'>
        {props.services.filter(service=>{
      if(props.servicesSelected.length > 0 ){
        return props.servicesSelected.includes(service['source_id'])
      }else{
        return true
      }
    }).map((service)=>{
            return <ServiceItem key={service['id']} service={service} />
        })}
    </ul>
  )
}

export default ServiceResultList