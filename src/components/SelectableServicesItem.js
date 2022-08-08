import React from 'react'

const SelectableServicesItem = (props) => {
    const [serviceIsSelected,setServiceIsSelected] = React.useState(false)

    React.useEffect(()=>{
        if(props.servicesSelected.includes(props.serviceItem['id'])){
            setServiceIsSelected(true)
        }
    },[props.servicesSelected,props.serviceItem])



  return (
    <li className='flex flex-row items-center shadow my-4 bg-slate-300/40 p-2'>
            <input className="ml-2" checked={serviceIsSelected} 
            type="checkbox" 
            id={props.serviceItem['name']} 
            value={props.serviceItem['id']} 
            onChange={()=>{
                props.selectServices(props.serviceItem['id'])
                setServiceIsSelected(!serviceIsSelected)
            }}/>
            <div className="ml-5">
                <img className="h-16 shadow-xl border"  src={props.serviceItem['logo_100px']}/>    
            </div>
            <label className="text-xl ml-4" htmlFor={props.serviceItem['name']}>{props.serviceItem['name']}</label>
    </li>
  )
}

export default SelectableServicesItem