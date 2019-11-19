
var field = [0, 0, 0,0, 0, 0,0, 0, 0];
var xWins = 0;
var oWins = 0;
var p1 = 'X wins';
var p2 = 'O wins';

function nameChange () {
  p1 = prompt('Enter X Name');
  p2 = prompt('Enter O Name');
  player1.innerHTML = p1 + ': ' + xWins;
  player2.innerHTML = p2 + ': ' + oWins;
}

function nameButton () {
  var button = document.createElement("button");
  button.setAttribute('id', "changeName");
  button.setAttribute('onClick', 'nameChange()');
  button.innerText = "CHANGE NAME";
  document.getElementById('app').appendChild(button);

}

function getName () {
  var player1 = document.createElement("div");
  var player2 = document.createElement("div");
  player1.setAttribute('id', "winX");
  player2.setAttribute('id', "winO");
  document.getElementById('players').appendChild(player1);
  document.getElementById('players').appendChild(player2);
  player1.innerHTML = p1 + ': ';
  player2.innerHTML = p2 + ': ';
};

function resetButton () {
  var button = document.createElement("button");
  button.setAttribute('id', "button");
  button.setAttribute('onClick', 'reset()');
  button.innerText = "RESET";
  document.getElementById('app').appendChild(button);
}

function renderApp () {
  getName()
  nameButton()
  var table = document.createElement("table");
  document.getElementById('app').appendChild(table);
  for (var i=0; i<3; i++) {
    var row = document.createElement("tr");
    table.appendChild(row);
    for (var j=0; j<3; j++) {
      var box = document.createElement("td");
      var index = (j+(i*3));
      box.setAttribute('id', index);
      var attr = "makeMove(" + index + ")";
      box.setAttribute('onClick', attr);
      row.appendChild(box);
    }
  }
  resetButton();
}

renderApp();

var switcher = function switcher () {
  var switcher = ['X','O'];
  var i = 1;
  return function () {
    if (i === 1) {
      i = 0;
      return switcher[i];
    } else if (i === 0){
      i = 1;
      return switcher[i];
    }
  };
}();

function makeMove(e) {

  var element = document.getElementById(e);
  element.innerHTML = switcher();
  if (element.innerHTML === 'X') {
    field[e] = 1;
  } else {
    field[e] = -1;
  }
  win(field);
  element.onclick = null;
}


var reducer = (accumulator, item) => {
  return accumulator + item;
}

var win = function (arr) {
  var win = false;
  var checkWin = [];
  var indexArr = [];
  var winningLine = []; 
  checkWin.push([arr[0],arr[4],arr[8]], [arr[2],arr[4],arr[6]]);
  indexArr.push([0, 4, 8], [2, 4, 6]);
  for (var i=0; i<3; i++) {
      checkWin.push(arr.slice(i*3,i*3+3), [arr[i],arr[i+3],arr[i+6]]);
      indexArr.push([i*3,i*3+1,i*3+2],[i,i+3,i+6]);
  }
  for (var i=0; i<checkWin.length; i++) {
    var winX = checkWin[i].reduce(reducer);
    var winY = checkWin[i].reduce(reducer);
    if (winX === 3 || winY === -3) {
      win = true;
      if (winX > 0) {
        xWins++;
        var element = document.getElementById("winX")
        element.innerHTML = p1 + ': ' + xWins;
      } else {
        oWins++;
        var element = document.getElementById("winO")
        element.innerHTML = p1 + ': ' + oWins;
      }
      winningLine = indexArr[i];
      endGame();
      break; 
    }
  }
  for (var i=0; i<winningLine.length; i++) {
    document.getElementById(winningLine[i]).style.backgroundColor = '#80ff80';
  }
  if (arr.indexOf(0) === -1 && win === false) {
    endGame();
    return alert('You both suck');
  }

};

function endGame () {
  for (var i=0; i<9; i++) {
    var element = document.getElementById(i);
    element.onclick = null;
  }
}

function reset () {
  for (var i=0; i<9; i++) {
    var element = document.getElementById(i);
    element.innerHTML = ''; 
    field[i] = 0;
    element.style.backgroundColor = null;
    var a = "makeMove(" + i + ")";
    // var a = makeMove(i);
    element.setAttribute('onClick', a);
  }
}