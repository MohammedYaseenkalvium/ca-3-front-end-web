

const randomAPI = "https://www.themealdb.com/api/json/v1/1/random.php"

async function updateRandom(){
   try{
    const response = await axios.get(randomAPI);
    const meals = response.data.meals;
    console.log(meals)

    if(meals && meals.length>0){
        const randomMeal = meals[0].strMeal;
        const randomImage = meals[0].strMealThumb;

        document.getElementById("randomness").src = randomImage;
        document.getElementById("randomname").innerText = randomMeal
    }
 
   } 
   catch(error){
    console.error('Error fetching random meals:', error);
   }
}

updateRandom()
async function searchMeal() {
    
    const mealName = document.getElementById('Search').value;

   
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`;

    try{
        const response = await axios.get(apiUrl);
        const meals = response.data.meals;
        console.log(meals.length)
        document.querySelector(".searchres").innerHTML=meals.length

        
        updateSearchResults(meals);

    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}


function updateSearchResults(meals) {
    // Get the cards container
    const cardsContainer = document.getElementById('cards');
    ``
    // Clear previous search results
    cardsContainer.innerHTML = '';

    // Update with new search results
    if (meals && meals.length > 0) {
        meals.forEach(meal => {
            const card = createMealCard(meal);
            cardsContainer.appendChild(card);
        });
    } else {
        cardsContainer.innerHTML = '<p>No results found</p>';
    }
}

// Add this function to your existing JavaScript code
function createMealCard(meal) {
    const card = document.createElement('div');
    card.id = 'card';

    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.id = 'img';

    const foodName = document.createElement('p');
    foodName.id = 'foodname';
    foodName.innerText = meal.strMeal;

    const tryButton = document.createElement('button');
    tryButton.innerText = 'Try it now';
    tryButton.onclick = () => openModal(meal);

    card.appendChild(img);
    card.appendChild(foodName);
    card.appendChild(tryButton);

    return card;
}
function openModal(meal) {
    document.getElementById('mymodal').style.display = 'flex';

    // Display modal content
    const modalImg = document.getElementById('modalimg');
    const modalDetails = document.getElementById('modals');
    const ingredientsList = document.getElementById('ingredients-list');

    modalImg.src = meal.strMealThumb;
    modalDetails.innerText = meal.strInstructions;

    // Display ingredients
    ingredientsList.innerHTML = ''; // Clear previous content
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
            const listItem = document.createElement('li');
            listItem.innerText = `${ingredient}: ${measure}`;
            ingredientsList.appendChild(listItem);
        }
    }
}
function createMealCard(meal) {
    const card = document.createElement('div');
    card.id = 'card';

    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.id = 'img';

    const foodName = document.createElement('p');
    foodName.id = 'foodname';
    foodName.innerText = meal.strMeal;

    const tryButton = document.createElement('button');
    tryButton.innerText = 'Try it now';
    tryButton.onclick = () => openModal(meal);

    card.appendChild(img);
    card.appendChild(foodName);
    card.appendChild(tryButton);

    return card;
}
function closeModal() {
    document.getElementById('mymodal').style.display = 'none';
}
