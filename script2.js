

let slideIndex = 0;
        
    showSlides();

    function showSlides() {

        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
         for (i = 0; i < slides.length; i++) {
             slides[i].style.display = "none";
         }
         slideIndex++;
         if (slideIndex > slides.length) { slideIndex = 1 }
         for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
        }




        // hgcjgkihk,lgjl,

const searchBtn= document.getElementById('search-btn');
const mealList= document.getElementById('meal');
console.log(mealList);
const mealDetailsContent= document.querySelector('.meal-details-content');
const recipeCloseBtn= document.getElementById('recipe-close-btn'); 

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {//ananymous function or closure or lamda
mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//get meal list that matches with ingredients.

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response =>response.json())
    .then(data =>{
         console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                    <div class="meal-item" data-id = "${meal.
                    idMeal}">
                        <div class="meal-img meal-second-img">
                            <img src="${meal.strMealThumb}" alt="" >
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href= "#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
            
                `;              
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, We didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;

    });
    
}  

//get recipe of the meal
function getMealRecipe(e){
    console.log('meal tabed');
    console.log(e.target.classList);
    console.log(e.target.parentElement.classList);
   
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => getMealRecipeModal(data.meals));
       
    }
   
}

//create a modal//
function getMealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html= `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
             <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">  
            <a href= "${meal.strYoutube}" target= "_blank">Watch Vedio</a>
        </div>
    `;
    console.log(mealDetailsContent);
    mealDetailsContent.innerHTML = html;
    console.log(mealDetailsContent.parentElement);
    mealDetailsContent.parentElement.classList.add('showRecipe');
    console.log(mealDetailsContent.parentElement.classList);


}













