import ResultItem from './ResultItem'

const ResultList = (props) => {
  
  return (
    <ul className='flex flex-wrap sm:flex-row  bg-slate-600/50 rounded'>
        {props.list.map((movie)=>{
           return <ResultItem 
            key={movie.id} 
            movie={movie}
            servicesSelected={props.servicesSelected}
            getResultCount={props.getResultCount}
           />
        })}
    </ul>
  )
}

export default ResultList