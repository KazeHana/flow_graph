/* 
 * This is triggered when you delete a connector
 * @this {ConnectorDeleteCommand} 
 * @constructor
 * @author Alex Gheorghiu <alex@scriptoid.com>
 */
function ConnectorDeleteCommand(connectorId){
    this.oType = 'ConnectorDeleteCommand';
    
    /**Any sequence of many mergeable actions can be packed by the history*/
    this.mergeable = false;
    
    this.connectorId = connectorId;
    
        
    this.firstExecute = true;
    
    
    this.connector = null;        
    this.connectionpoints = null;
    this.glues = null;
}


ConnectorDeleteCommand.prototype = {
    
    /**This method got called every time the Command must execute*/
    execute : function(){  
        if(this.firstExecute){
            //---------SAVE DATA FOR UNDO------------
            //store connector
            this.connector = CONNECTOR_MANAGER.connectorGetById(this.connectorId);
            
            //store connector's connectionpoints
            this.connectionpoints = CONNECTOR_MANAGER.connectionPointGetAllByParentIdAndType(this.connectorId, ConnectionPoint.TYPE_CONNECTOR);
            
            //store glues
            this.glues = CONNECTOR_MANAGER.glueGetBySecondConnectionPointId(this.connectorId);
            
            
            
            //do the "real job"
            CONNECTOR_MANAGER.connectorRemoveById(this.connectorId, true);
            
            selectedConnectorId = -1;
            setUpEditPanel(canvasProps);
            state = STATE_NONE;
            redraw = true;       
            
            this.firstExecute = false;
        }
        else{ //a redo
            throw "Not implemented";
        }
    },

    
    /**This method should be called every time the Command should be undone*/
    undo : function(){        
        if(this.connector){
            //add back the connecor
            CONNECTOR_MANAGER.connectors.push(this.connector);
            
            //add back the connection points
            CONNECTOR_MANAGER.connectionPoints = CONNECTOR_MANAGER.connectionPoints.concat(this.connectionpoints);
            
            //add back the glues
            CONNECTOR_MANAGER.glues  = CONNECTOR_MANAGER.glues.concat(this.glues);
            
            
            redraw = true;
        }
    }
}

