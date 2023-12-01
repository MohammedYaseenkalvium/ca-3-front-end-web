
const randomAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';

let foodId;

async function updateRandom() {
    try {
        const response = await axios.get(randomAPI);
        const meals = response.data.meals;
        console.log(meals);

        if (meals && meals.length > 0) {
            const randomMeal = meals[0].strMeal;
            const randomImage = meals[0].strMealThumb;
            foodId = meals[0].idMeal; // Assign value to foodId

            document.getElementById("randomness").src = randomImage;
            document.getElementById("randomname").innerText = randomMeal;
        }
       

        // Fetch data based on the retrieved random meal
        await fetchData();
    } catch (error) {
        console.error('Error fetching random meals:', error);
    }
}

updateRandom();

async function searchMeal() {
    const mealName = document.getElementById('Search').value;

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`;

    try {
        const response = await axios.get(apiUrl);
        const meals = response.data.meals;
        console.log(meals.length);
        document.querySelector(".searchres").innerHTML = meals.length;

        updateSearchResults(meals);

    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

function updateSearchResults(meals) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    if (meals && meals.length > 0) {
        meals.forEach(meal => {
            const card = createMealCard(meal);
            cardsContainer.appendChild(card);
        });
    } else {
        cardsContainer.innerHTML = '<p>No results found</p>';
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
    tryButton.onclick = () => {
        // Pass the meal details to openModal
        openModal(meal.idMeal, meal.strMeal, meal.strMealThumb, meal.strYoutube);
    };

    card.appendChild(img);
    card.appendChild(foodName);
    card.appendChild(tryButton);

    return card;
}

async function fetchData() {
    try {
        const foodurl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
        let res = await axios.get(foodurl);
        let data = await res.data.meals;
        console.log("data", data);
        let output = "";

        data.forEach((element) => {
            output += createModal(element);
        });

        document.getElementById("mymodal").innerHTML = output;
    } catch (error) {
        console.log("error:", error);
    }
}

function createModal(element) {
    let ingredientsList = "";
    // Run a loop to populate the ingredients list
    for (let i = 1; i <= 20; i++) {
        const ingredient = element[`strIngredient${i}`];
        const measurement = element[`strMeasure${i}`];

        // Check if both ingredient and measurement exist
        if (ingredient && measurement) {
            ingredientsList += `<li>${measurement} ${ingredient}</li>`;
        }
    }

    let card = `
        <div class="modal-content">
            <img id="modalimg" src="${element.strMealThumb}" alt="">
            <div class="heading-ingredient space-between">
                <h3 class="modal-header">${element.strMeal} Ingredients</h3>
                <ul id="ing-list" class="ing-list">
                    ${ingredientsList}
                </ul>
            </div>
            <a id="youtube-btn" href="${element.strYoutube}" target="_blank">Watch on YouTube</a>
        </div>
        `;

    return card;
}


function openModal(id, name, image, youtube) {
    foodId = id; // Update the foodId for the new meal
    document.getElementById("modalimg").src = image;
    document.querySelector('.modal-header').innerText = `${name} Ingredients`;

    // Fetch and update data for the new meal
    fetchData().then(() => {
        document.getElementById("youtube-btn").href = youtube;
        document.querySelector('.modal').style.display = 'block';
    });
}
window.addEventListener('click', (event) => {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        closeModal();
    }
});
function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}