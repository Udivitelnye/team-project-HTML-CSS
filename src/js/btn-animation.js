var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');

  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}

/* ---------------count script-------------------- */
const countCafeRef = document.querySelector('[data-count-cafe]');
const countFoodRef = document.querySelector('[data-count-food]');
const maxNumberCafe = Number(countCafeRef.textContent);
const maxNumberFood = Number(countFoodRef.textContent);

const printNumbers = (from, to, elementRef, interval) => {
  let current = from;

  let timerId = setInterval( () => {
      elementRef.textContent = current;
    if (current === to) {
      clearInterval(timerId);
    }
    current += 1;
  }, interval);
}

printNumbers(0, maxNumberCafe, countCafeRef, 150);
printNumbers(0, maxNumberFood, countFoodRef, 100);
/* ----------------------------------- */