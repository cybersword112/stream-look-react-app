import React from 'react'

const SelectableServicesItem = (props) => {
    const [serviceIsSelected,setServiceIsSelected] = React.useState(false)

    React.useEffect(()=>{
        if(props.servicesSelected.includes(props.serviceItem['id'])){
            setServiceIsSelected(true)
        }
    },[props.servicesSelected,props.serviceItem])



  return (
    <li className='flex flex-row w-1/4'>
        <input checked={serviceIsSelected || props.allChecked} 
        type="checkbox" 
        id={props.serviceItem['name']} 
        value={props.serviceItem['id']} 
        onChange={()=>{
            props.selectServices(props.serviceItem['id'])
            setServiceIsSelected(!serviceIsSelected)
        }}/>
        
        <label className="text-xl " htmlFor={props.serviceItem['name']}>{props.serviceItem['name']}</label>
        <img className="shadow-xl"  src={props.serviceItem['logo_100px']}/>
    </li>
  )
}

export default SelectableServicesItem