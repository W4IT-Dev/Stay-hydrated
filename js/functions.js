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
    else fluidUnit.value = parentElement.querySelector('.item.selected').innerText, changeUnit(fluidUnit, fluidUnit.value), calculateWaterIntake();
}

function calculateWaterIntake() {
    let goal;
    if (weightUnit.value == "kg") {
        goal = weight.value * 32.5
        if (fluidUnit.value == "oz") goal *= 0.033814
    } else if(weightUnit.value == "lbs") {
        goal = weight.value * 0.65
        if(fluidUnit.value == "ml") goal *= 29,5735
    }
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
    if (inSetup && unitOriginal === weightUnit) {

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