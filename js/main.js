var KeypadHandler = function(input) {
    
    this.input = input;
    this.listeners = [];
    
    this.keypad = document.createElement("div");
    this.keypad.style.width = "150px";
    this.keypad.style.left = input.offsetWidth;
    this.keypad.style.top = "0";
    this.keypad.style.position = "absolute";
    input.parentElement.appendChild(this.keypad);
    
    //document.getElementById("quickbar");
    this.addNumbers();
};

KeypadHandler.prototype.addNumbers = function(num) {
    this.addNumber(7);
    this.addNumber(8);
    this.addNumber(9);
    this.addNumber(4);
    this.addNumber(5);
    this.addNumber(6);
    this.addNumber(1);
    this.addNumber(2);
    this.addNumber(3);
    this.addNumber(0);
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
    this.keypad.appendChild(number);
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

var kph = new KeypadHandler(document.getElementById("textfield"));
kph.addListener(listener);