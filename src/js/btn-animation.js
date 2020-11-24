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

const printNumbers = (from, to, elementRef, interval, sufix='') => {
  let current = from;

  const inCrement = () => {
    elementRef.textContent = current+sufix;
    if (current === to) {
      return;
    }
    current += 1;
  }

  setInterval(inCrement, interval);
}

printNumbers(0, maxNumberCafe, countCafeRef, 150);
printNumbers(0, maxNumberFood, countFoodRef, 100);


/* ----------------IntersectionObserver for Number counts------------------- */

const statStatItemAray = document.querySelectorAll('[data-stat-item]');

const options = {
  // rootMargin: "-100px",
  threshold: [0.5],
};

const ioCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const maxNumber = Number.parseInt(entry.target.textContent);
      let sufix;
      if (entry.target.textContent.includes('kg')) {
         sufix = 'kg';
        }
      let from = maxNumber - 50;
      if (from < 0) { from = 0 };
      printNumbers(from, maxNumber, entry.target, 30, sufix);
      observer.unobserve(entry.target);
    }
  });
};

const intersecOb = new IntersectionObserver(ioCallback, options);
statStatItemAray.forEach(item => intersecOb.observe(item));
