import ResultItem from './ResultItem'

const ResultList = (props) => {
  
  return (
    <ul className='flex flex-wrap sm:flex-row rounded'>
        {props.list.map((movie)=>{
           return <ResultItem 
            key={movie.id} 
            movie={movie}
            servicesSelected={props.servicesSelected}
           />
        })}
    </ul>
  )
}

export default ResultList