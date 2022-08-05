import ServiceItem from './ServiceItem'

const ServiceResultList = (props) => {
  return (
    <ul id="services">
        {props.services.map((service)=>{
          return <ServiceItem key={service['id']} service={service} />
        })}
    </ul>
  )
}

export default ServiceResultList