const SearchInput = (props) =>{

  return (
    <>
        <input type='text' className="text-2xl text-left text-black w-max border-black rounded-sm" 
        onChange={props.updateSearch.bind(this)} 
        value = {props.search} />
        <button className="bg-black text-white p-2.5 w-fit mt-4 mx-4 rounded" onClick={props.fetchMovies}>
          Search
        </button>
    </>
  )
}

export default SearchInput