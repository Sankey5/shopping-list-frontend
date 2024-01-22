const ADD_MEAL_BTN = document.getElementById('meal-button');


// function createMeal() {
//   let mealTable = document.querySelectorAll('#meals-table>table>tbody>tr');

//   // Get the number of the last meal
//   const lastMealText = mealTable[mealTable.length - 1].querySelector('td').textContent;
//   const lastMealNum = lastMealText[lastMealText.length - 1];

//   // Create the new elements
//   let newRow = document.createElement('tr');
//   let newData = document.createElement('td');
  
//   // Append them together
//   newData.appendChild(document.createTextNode('Meal ' + (+lastMealNum + 1)));
//   newRow.appendChild(newData);
  
//   // Add it to the list
//   mealTable[0].parentNode.append(newRow);
// }

function addIngredientInput() {
  const FOR_INGREDIENT_NAME = 'ingredientName';
  const FOR_INGREDIENT_NUMBER = 'ingredientNumber';
  const FOR_INGREDIENT_MEASUREMENT = 'ingredientMeasurement';

  // Create the main elements
  const labelIngredientName = Object.assign(document.createElement('label'), 
                                {type: 'text', for: FOR_INGREDIENT_NAME, innerHTML: 'Ingredient Name: '});
  const inputIngredientName = Object.assign(document.createElement('input'), 
                                {name: FOR_INGREDIENT_NAME});

  const labelIngredientNumber = Object.assign(document.createElement('label'), 
                                {type: 'text', for: FOR_INGREDIENT_NUMBER, innerHTML: 'Amount: '});
  const inputIngredientNumber = Object.assign(document.createElement('input'), 
                                {name: FOR_INGREDIENT_NUMBER});

  const labelIngredientMeasurement = Object.assign(document.createElement('label'), 
                                {type: 'text', for: FOR_INGREDIENT_MEASUREMENT, innerHTML: 'Measurement: '});
  const inputIngredientMeasurement = Object.assign(document.createElement('input'), 
                                {name: FOR_INGREDIENT_MEASUREMENT});

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

  // Add the two sections to a div
  const nameSpan = document.createElement('span');
  const numSpan = document.createElement('span');
  const measSpan = document.createElement('span');
  nameSpan.appendChild(labelIngredientName);
  nameSpan.appendChild(inputIngredientName);
  numSpan.appendChild(labelIngredientNumber);
  numSpan.appendChild(inputIngredientNumber);
  measSpan.appendChild(labelIngredientMeasurement);
  measSpan.appendChild(inputIngredientMeasurement);

  // Add to div and return
  const retDiv = document.createElement('div');
  retDiv.appendChild(nameSpan);
  retDiv.appendChild(numSpan);
  retDiv.appendChild(measSpan);
  return retDiv;
}

function createMealForm() {
  // Create the form elements
  const form = document.createElement('form');
  form.setAttribute('id', 'ingredientInput');
  form.appendChild(addIngredientInput());
  
  // Create the button and add to form
  let createMealBtn = document.createElement('button');
  createMealBtn.appendChild(document.createTextNode('Create Meal'));
  //createMealBtn.onclick();
  form.appendChild(createMealBtn);

  // Add the form to the bottom of the body
  document.body.append(form);
}

function deleteMealForm() {
  return null;
}

function addMeal() {
  // Create the form to add ingredients to a new meal
  createMealForm();
}

// Add the functionality to the page
ADD_MEAL_BTN.onclick = addMeal;