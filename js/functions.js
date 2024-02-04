function calculateWaterIntake() {
    if (weightUnit.value == "lbs") {
        return weight.value * (2 / 3) + "oz";
    }
    return 35 * weight.value + "ml"
}