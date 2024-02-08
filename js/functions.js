let DONTSWITCH = false;

function toggleSelectedItem(parentElement, changeTo) {
    let items = parentElement.querySelectorAll('.item')
    if (changeTo) {
        if (changeTo == 'kg' || changeTo == 'lbs') {
            if (parentElement.querySelector('.item.selected').innerText != changeTo) {
                items.forEach(item => {
                    item.classList.toggle('selected');
                });
            }
        } else {
            if (parentElement.querySelector('.item.selected').innerText != changeTo) {
                items.forEach(item => {
                    item.classList.toggle('selected');
                });
            }
        }
    } else {
        items.forEach(item => {
            item.classList.toggle('selected');
        });
    }
    if (parentElement === weightUnit.parent) weightUnit.value = parentElement.querySelector('.item.selected').innerText, changeUnit(weightUnit, weightUnit.value, true);
    else DONTSWITCH = true, fluidUnit.value = parentElement.querySelector('.item.selected').innerText, changeUnit(fluidUnit, fluidUnit.value), calculateWaterIntake();
}

function calculateWaterIntake() {
    // Calculate ml/lbs
    // Convert to oz/lbs if needed
    let goal;

    // CALC NEED
    if (weightUnit.value == "kg") {
        goal = weight.value * 32.5;//if unit is already LBS
    } else if (weightUnit.value == "lbs") {
        goal = (weight.value * 0.45359237) * 32.5;
        // goal = (weight.value * 2.20462).toFixed(1) * 0.65//if unit is KG
        // console.log(goal)
    }

    // CONVERT
    if (fluidUnit.value == "oz") parseInt(goal *= 0.033814);

    // if (weightUnit.value == "kg") {
    //     goal = weight.value * 32.5
    //     if (fluidUnit.value == "oz") goal *= 0.033814
    // } else if(weightUnit.value == "lbs") {
    //     goal = weight.value * 0.65
    //     if(fluidUnit.value == "ml") goal *= 29.5735
    // }
    // TODO: Calculate ml/kg and then convert it to oz/lbs; because this is too inconsitenst.
    // return goal
    waterIntakeGoalAuto.calculatedWaterIntakeDisplay.innerText = goal.toFixed(1) + fluidUnit.value;
    return goal.toFixed(1) + fluidUnit.value
}

function updateWaterIntake(amount) {
    waterIntakeToday += amount;
    //update div.glass
}

function changeUnit(unitOriginal, toUnit, inSetup) {
    unitOriginal.value = toUnit;
    if (inSetup && unitOriginal === weightUnit) {

        if (weightUnit.value == 'kg') {
            if (!DONTSWITCH) fluidUnit.value = 'ml', toggleSelectedItem(fluidUnit.parent, 'ml');
            weight.value = (weight.value * 0.45359237).toFixed(1);

        } else if (weightUnit.value == 'lbs') {
            if (!DONTSWITCH) fluidUnit.value = 'oz', toggleSelectedItem(fluidUnit.parent, 'oz');
            weight.value = (weight.value * 2.20462).toFixed(1);

        }
    }
    calculateWaterIntake();
}