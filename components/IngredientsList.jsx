import PropTypes from 'prop-types';

export default function IngredientsList(props) {

    const ingredientsListItems = props.ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
      ));
    return (
        <section className="ingredients-container">
            <div className="ingredients-list">
                <h2>Ingredients On Hand:</h2>
                <ul>{ingredientsListItems}</ul>
            </div>
            {/* if the ingredients list is greater than 3, display the get recipe container */}
            {props.ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            )}
        </section>
    );
}

IngredientsList.propTypes = {
    ingredientsListItems: PropTypes.node.isRequired,
    ingredients: PropTypes.array.isRequired,
    getRecipe: PropTypes.func.isRequired,
};