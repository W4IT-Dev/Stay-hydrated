const waterIntakeGoalAuto = {
    parent: document.querySelector('#autoGoal'),
    radio: document.querySelector('#autoGoal .radio-container__radio'),
}
const waterIntakeGoalOwn = {
    parent: document.querySelector('#ownGoal'),
    radio: document.querySelector('#ownGoal .radio-container__radio'),
}

const weightUnit = {
    parent: document.querySelector('#weightUnitChoose'),
    value: document.querySelector('#weightUnitChoose .selected').innerText
}
const fluidUnit = {
    parent: document.querySelector('#fluidUnitChoose'),
    value: document.querySelector('#fluidUnitChoose .selected').innerText
}

const weight = document.querySelector('#weightInput')