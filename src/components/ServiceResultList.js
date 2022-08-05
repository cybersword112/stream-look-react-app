import ServiceItem from './ServiceItem'

const ServiceResultList = (props) => {
  return (
    <ul id="services" className='bg-slate-900/50 text-white'>
        {props.services.map((service)=>{
          return <ServiceItem key={service['id']} service={service} />
        })}
    </ul>
  )
}

export default ServiceResultList