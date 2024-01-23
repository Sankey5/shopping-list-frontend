const ADD_MEAL_BTN = document.getElementById('meal-button');
const INGREDIENT_INPUT = 'ingredientInput-';

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
                                {type: 'text', name: FOR_INGREDIENT_NUMBER});

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

function createMealForm() {
  // Create the form elements
  const form = Object.assign(document.createElement('form'), {id: 'ingredientInput'});
  // Prevent the form from submitting
  form.onsubmit = (e) => {e.preventDefault();}

  // Add the inputs of the name of the meal
  let lableMealName = Object.assign(document.createElement('label'), {for: 'mealName', innerHTML: 'Meal name: '});
  let inputMealName = Object.assign(document.createElement('input'), {id: 'mealName', name: 'mealName'});
  inputMealName.required = true;

  let divMealName = document.createElement('div');
  divMealName.appendChild(lableMealName);
  divMealName.appendChild(inputMealName);
  form.appendChild(divMealName);

  // Create all ingredient inputs
  for(ingredientIndex = 0; ingredientIndex < 5; ingredientIndex++) {
    form.appendChild(addIngredientInput(ingredientIndex));
  }
  
  // Create the button to create the meal and add to form
  let createMealBtn = Object.assign(document.createElement('button'), {innerHTML: 'Create Meal', onclick: createNewMeal});
  let deleteMealBtn = Object.assign(document.createElement('button'), {innerHTML: 'Delete Meal', onclick: deleteNewMealForm});
  form.appendChild(createMealBtn);
  form.appendChild(deleteMealBtn);

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

  let formHTMLInputList = document.querySelector('#ingredientInput');

  // Set the name based on the first input value
  mealJSON.mealName = formHTMLInputList.querySelector('#ingredientInput-0 input').value;

  formHTMLInputList = formHTMLInputList.querySelectorAll('div');
  mealJSON.ingredientsList = [];

  for(divElem = 1; divElem<formHTMLInputList.length; divElem++) {
    mealJSON.ingredientsList[divElem - 1] = {};

    for(spanElem = 0; spanElem < 3; spanElem++) {
      currElem = formHTMLInputList[divElem].childNodes[spanElem].childNodes[1];
      let currElemName;

      // if the option is selected, select option differently
      if(currElem.localName == 'select') {
        let currOption = currElem.options;
        currElemName
        //Select the option selected
        mealJSON.ingredientsList[divElem - 1][currElem.name] = currOption[currOption.selectedIndex].value;
      }
      else if (currElem.localName == 'input') {
        mealJSON.ingredientsList[divElem - 1][currElem.name] = currElem.value;
      }
    }
  }

  return mealJSON;
}

function createNewMeal() {
  // Implement adding the ingredients the meals section and moving the ingredients to the database
  // Gather meal details from form and store them locally in JSON object
  let mealJSON = createMealJSONObject();
  console.log(mealJSON);

  // Make call to API with JSON object (probably need to serialize?)

  // Validate the object is now in the database

  // Move create new table item in the meals column (maybe don't include all  data?)
  
  // Delete the form
  if(mealJSON)
    deleteNewMealForm();
}

function addMeal() {
  // Create the form to add ingredients to a new meal
  createMealForm();
  ADD_MEAL_BTN.classList.add('invisible');
}

// Add the functionality to the page
ADD_MEAL_BTN.onclick = addMeal;