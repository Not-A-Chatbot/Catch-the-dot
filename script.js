/*****  CLASS *****/

class Dot {
  constructor(color, value, speed, column, row, HTML) {
    this.color = color;
    this.points = value;
    this.speed = speed;
    this.column = column;
    this.row = row;
    this.HTML = HTML;
    this.interval = null;
  }

  dotMove() {
    this.interval = setInterval(() => {
      this.column = Math.floor(Math.random() * 11);
      this.row = Math.floor(Math.random() * 11);
      this.HTML.style.gridColumn = `${this.column}`;
      this.HTML.style.gridRow = `${this.row}`;
    }, this.speed);
  }

  dotCatched() {
    var newPoint = document.createElement("p");
    clearInterval(this.interval);
    if (this.color === "red") {
      newPoint.classList.add("redDotCatched");
      dotsCatchedElt.appendChild(newPoint);
    } else if (this.color === "green") {
      newPoint.classList.add("greenDotCatched");
      dotsCatchedElt.appendChild(newPoint);
    } else if (this.color === "skull") {
      newPoint.classList.add("skullCatched");
      dotsCatchedElt.appendChild(newPoint);
    }
    this.speed /= 1.2;
    return this.points;
  }

  skullCatched(Dot) {
    var newSkull = document.createElement("p");
    clearInterval(this.interval);
    clearInterval(Dot.interval);
    newSkull.classList.add("skullCatched");
    dotsCatchedElt.appendChild(newSkull);
    /*this.speed /= 1.1;*/
  }
}

/*****  Common *****/
const redDotElt = document.getElementById("redDot");
const greenDotElt = document.getElementById("greenDot");
const skullElt = document.getElementById("skull");
const skullInfo = document.getElementById('skullSays');
var redDot = new Dot("red", 15, 1200, 5, 5, redDotElt);
var greenDot = new Dot("green", 10, 1500, 2, 4, greenDotElt);
var skull = new Dot("skull", -20, 1200, 6, 9, skullElt);

var pointsElt = document.getElementById("points");
var points = 0;
const dotsCatchedElt = document.getElementById("catchedDots");

function updatePoints() {
  pointsElt.innerHTML = points;
}

/***** Listen evt *****/

redDotElt.onclick = function () {
  console.log(`points before - ${points}`);
  points += redDot.dotCatched();
  console.log(`points after - ${points}`);
  redDot.dotMove();
  updatePoints();
};

greenDotElt.onclick = function () {
  console.log(`points before - ${points}`);
  points += greenDot.dotCatched();
  console.log(`points after - ${points}`);
  greenDot.dotMove();
  updatePoints();
};

skullElt.onclick = function () {
  console.log(`points before - ${points}`);
  if (points >= 20) {
    var random = Math.floor(Math.random() * 2);
    console.log(random);
    if (random > 1) {
      skull.skullCatched(redDot);
      skullInfo.textContent = `I stopped the orange dot for ya, You pay with your points, not your life this time`;
      skullInfo.classList.toggle(`skull-activated`)

      console.log(`I stopped the orange dot for ya`);
    } else {
      skull.skullCatched(greenDot);
      skullInfo.textContent = `I stopped the blue dot for ya, You pay with your points, not your life this time`;
      skullInfo.classList.toggle(`skull-activated`)
      console.log(`I stopped the blue dot for ya`);

    }

    points += skull.points;
  skullInfo.onclick = skullInfo.classList.toggle(`skull-activated`)
    console.log(`You pay with your points, not your life this time`);
  } else {
    skullInfo.textContent = `You pay with your life this time, prepare to get mad.`;
      skullInfo.classList.toggle(`skull-activated`)
    console.log(`You pay with your life this time, prepare to get mad.`);
    skullInfo.onclick = skullInfo.classList.toggle(`skull-activated`)
  }

  console.log(`points after - ${points}`);
  skull.dotMove();
  updatePoints();
};

/***** Game *****/

redDot.dotMove();
greenDot.dotMove();
skull.dotMove();
