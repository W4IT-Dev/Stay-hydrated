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
    // Calculate oz/lbs
    // Convert to ml/kg if needed
    let goal;

    // CALC NEED
    if (weightUnit.value == "lbs") {
        goal = weight.value * 0.65;//if unit is already LBS
    } else if (weightUnit.value == "kg") {
        goal = (weight.value * 2.20462).toFixed(1) * 0.65//if unit is KG
        // console.log(goal)
    }

    // CONVERT
    if (fluidUnit.value == "ml") parseInt(goal *= 29.5753);

    // if (weightUnit.value == "kg") {
    //     goal = weight.value * 32.5
    //     if (fluidUnit.value == "oz") goal *= 0.033814
    // } else if(weightUnit.value == "lbs") {
    //     goal = weight.value * 0.65
    //     if(fluidUnit.value == "ml") goal *= 29.5735
    // }
    // TODO: Calculate oz/lbs and then convert it to ml/kg; because this is too inconsitenst.
    // return goal
    waterIntakeGoalAuto.calculatedWaterIntakeDisplay.innerText = goal.toFixed(2) + fluidUnit.value;
    return goal.toFixed(1) + fluidUnit.value
}

function updateWaterIntake(amount) {
    waterIntakeToday += amount;
    //update div.glass
}

function changeUnit(unitOriginal, toUnit, inSetup) {
    unitOriginal.value = toUnit;
    if (inSetup && unitOriginal === weightUnit && !DONTSWITCH) {

        if (weightUnit.value == 'kg') {
            fluidUnit.value = 'ml';
            weight.value = (weight.value * 0.45359237).toFixed(1);
            toggleSelectedItem(fluidUnit.parent, 'ml');
        } else if (weightUnit.value == 'lbs') {
            fluidUnit.value = 'oz';
            weight.value = (weight.value * 2.20462).toFixed(1);
           toggleSelectedItem(fluidUnit.parent, 'oz');
        }
        calculateWaterIntake();
    }
}