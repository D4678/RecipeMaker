import {React, useEffect, useState} from 'react'
import './App.css'
import Recipe from './Recipe'

const App = () =>{
    const App_id = "68bd7210"
    const app_key = "9f03405d0cb37d98bc35836f4c3c8b7a"

    const [query,setQuery] = useState('chicken')
    const [search,setSearch] = useState('')
    const [recipes,setRecipes] = useState([])


    useEffect(()=>{
      getRecipes()
    },[query])

  // console.log(query)
  



const getRecipes = async ()=>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${app_key}`)
  const data = await response.json()
  // console.log(recipes)
  setRecipes(data.hits)
}

const getSearch = e =>{
  e.preventDefault()
  console.log("chala getSearch")
  setQuery(search)
  setSearch('')
}
  return (
      <div className='App'>
        <form className='search-form' onSubmit={getSearch}>
      <input type="text" className="search-bar" value={search} onChange={e => setSearch(e.target.value)}/>
      <button type="submit" className="search-button">Search</button>
        </form>
        <div className='recipes'>
        {recipes.map(recipe =>(
            <Recipe
            title={recipe.recipe.label}
            key={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
            />
        ))}
        </div>
      </div>
  )
}

export default App