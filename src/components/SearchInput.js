const SearchInput = (props) =>{

  return (
    <>
        <input type='text' className="text-left text-black text-2xl w-max rounded-sm hover:shadow-inner hover:shadow-lg" 
        onChange={props.updateSearch.bind(this)} 
        value = {props.search} />
        <button className="bg-slate-800/75 text-white text-2xl px-3 w-fit mt-4 ml-4 mr-2 rounded hover:shadow-lg hover:underline decoration-slate-500 hover:text-slate-500" onClick={props.fetchMovies}>
          Search
        </button>
        <button className="bg-slate-800/75 text-white text-2xl px-3 w-fit mt-4 rounded hover:shadow-lg hover:underline decoration-slate-500 hover:text-slate-500"
        onClick={props.openSelectServices.bind(this)}>Set services</button>
    </>
  )
}

export default SearchInput