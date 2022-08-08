import React from 'react'
import SelectableServicesItem from './SelectableServicesItem'
const SelectableServicesList = (props) => {

    
  return (
    <ul className="flex flex-col w-11/12">
        {/* <li>
            <input type="checkbox" id='all' value='all' onChange={()=>{
                props.checkAll()
                }} />
            <label className="text-xl" htmlFor='all'>Check All</label>
        </li> */}
        {props.shortListServices.map(serviceItem=>{
            return <SelectableServicesItem 
            key={serviceItem['id']} 
            serviceItem={serviceItem} 
            selectServices={props.selectServices}
            servicesSelected={props.servicesSelected} 
            allChecked = {props.allChecked}
            />
        })}
    </ul>
  )
}

export default SelectableServicesList