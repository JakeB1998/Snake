function ToggleButton(button, toggle = true, callback) {
    this.button = button;
    this.toggle = toggle;
    this.callback = callback;
    var privateCallback = null;
   

    this.sendEvent = () => {
        if (this.callback) this.callback(this.toggle);
    }

    this.handleToggle = () => {
        this.toggle = !this.toggle;
        this.sendEvent();
    }
    
    this.activateToggle = () => {
        this.toggle = true;
        this.sendEvent();
    }

    this.deactivateToggle = () => {
        this.toggle = false;
        this.sendEvent();
    }

    this.setToggle = (toggle) => {
        this.toggle = toggle;
        this.sendEvent();
    }

    privateCallback = () => {
        this.handleToggle();
    }


    if (button) {
        button.addEventListener('click', privateCallback);
    }

}