let classesWithColoredParents =
  /checkbox-container__input|radio-container__input|input-container__input|textarea-container__textarea|slider-container__slider/g;
let classesWithCheckboxes = /radio-container__input|checkbox-container__input/g

const callFunction = (callback, e) => {
  let element = e.target;
  //if element has any of those classes in regex then its parent will change class.
  if (element.className && element.className.match(classesWithColoredParents))
    callback(element.parentElement);
};

const blur = (element) => element.classList.remove("selected");

const focus = (element) => element.classList.add("selected");

window.addEventListener("focus", (e) => callFunction(focus, e), true);
window.addEventListener("blur", (e) => callFunction(blur, e), true);
window.addEventListener("keydown", e =>{//work on this
  if(e.key == "Enter") {
     if( document.activeElement.className && document.activeElement.className.match(classesWithCheckboxes)) document.activeElement.classList.toggle('on')
    if(document.activeElement.className.match("selector")) toggleSelectedItem(document.activeElement)
    }
})