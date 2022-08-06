import React from 'react'

const SelectableServicesItem = (props) => {
  return (
    <li className='flex flex-row w-1/4'>
        <input type="checkbox" id={props.serviceItem['name']} value={props.serviceItem['id']}/>
        <label className="text-xl " htmlFor={props.serviceItem['name']}>{props.serviceItem['name']}</label>
        <img className="shadow-xl"  src={props.serviceItem['logo_100px']}/>
    </li>
  )
}

export default SelectableServicesItem