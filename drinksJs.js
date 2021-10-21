
function drinkTemplate(drink){
    return `
        <div class="drink">
            <h2>${drink.strDrink} <span>(${drink.strCategory})</span></h2>
            <div class="left">
                <img class="drinkImg" src="${drink.strDrinkThumb}">                
            </div>
            <div class="right">
                <p><span class="boldTitle">Glasstype for serving: </span>${drink.strGlass}</p>
                <p><span class="boldTitle">Ingredients for making <span class="italic">${drink.strDrink}:</span></span><br>                        
                    <div id="ingredientList">
                        <ul>${getIngredients(drink)}
                        </ul>
                    </div>
                </p>
                <p id="instructions"><span class="boldTitle">Instructions:</span> <br>${drink.strInstructions}</p>
                <p><i>Enjoy!</i></p>
            </div>
        </div>
    `;
}

function getIngredientsTest(){
    const ingredientArray = ['Red wine','Lime', 'Lemon', 'Ice', 'Juice'];      
    console.log("Size: " + ingredientArray.length);

    let ingredientItem = "";
    ingredientArray.forEach(myFunction);
    return ingredientItem;    

    function myFunction(value) {
        ingredientItem += "<li>" + value + "</li>"; 
    }
}

function getIngredients(drink){
    console.log("getIngredients() is called!");
    
    // array with empty/null items
    const ingredientArray = [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10, drink.strIngredient11, drink.strIngredient12, drink.strIngredient13, drink.strIngredient14, drink.strIngredient15];      
    console.log("Size: " + ingredientArray.length);

    // use filter() array method and return the item which is being looped
    const newIngredientArray = ingredientArray.filter((a) => a);
    console.log("null values removed, new length is: "+ newIngredientArray.length);

    let ingredientItem = "";
    newIngredientArray.forEach(myFunction);
    return ingredientItem;    

    function myFunction(value) {
        ingredientItem += "<li>" + value + "</li>"; 
    }
}

async function getDrink(){
    var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    var userSearchValue = document.getElementById("searchInput").value;
    console.log("User searched for: " + userSearchValue);
    const api_url = apiUrl + userSearchValue;
    console.log(api_url);

    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    /* ErrorHandling if response is null */
    if(Object.entries(response).length === 0){
        console.log("No results found. - JSON return null");
        document.getElementById("drinksContainer").innerHTML = `
            <div class="errorHandlingWrapper">
                <h1>No results, please try another keyword.</h1>
                <p>We're sorry, but the word you are searching for is not in our database yet.</p>
            </div>
        `;
    }

    /* 'Extract' objects attributes from JSON in console.log */
    console.log("idDrink " + data.drinks[0].idDrink);
    console.log("strDrink " + data.drinks[0].strDrink);
    console.log("strCategory " + data.drinks[0].strCategory);
    console.log("strIngredient1 " + data.drinks[0].strIngredient1);

    /* Display as JSON in HTML */
        /*results*/
        document.getElementById("results").innerHTML = `
                <span class="title">Drinks (${data.drinks.length} results)</span>
        `;

    /*drink template generated*/
    /* map() returns a new array. Runs annonymous function for every elements of the current array (drinks array).
    join() removes the seperators (,) from the code */
    document.getElementById("drinksContainer").innerHTML = `
        ${data.drinks.map(drinkTemplate).join('')} 
    `;
}

