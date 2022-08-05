import ResultItem from './ResultItem'

const ResultList = (props) => {
  return (
    <ul className='flex flex-wrap basis-1/4'>
        {props.list.map((movie)=>{
           return <ResultItem 
            key={movie.id} 
            movie={movie} 
            fetchServices={props.fetchServices} 
            updateId={props.updateId} 
           />
        })}
    </ul>
  )
}

export default ResultList