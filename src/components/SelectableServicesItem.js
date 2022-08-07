import React from 'react'

const SelectableServicesItem = (props) => {
    let input; 
    if (props.servicesSelected.includes(props.serviceItem['id'])){
        input = (<input checked type="checkbox" id={props.serviceItem['name']} value={props.serviceItem['id']} onChange={()=>{props.selectServices(props.serviceItem['id'])}} />)
    }else{
        input = (<input type="checkbox" id={props.serviceItem['name']} value={props.serviceItem['id']} onChange={()=>{props.selectServices(props.serviceItem['id'])}} />)
    }

  return (
    <li className='flex flex-row w-1/4'>
        {input}
        <label className="text-xl " htmlFor={props.serviceItem['name']}>{props.serviceItem['name']}</label>
        <img className="shadow-xl"  src={props.serviceItem['logo_100px']}/>
    </li>
  )
}

export default SelectableServicesItem