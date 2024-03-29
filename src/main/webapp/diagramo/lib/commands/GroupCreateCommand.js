/**
 * It will group a set of figures
 * @this {GroupCreateCommand} 
 * @constructor
 * @param groupId {Numeric} - the id of the group
 */
function GroupCreateCommand(groupId){
    this.groupId = groupId;
    
    /**Figures ids that belong to this group*/
    this.figuresIds = STACK.figureGetIdsByGroupId(groupId);
    
    this.firstExecute = true;
    
    this.oType = "GroupCreateCommand";            
}

GroupCreateCommand.prototype = {
    
    /**This method got called every time the Command must execute.
     *The problem is that is a big difference between first execute and a "redo" execute
     **/
    execute : function(){
        
        if(this.firstExecute){ //first execute
            STACK.groupGetById(this.groupId).permanent = true; //transform this group into a permanent one
            
            this.firstExecute = false;
        } 
        else{ //a redo (group was previously destroyed)
            //create group
            var g = new Group();
            g.id = this.groupId; //copy old Id
            g.permanent = true;

            //add figures to group
            for(var i=0; i < this.figuresIds.length; i++){
                var f = STACK.figureGetById(this.figuresIds[i]);
                f.groupId = g.id;
            }
            
            var bounds = g.getBounds();
            g.rotationCoords.push(new Point(bounds[0]+(bounds[2]-bounds[0])/2, bounds[1] + (bounds[3] - bounds[1]) / 2));
            g.rotationCoords.push(new Point(bounds[0]+(bounds[2]-bounds[0])/2, bounds[1]));

            //save group to STACK
            STACK.groups.push(g);
        }
        
        state = STATE_GROUP_SELECTED;
        selectedGroupId = this.groupId;            
    },
    
    
    /**This method should be called every time the Command should be undone*/
    undo : function(){
        STACK.groupDestroy(this.groupId);
        
        selectedGroupId = -1;
        state = STATE_NONE;
    }
}

