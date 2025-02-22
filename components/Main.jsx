import { useState , useRef, useEffect} from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai"

// import dotenv from "dotenv"
// dotenv.config();


export const Main = () => {
  // const ingredients = ["Chicken", "Oregano", "Tomatoes"]
  const [ingredients, setIngredients] = useState([]);

  function submitForm(formData) {
    let newIngredient = formData.get("ingredient");

    newIngredient =
      newIngredient.charAt(0).toUpperCase() +
      newIngredient.slice(1).toLowerCase(); // Capitalize the first letter of the ingredient

    // if the ingredient is not in the list, add it to the list
    if (!ingredients.includes(newIngredient)) {
      if (newIngredient.trim() === "") {
        alert("Please enter an ingredient");
        // if the ingredient is empty, alert the user
      } else {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          newIngredient,
        ]);
        // if the ingredient is not empty, add it to the list
      }
    }
  }

  const [recipe, setRecipe] = useState("");
  const recipeSection = useRef(null)

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
      window.scroll({
          top: yCoord,
          behavior: "smooth"
      })
    }
}, [recipe])
  
// Function to get recipe from ai
  async function getRecipe() {
        setRecipe("Loading..."); // Show loader
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients);
            setRecipe(recipeMarkdown);
        } catch (error) {
            console.log(error.message)
            alert("An error occurred while fetching the recipe");
            setRecipe(""); // Remove loader on error
        }
  }

  return (
    <main>
      <form className="add-ingredient-form" action={submitForm}>
        <input
          name="ingredient"
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g oregano (Minimum 4)"
        />
        <button type="submit">+ Add Ingredient</button>
      </form>

      {/* if the ingredients list is not empty, display the section */}
      {ingredients.length > 0 && 
        <IngredientsList getRecipe={getRecipe} ingredients={ingredients} />
      }

      {/* when we click on get a recipe btn, only then it is shown */}
      {recipe && <ClaudeRecipe recipe={recipe}  ref={recipeSection} />}
    </main>
  );
};