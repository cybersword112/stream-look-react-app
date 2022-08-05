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
            services={props.services}
            movieId = {props.movieId}
           />
        })}
    </ul>
  )
}

export default ResultList