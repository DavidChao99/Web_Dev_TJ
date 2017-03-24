
function changeColor(event) {
  var c = event.target.children;
  if(c[0]== null) {
    var s = event.target.nextElementSibling;
    var current = event.target;
    while(s == null && current != null) {
      current = current.parentNode;
      if(current != null) {
        s = current.nextElementSibling;
      }
   }
    if(s != null) {
    s.style.backgroundColor = getRandomColor();
    }
    else if(current == null) {
      console.log("HI");
      document.body.style.backgroundColor = getRandomColor();
    }
  }
  else {
    c[0].style.backgroundColor = getRandomColor();
  }

}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}