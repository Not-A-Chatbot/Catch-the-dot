/*****  CLASS *****/

class Dot {
  constructor(color, value, speed, column, row, HTML) {
    this.color = color;
    this.points = value
    this.speed = speed
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
    var newPoint = document.createElement('p')
    clearInterval(this.interval);
    if (this.color === 'red') {
        newPoint.classList.add('redDotCatched');
        dotsCatchedElt.appendChild(newPoint);
        
    } else {
        newPoint.classList.add('greenDotCatched');
        dotsCatchedElt.appendChild(newPoint);
    }
    this.speed /= 1.2;
    return this.points;
  }
}


/*****  Common *****/
const redDotElt = document.getElementById("redDot");
const greenDotElt = document.getElementById("greenDot");
var redDot = new Dot('red', 15, 1200, 5, 5, redDotElt);
var greenDot = new Dot('green' ,10, 1500, 2, 4, greenDotElt);
var pointsElt = document.getElementById('points');
var points = 0;
const dotsCatchedElt = document.getElementById('catchedDots');


function updatePoints () {
    pointsElt.innerHTML = points;
}




/***** Listen evt *****/

redDotElt.onclick = function () {
    console.log(`points before - ${points}`);
    points += redDot.dotCatched()
    //points += redDot['points'];
    console.log(`points after - ${points}`);
    redDot.dotMove();
    updatePoints();

};

greenDotElt.onclick = function () {
    console.log(`points before - ${points}`);
    points += greenDot.dotCatched();
    //points += greenDot['points'];
    console.log(`points after - ${points}`);
    greenDot.dotMove()
    updatePoints();
};

/***** Game *****/

redDot.dotMove();
greenDot.dotMove();
