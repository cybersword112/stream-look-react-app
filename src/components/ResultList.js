import ResultItem from './ResultItem'

const ResultList = (props) => {
  return (
    <ul className='flex flex-wrap basis-1/4 bg-slate-600/50 rounded'>
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