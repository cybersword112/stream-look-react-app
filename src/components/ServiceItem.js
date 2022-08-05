const ServiceItem = (props) => {
  return (
    <li>
        <a href={props.service["web_url"]}>
            <h3>
                {props.service['name']}
            </h3>
        </a>
    </li>
  )
}

export default ServiceItem