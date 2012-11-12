var KeypadHandler = function(input) {
    
    this.input = input;
    this.listeners = [];
    
    this.createGuard();
    this.createKeypad();    
};

KeypadHandler.prototype.createGuard = function(num) {
    
    this.input.className += "guarded";
    
    this.guard = document.createElement("div");
    this.guard.style.position = "absolute";    
    this.guard.style.left = 0;
    this.guard.style.width = this.input.offsetWidth+4;
    this.guard.style.height = this.input.offsetHeight+4;
    this.guard.style.top = 0;
    this.guard.style.zIndex = 1;
    this.guard.handler = this;
    var self = this;
    this.guard.onclick = self.guardClicked;
    this.input.parentElement.appendChild(this.guard);
};

KeypadHandler.prototype.guardClicked = function(num) {
    this.handler.keypadParent.style.display = "block";
};

KeypadHandler.prototype.createKeypad = function(num) {
    this.keypadParent = document.createElement("div");
    this.keypadParent.className = "keypadParent";
    this.keypadParent.style.display = "none";
    this.keypadParent.style.left = this.input.offsetWidth + 20;
    this.keypadParent.style.top = -50;
    this.keypadParent.style.position = "absolute";
    
    this.keypad = document.createElement("div");
    this.keypad.className = "keypad";
    
    this.keypadCommand  = document.createElement("div");
    this.keypadCommand.className = "keypadCommand";
    
    this.addNumbers();
    
    
    this.input.parentElement.appendChild(this.keypadParent);
    this.keypadParent.appendChild(this.keypad);
    this.keypadParent.appendChild(this.keypadCommand);
};

KeypadHandler.prototype.addNumbers = function() {
    this.addButton(7);
    this.addButton(8);
    this.addButton(9);
    this.addButton("M");
    this.addButton(4);
    this.addButton(5);
    this.addButton(6);
    this.addButton("K");
    this.addButton(1);
    this.addButton(2);
    this.addButton(3);
    this.addButton("Enter");
    this.addButton(0);
    this.addButton(".");
};

KeypadHandler.prototype.addButton = function(num) {
    var number = document.createElement("div");
    number.className = "number";
    if (num === 0) {
        number.className = "number horizontal";
    }
    if (num === "Enter") {
        number.className = "number vertical";
    }
    var self = this;
    number.handler = this;
    number.onclick = self.numberPressed;
    number.innerHTML = num;
    if (num === "Enter" || num === "M" || num === "K") {
        this.keypadCommand.appendChild(number);
    } else {
        this.keypad.appendChild(number);
    }
};

KeypadHandler.prototype.numberPressed = function() {
    var number = this.innerHTML;
    for (var i=0; i < this.handler.listeners.length; i++) {
        this.handler.listeners[i].numberPressed(number);
    }
    
    if (number == "Enter") {
        this.handler.keypadParent.style.display = "none";
    } else {
        this.handler.input.value += number;
    }
};

KeypadHandler.prototype.addListener = function(listener) {
    this.listeners.push(listener);
};

function attachKeypadHandler() {
    var listener = {numberPressed: function(number) {console.log(number);}};
    var kph = new KeypadHandler(document.getElementById("textfield"));
    kph.addListener(listener);
}