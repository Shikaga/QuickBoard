var KeypadHandler = function() {
    this.listeners = [];
};

KeypadHandler.prototype.addNumber = function(num) {
    var number = document.createElement("div");
    number.className = "number";
    if (num === 0) {
        number.className = "number zero";
    }
    var self = this;
    number.handler = this;
    number.onclick = self.numberPressed;
    number.innerHTML = num;
    document.getElementById("quickbar").appendChild(number);
};

KeypadHandler.prototype.numberPressed = function() {
    var number = this.innerHTML;
    for (var i=0; i < this.handler.listeners.length; i++) {
        this.handler.listeners[i].numberPressed(number);
    }
};

KeypadHandler.prototype.addListener = function(listener) {
    this.listeners.push(listener);
};

var listener = {numberPressed: function(number) {console.log(number);}};

var kph = new KeypadHandler();
kph.addListener(listener);

kph.addNumber(7);
kph.addNumber(8);
kph.addNumber(9);
kph.addNumber(4);
kph.addNumber(5);
kph.addNumber(6);
kph.addNumber(1);
kph.addNumber(2);
kph.addNumber(3);
kph.addNumber(0);
