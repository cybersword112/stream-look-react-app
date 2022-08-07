import ServiceItem from './ServiceItem'

const ServiceResultList = (props) => {
  return (
    <ul id="services" className='bg-slate-900/50 text-white'>
        {props.services.filter(service=>{
          if(props.servicesSelected.length > 0 ){
            console.log('array is not empty')
            return props.servicesSelected.includes(service['source_id'])
          }else{
            console.log('array is empty')
            return true
          }
        }).map((service,index,array)=>{
            return <ServiceItem key={service['id']} service={service} />
        })}
    </ul>
  )
}

export default ServiceResultList