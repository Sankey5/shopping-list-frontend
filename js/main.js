const ADD_MEAL_BTN = document.getElementById('meal-button');
const INGREDIENT_INPUT = 'ingredientInput-';

// --------------- Meal Functions ---------------

function addIngredientInput(inputIdNum) {
  const FOR_INGREDIENT_NAME = 'ingredientName';
  const FOR_INGREDIENT_NUMBER = 'ingredientNumber';
  const FOR_INGREDIENT_MEASUREMENT = 'ingredientMeasurement';

  // Create the main elements
  const labelIngredientName = Object.assign(document.createElement('label'), 
                                {for: FOR_INGREDIENT_NAME, innerHTML: 'Ingredient Name: '});
  const inputIngredientName = Object.assign(document.createElement('input'), 
                                {type: 'text', name: FOR_INGREDIENT_NAME});

  const labelIngredientNumber = Object.assign(document.createElement('label'), 
                                {for: FOR_INGREDIENT_NUMBER, innerHTML: 'Amount: '});
  const inputIngredientNumber = Object.assign(document.createElement('input'), 
                                {type: 'number', step: '0.01', name: FOR_INGREDIENT_NUMBER});

  const labelIngredientMeasurement = Object.assign(document.createElement('label'), 
                                {for: FOR_INGREDIENT_MEASUREMENT, innerHTML: 'Measurement: '});
  const inputIngredientMeasurement = Object.assign(document.createElement('select'), 
                                {name: FOR_INGREDIENT_MEASUREMENT, size: '5'});


  // Add the required attribute to the inputs
  inputIngredientName.required = true;
  inputIngredientNumber.required = true;
  inputIngredientMeasurement.required = true;

  // Add options for the measurement
  let lbs = Object.assign(document.createElement('option'), {value:"lbs", innerHTML:"lbs"});
  let oz = Object.assign(document.createElement('option'), {value:"oz", innerHTML:"oz"});
  let cup = Object.assign(document.createElement('option'), {value:"cup", innerHTML:"cup"});
  let tbps = Object.assign(document.createElement('option'), {value:"tbps", innerHTML:"tbps"});
  let tsp = Object.assign(document.createElement('option'), {value:"tsp", innerHTML:"tsp"});
  inputIngredientMeasurement.appendChild(lbs);
  inputIngredientMeasurement.appendChild(oz);
  inputIngredientMeasurement.appendChild(cup);
  inputIngredientMeasurement.appendChild(tbps);
  inputIngredientMeasurement.appendChild(tsp);

  // Add the inputs to a span
  const nameSpan = document.createElement('span');
  const numSpan = document.createElement('span');
  const measSpan = document.createElement('span');
  nameSpan.appendChild(labelIngredientName);
  nameSpan.appendChild(inputIngredientName);
  numSpan.appendChild(labelIngredientNumber);
  numSpan.appendChild(inputIngredientNumber);
  measSpan.appendChild(labelIngredientMeasurement);
  measSpan.appendChild(inputIngredientMeasurement);

  // Add spans to div and return
  const retDiv = document.createElement('div');
  retDiv.setAttribute('id', INGREDIENT_INPUT + inputIdNum);
  retDiv.appendChild(nameSpan);
  retDiv.appendChild(numSpan);
  retDiv.appendChild(measSpan);
  return retDiv;
}

function addMoreIngredients(event) {
  event.preventDefault();

  let mealInputs = document.getElementById('mealInputs');
  let ingredientsToAdd = parseInt(document.getElementById('extraIngredientNumber').value);
  let currIngredients = document.getElementById('ingredientInput').querySelectorAll('div');
  let lastIngredientIndex = +currIngredients[currIngredients.length - 1].id.split("-")[1];

  if(ingredientsToAdd === null || ingredientsToAdd === NaN) {
    console.error("Ingredient amount is not valid");
    return false;
  }

  // Create all ingredient inputs
  for(ingredientIndex = 0; ingredientIndex < ingredientsToAdd; ingredientIndex++) {
    mealInputs.appendChild(addIngredientInput(ingredientIndex + lastIngredientIndex));
  }
}

function createMealForm() {
  // Create the form elements
  const form = Object.assign(document.createElement('form'), {id: 'ingredientInput'});
  // Prevent the form from submitting
  form.onsubmit = (e) => {e.preventDefault();}

  // Add the inputs of the name of the meal
  let labelMealName = Object.assign(document.createElement('label'), {for: 'mealName', innerHTML: 'Meal name: '});
  let inputMealName = Object.assign(document.createElement('input'), {id: 'mealName', name: 'mealName'});
  inputMealName.required = true;

  let divMealName = document.createElement('div');
  divMealName.appendChild(labelMealName);
  divMealName.appendChild(inputMealName);
  form.appendChild(divMealName);
  
  let mealsDiv = Object.assign(document.createElement('div'), {id: "mealInputs"});

  // Create all ingredient inputs
  for(ingredientIndex = 0; ingredientIndex < 10; ingredientIndex++) {
    mealsDiv.appendChild(addIngredientInput(ingredientIndex));
  }

  form.appendChild(mealsDiv);
  
  // Create the button to create the meal and add to form
  let createMealBtn = Object.assign(document.createElement('button'), {innerHTML: 'Create Meal', onclick: createNewMeal});
  let deleteMealBtn = Object.assign(document.createElement('button'), {innerHTML: 'Delete Meal', onclick: deleteNewMealForm});
  form.appendChild(createMealBtn);
  form.appendChild(deleteMealBtn);

  // Add the ingredient button and input
  let addIngredientBtn = Object.assign(document.createElement('button'), {innerHTML: 'Add Ingredients', onclick: (e) => {addMoreIngredients(e)}});
  let ingredientAmount = Object.assign(document.createElement('input'), {type: "number", id: 'extraIngredientNumber', name: 'mealName'});

  let ingredientSpan = Object.assign(document.createElement('span'));

  ingredientSpan.appendChild(ingredientAmount);
  ingredientSpan.appendChild(addIngredientBtn);

  form.appendChild(ingredientSpan);

  // Add the form to the bottom of the body
  document.body.append(form);
}

function deleteNewMealForm() {
  //Delete the form which was created
  document.getElementById('ingredientInput').remove();
  // Re-add the button to be able to add another meal
  ADD_MEAL_BTN.classList.remove('invisible');
}

function createMealJSONObject() {
  let mealJSON = {};

  let formHTMLInputList = document.getElementById('ingredientInput');

  // Set the name based on the first input value
  mealJSON.mealName = formHTMLInputList.querySelector('#ingredientInput input').value;

  formHTMLInputList = document.getElementById('mealInputs').querySelectorAll('div');
  mealJSON.ingredientsList = [];

  for(divElem = 1; divElem<formHTMLInputList.length; divElem++) {
    mealJSON.ingredientsList[divElem - 1] = {};

    for(spanElem = 0; spanElem < 3; spanElem++) {
      let currElem = formHTMLInputList[divElem].childNodes[spanElem].childNodes[1];

      // if the option is selected, select option differently
      if(currElem.localName == 'select') {
        let currOption = currElem.options;
        //Select the option selected
        mealJSON.ingredientsList[divElem - 1][currElem.name] = currOption[currOption.selectedIndex].value;
      }
      else if (currElem.localName == 'input') {
        if (currElem.name == "ingredientNumber")
          mealJSON.ingredientsList[divElem - 1][currElem.name] = parseFloat(currElem.value);
        else
          mealJSON.ingredientsList[divElem - 1][currElem.name] = currElem.value;
      }
    }
  }

  return mealJSON;
}

function addMealToMealTable(mealNameString) {
  let mealTable = document.getElementById('meals-table');

  // Create new row object for the meal
  let mealRow = document.createElement('tr'); // Parent
  let mealName = document.createElement('td');  // Child 1
  let mealButton = document.createElement('td');  // Child 2
  
  // Add elements to the meal name
  mealName.appendChild(Object.assign(document.createElement('h3'), {textContent: mealNameString}));
  // Add elements to the meal button
  mealButton.appendChild(Object.assign(document.createElement('button'), {innerHTML: 'Add to grocery list', onclick: (e) => {addMealToGroceryList(e)}}));

  mealRow.appendChild(mealName);
  mealRow.appendChild(mealButton);

  mealTable.appendChild(mealRow);
}

async function createNewMeal() {
  // Implement adding the ingredients the meals section and moving the ingredients to the database
  // Gather meal details from form and store them locally in JSON object
  let mealJSON = createMealJSONObject();
  console.log(mealJSON);

  // Make call to API with JSON object (probably need to serialize?)
  let recipieCreationResponse = await postData('http://brian-Ubuntu-22-PC-Q35-ICH9-2009:18080/api/recipies', mealJSON)
    .then((response) => {
      if(!response.ok) {
        alert("Failed sending recipie to the database");
        console.error("ERROR: Failed to get recipies");
        return false;
      }
      
      return true;
    })
    .catch((error) => {
      console.error("Error: ", error);
      console.log("Server is down! Cannot create meal.")
    });

  if(recipieCreationResponse)
    return false;

  console.log("Created the meal", recipieCreationResponse);

  // Create new table item in the meals column (maybe don't include all data?)

  addMealToMealTable(mealJSON["mealName"]);
  
  // Delete the form
  if(mealJSON)
    deleteNewMealForm();
}

// ------------- END Meal Functions -------------

// --------------- Ingredient Functions ---------------

function deleteIngredient(event) {
  event.srcElement.parentNode.parentNode.remove();
}

function createGroceryListItem(ingredientItem) {
  let groceryTable = document.getElementById('grocery-list');

  let ingredientRow = document.createElement('tr'); // Parent
  let ingredientName = document.createElement('td');  // Child 1
  let ingredientAmount = document.createElement('td');  // Child 2
  let deleteSection = document.createElement('td');  // Child 3

  ingredientName.appendChild(Object.assign(document.createElement('h3'), {textContent: ingredientItem.ingredientName}));
  ingredientAmount.appendChild(Object.assign(document.createElement('p'), {textContent: ingredientItem.ingredientNumber + " " + ingredientItem.ingredientMeasurement}));
  deleteSection.appendChild(Object.assign(document.createElement('button'), {innerText: "Delete", onclick: (e) => {deleteIngredient(e)}}));

  ingredientRow.appendChild(ingredientName);
  ingredientRow.appendChild(ingredientAmount);
  ingredientRow.appendChild(deleteSection);

  groceryTable.appendChild(ingredientRow);
}

function getCurrentIngredientsHashMap() {
  let ingredientHashMap = new Map();
  let ingredientList = document.getElementById('grocery-list').querySelectorAll('tr');

  for(i = 0; i < ingredientList.length; i++) {
    ingredientHashMap.set(ingredientList[i].childNodes[0].innerText);
  }

  return ingredientHashMap;
}

function addIngredientValue(ingredientName, value) {
  let ingredientList = document.getElementById('grocery-list').querySelectorAll('tr');

  for(x = 0; x < ingredientList.length; x++) {
    if(ingredientList[x].childNodes[0].innerText == ingredientName) {
      // Split the amount from the measurement
      let ingredientValue = ingredientList[x].childNodes[1].innerText.split(" ");
      // Add the value to the current value
      ingredientList[x].childNodes[1].innerText = (+ingredientValue[0] + +value) + " " + ingredientValue[1];
    }
  }
}

function addMealToGroceryList(event) {

  let mealName = event.srcElement.parentNode.parentNode.childNodes[0].childNodes[0].innerText; // There's gotta be a better way to do this

  // Get the JSON stored in local storage
  let ingredients = JSON.parse(localStorage.getItem(mealName)); 
  
  // "expensive" O(n) operations and memory where n is the number of ingredients in the list.
  ingredientHashMap = getCurrentIngredientsHashMap();

  for(i = 0; i < ingredients.length; i++) {
    let currIngredient = ingredients[i];

    if (ingredientHashMap.has(currIngredient.ingredientName)) {
      // Add ingredient to current ingredient
      addIngredientValue(currIngredient.ingredientName, currIngredient.ingredientNumber);
    }
    else {
      createGroceryListItem(ingredients[i]);
    }
  }
  
}

// ------------- END Ingredient Functions -------------

// --------------- API Calls ---------------

async function postData(url = "", data = {}) {
  const response = fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response;
}

async function getData(url = "") {
  const response = fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers':'*'
    }
  });

  return response;
}

// ------------- END API Calls -------------

// --------------- Misc Helper Functions -------------

function addMeal() {
  // Create the form to add ingredients to a new meal
  createMealForm();
  ADD_MEAL_BTN.classList.add('invisible');
}

// ------------- END Misc Helper Functions -----------

// --------------- On Load Calls ---------------

async function fillMealsTable() {
  // Get all recipies

  let meals = await getData('http://brian-Ubuntu-22-PC-Q35-ICH9-2009:18080/api/recipies')
    .then((response) => {
      console.log(response);

      if(!response.ok) {
        alert("Failed sending recipie to the database");
        console.error("ERROR: Failed to get recipies");
        return false;
      }
      
      return response.json();
    })
    .catch((error) => {
      console.error("Error: ", error);
      console.log("Server is down! Cannot get meals.")
    });

  console.log(meals);
  
  for(i = 0; i < meals.data.length; i++) {
    let currMeal = meals.data[i];

    addMealToMealTable(currMeal.mealName);

    localStorage.setItem(currMeal.mealName, JSON.stringify(currMeal.ingredientsList));
  }
}
// ------------- END On Load Calls -------------

// ------------- "Main" -----------

// Add the functionality to the page
ADD_MEAL_BTN.onclick = addMeal;

fillMealsTable();