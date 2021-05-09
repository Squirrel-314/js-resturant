var tiles = document.querySelectorAll(".tile");
var layout = {
   plot1: tiles[0],
   plot1Road: false,
   plot2: tiles[1],
   plot2Road: true,
   plot3: tiles[2],
   plot3Road: false,
   plot4: tiles[3],
   plot4Road: false,
   plot5: tiles[4],
   plot5Road: true,
   plot6: tiles[5],
   plot6Road: true,
   plot7: tiles[6],
   plot7Road: true,
   plot8: tiles[7],
   plot8Road: true,
   plot9: tiles[8],
   plot9Road: true,
   plot10: tiles[9],
   plot10Road: true,
   plot11: tiles[10],
   plot11Road: false,
   plot12: tiles[11],
   plot12Road: false,
   plot13: tiles[12],
   plot13Road: false,
   plot14: tiles[13],
   plot14Road: true,
   plot15: tiles[14],
   plot15Road: false,
   plot16: tiles[15],
   plot16Road: true,
   plot17: tiles[16],
   plot17Road: true,
   plot18: tiles[17],
   plot18Road: true,
   plot19: tiles[18],
   plot19Road: true,
   plot20: tiles[19],
   plot20Road: true,
   plot21: tiles[20],
   plot21Road: false,
   plot22: tiles[21],
   plot22Road: true,
   plot23: tiles[22],
   plot23Road: false,
   plot24: tiles[23],
   plot24Road: true,
   plot25: tiles[24],
   plot25Road: false,
}
var bobLocation = 2;
var bob = document.querySelector(".bob");
var nextLocation;
var lastLocation;
var aboveLocation;
var belowLocation;

function updateLocation() {
   nextLocation = bobLocation + 1;
   lastLocation = bobLocation - 1;
   aboveLocation = bobLocation - 5;
   belowLocation = bobLocation + 5;
}

// switch (expression) {
//   case value1:
//     //Statements executed when the
//     //result of expression matches value1
//     [break;]
//   case value2:
//     //Statements executed when the
//     //result of expression matches value2
//     [break;]
//   ...
//   case valueN:
//     //Statements executed when the
//     //result of expression matches valueN
//     [break;]
//   [default:
//     //Statements executed when none of
//     //the values match the value of the expression
//     [break;]]
// }

function tileDeco() {
   for (i = 0; i < tiles.length; i++) {
       let num = i;
       function whichSides() {
          let sides = { next: null, last: null, above: null, below: null, }
          if (num < 24) { tiles[num + 1].classList.contains("road") ? sides.next = true : sides.next = false; }
          else { sides.next = false; }
          if (num > 0) { tiles[num - 1].classList.contains("road") ? sides.last = true : sides.last = false; }
          else { sides.last = false; }
          if (num > 5) { tiles[num - 5].classList.contains("road") ? sides.above = true : sides.above = false; }
          else { sides.above = false; }
          if (num < 20) { tiles[num + 5].classList.contains("road") ? sides.below = true : sides.below = false; }
          else { sides.below = false; }
          return sides;
       }


// To do:
// Rest of images
// No nest or last if new line

      if (tiles[i].classList.contains("weed")) {
         tiles[i].style.backgroundImage = "url(Images/hedge.png)";
      }
      // Four Sides
      else if (whichSides().next === true && whichSides().last === true && whichSides().above === true && whichSides().below === true) {
        tiles[i].style.backgroundImage = "url(Images/inter-four.png)";
      }
      // Three Sides
      else if (whichSides().next === true && whichSides().last === true && whichSides().below === true) {
        tiles[i].style.backgroundImage = "url(Images/three-down.png)";
      }
      else if (whichSides().next === true && whichSides().last === true && whichSides().above === true) {
        tiles[i].style.backgroundImage = "url(Images/three-up.png)";
      }
      else if (whichSides().next === true && whichSides().above === true && whichSides().below === true) {
        tiles[i].style.backgroundImage = "url(Images/three-right.png)";
      }
      else if (whichSides().last === true && whichSides().above === true && whichSides().below === true) {
        tiles[i].style.backgroundImage = "url(Images/three-left.png)";
      }
      // Corners
      else if (whichSides().below === true && whichSides().left === true) {
        tiles[i].style.backgroundImage = "url(Images/corner-1.png)";
      }
      else if (whichSides().below === true && whichSides().right === true) {
        tiles[i].style.backgroundImage = "url(Images/corner-2.png)";
      }
      else if (whichSides().above === true && whichSides().left === true) {
        tiles[i].style.backgroundImage = "url(Images/corner-3.png)";
      }
      else if (whichSides().above === true && whichSides().right === true) {
        tiles[i].style.backgroundImage = "url(Images/corner-4.png)";
      }
      // Two sides
      else if (whichSides().next === true && whichSides().last === true) {
        tiles[i].style.backgroundImage = "url(Images/road-hor.png)";
      }
      else if (whichSides().above === true && whichSides().below === true) {
        tiles[i].style.backgroundImage = "url(Images/road-ver.png)";
      }
      // One Side
      else if (whichSides().above === true) {
        tiles[i].style.backgroundImage = "url(Images/end-bottom.png)";
      }
      else if (whichSides().below === true) {
        tiles[i].style.backgroundImage = "url(Images/end-top.png)";
      }
      else if (whichSides().next === true) {
        tiles[i].style.backgroundImage = "url(Images/end-left.png)";
      }
      else if (whichSides().last === true) {
        tiles[i].style.backgroundImage = "url(Images/end-right.png)";
      }
      // Otherwise
      else { tiles[i].style.backgroundImage = ""; }
   }
}

function changeTileType(element) {
   if (element.classList.contains("weed")) { element.classList.remove('weed'); element.classList.add('road'); }
   else { element.classList.remove('road'); element.classList.add('weed'); }
}

updateLocation();
setInterval(()=> { updateLocation(); moveTo(findRoad()); tileDeco(); }, 1000)

function moveTo(num) {
   setTimeout(()=> { layout["plot" + num].appendChild(bob); }, 500)
   bobLocation = num;
}

function findRoad() {
   function checkIf(num) {
      if (bobLocation === num[0] || bobLocation === num[1] || bobLocation === num[2] || bobLocation === num[3] || bobLocation === num[4]) { return false; }
      else { return true; }
   }
   let avalibleRoads = [];

   if (checkIf([5, 10, 15, 20, 25])) {
      if (layout["plot" + nextLocation].classList.contains("road")) { avalibleRoads.push(nextLocation); }
   }
   if (checkIf([1, 6, 11, 16, 21])) {
      if (layout["plot" + lastLocation].classList.contains("road")) { avalibleRoads.push(lastLocation); }
   }
   if (bobLocation >= 6) {
      if (layout["plot" + aboveLocation].classList.contains("road")) { avalibleRoads.push(aboveLocation); }
   }
   if (bobLocation <= 20) {
      if (layout["plot" + belowLocation].classList.contains("road")) { avalibleRoads.push(belowLocation); }
   }

   var path = avalibleRoads[Math.floor(Math.random() * avalibleRoads.length)];
   if (path == null) { return bobLocation; }
   return path;
}
