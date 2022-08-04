import ResultItem from './ResultItem'



const ResultList = (props) => {
  return (
    <ul className='flex-col flex-wrap w-full'>
        {props.list.map((movie)=>{
           return <ResultItem key={movie.id} movie={movie}/>
        })}
    </ul>
  )
}

export default ResultList