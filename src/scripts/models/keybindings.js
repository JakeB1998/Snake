/**
 * Constructor Object
 */
function BindingEvents() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.xDir = -1;
        this.yDir = 0;

        document.onkeydown = function(e){
            console.log(e.code); 
            switch(e.code){
               
                case 'KeyA':
                    this.reset();
                    this.left = true;
                    this.xDir = -1;
                    this.yDir = 0;
                    break;

                case 'ArrowLeft':
                    this.reset();
                    this.left = true;
                    this.xDir = -1;
                    this.yDir = 0;
                    break;
        
                case 'KeyW': 
                    this.reset();
                    this.up = true;
                    this.yDir = -1;
                    this.xDir = 0;
                    break;

                case 'ArrowUp':
                    this.reset();
                    this.up = true;
                    this.yDir = -1;
                    this.xDir = 0;
                    break;
        
                case 'KeyD': 
                    this.reset();
                    this.right = true;
                    this.xDir = 1;
                    this.yDir = 0;
                    break;

                case 'ArrowRight': 
                    this.reset();
                    this.right = true;
                    this.xDir = 1;
                    this.yDir = 0;
                    break;

                case 'KeyS': 
                    this.reset();
                    this.down = true;
                    this.yDir = 1;
                    this.xDir = 0;
                    break;
                
                case 'ArrowDown': 
                    this.reset();
                    this.down = true;
                    this.yDir = 1;
                    this.xDir = 0;
                    break;
        
                default: return;
            }
        }.bind(this);

    this.reset = () => {
        this.xDir = 0;
        this.yDir = 0;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        
    }
  

    this.findVector = () => {
        var xDir = this.xDir;
        var yDir = this.yDir
    
        return {xDir,yDir}
    }
}