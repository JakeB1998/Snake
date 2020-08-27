/**
 * Constructor Object
 */
function BindingEvents(){
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.xDir = -1;
        this.yDir = 0;

        document.onkeydown = function(e){
            console.log(e.which); 
            switch(e.which){
               
                case 37: // left
               this.reset();
                this.left = true;
                this.xDir = -1;
                this.yDir = 0;
                break;
        
                case 38: // up
                this.reset();
                this.up = true;
                this.yDir = -1;
                this.xDir = 0;
                break;
        
                case 39: // right
               this.reset();
                this.right = true;
                this.xDir = 1;
                this.yDir = 0;
            
                break;
        
                case 40: // down
                
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