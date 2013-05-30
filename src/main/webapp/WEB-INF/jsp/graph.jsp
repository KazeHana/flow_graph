<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<title>demo</title>
<script type="text/javascript" src="../diagramo/assets/javascript/dropdownmenu.js"></script> 

<link rel="stylesheet" media="screen" type="text/css" href="../diagramo/assets/css/style.css" />
<link rel="stylesheet" media="screen" type="text/css" href="../diagramo/assets/css/minimap.css" />

<script type="text/javascript" src="../diagramo/assets/javascript/json2.js"></script>
<script type="text/javascript" src="../diagramo/assets/javascript/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../diagramo/assets/javascript/ajaxfileupload.js"></script>

<link type='text/css' href='../diagramo/assets/simplemodal/css/diagramo.css' rel='stylesheet' media='screen' />
<script type="text/javascript" src="../diagramo/assets/simplemodal/js/jquery.simplemodal.js"></script>

<script type="text/javascript" src="../diagramo/lib/canvasprops.js"></script>
<script type="text/javascript" src="../diagramo/lib/style.js"></script>
<script type="text/javascript" src="../diagramo/lib/primitives.js"></script>
<script type="text/javascript" src="../diagramo/lib/ImageFrame.js"></script>
<script type="text/javascript" src="../diagramo/lib/matrix.js"></script>
<script type="text/javascript" src="../diagramo/lib/util.js"></script>
<script type="text/javascript" src="../diagramo/lib/key.js"></script>
<script type="text/javascript" src="../diagramo/lib/groups.js"></script>
<script type="text/javascript" src="../diagramo/lib/stack.js"></script>
<script type="text/javascript" src="../diagramo/lib/connections.js"></script>
<script type="text/javascript" src="../diagramo/lib/connectionManagers.js"></script>
<script type="text/javascript" src="../diagramo/lib/handles.js"></script>

<script type="text/javascript" src="../diagramo/lib/builder.js"></script>        
<script type="text/javascript" src="../diagramo/lib/text.js"></script>
<script type="text/javascript" src="../diagramo/lib/log.js"></script>
<script type="text/javascript" src="../diagramo/lib/text.js"></script>
<script type="text/javascript" src="../diagramo/lib/browserReady.js"></script>
<script type="text/javascript" src="../diagramo/lib/containers.js"></script>
<script type="text/javascript" src="../diagramo/lib/main.js"></script>

<script type="text/javascript" src="../diagramo/lib/sets/basic/basic.js"></script>
<script type="text/javascript" src="../diagramo/lib/sets/experimental/experimental.js"></script>
<script type="text/javascript" src="../diagramo/lib/sets/network/network.js"></script>
<script type="text/javascript" src="../diagramo/lib/sets/secondary/secondary.js"></script>
<script type="text/javascript" src="../diagramo/lib/sets/statemachine/statemachine.js"></script>

<script type="text/javascript" src="../diagramo/lib/minimap.js"></script>

<script type="text/javascript" src="../diagramo/lib/commands/History.js"></script>

<script type="text/javascript" src="../diagramo/lib/commands/FigureCreateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/FigureCloneCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/FigureTranslateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/FigureRotateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/FigureScaleCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/FigureZOrderCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/FigureDeleteCommand.js"></script>

<script type="text/javascript" src="../diagramo/lib/commands/GroupRotateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/GroupScaleCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/GroupCreateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/GroupCloneCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/GroupDestroyCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/GroupDeleteCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/GroupTranslateCommand.js"></script>

<script type="text/javascript" src="../diagramo/lib/commands/ContainerCreateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/ContainerDeleteCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/ContainerTranslateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/ContainerScaleCommand.js"></script>

<script type="text/javascript" src="../diagramo/lib/commands/ConnectorCreateCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/ConnectorDeleteCommand.js"></script>                                
<script type="text/javascript" src="../diagramo/lib/commands/ConnectorAlterCommand.js"></script>

<script type="text/javascript" src="../diagramo/lib/commands/ShapeChangePropertyCommand.js"></script>

<script type="text/javascript" src="../diagramo/lib/commands/CanvasChangeColorCommand.js"></script>
<script type="text/javascript" src="../diagramo/lib/commands/CanvasChangeSizeCommand.js"></script>

<script type="text/javascript" src="../diagramo/assets/javascript/colorPicker_new.js"></script>
<link rel="stylesheet" media="screen" type="text/css" href="../diagramo/assets/css/colorPicker_new.css" />

<!--[if IE]>
<script src="../diagramo/assets/javascript/excanvas.js"></script>
<![endif]-->
</head>
<body id="body" onload="init('23');">
<div id="header">    
    <div id="dropdown">
        <!--Logo menu-->
        <div class="dropdown_menu">
            <img src="../diagramo/assets/images/logo-36x36.png"/>
        </div>
        <!-- /File menu-->
        
        <!--File menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('file')" onmouseout="dropdownSpace.menuCloseTime()">File</a>
            <div class="dropdown_menu_panel" id="file" onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()">
	            <a style="text-decoration: none;" href="./common/controller.php?action=newDiagramExe" title="New diagram"><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/icon_new.jpg" border="0" width="20" height="21"/><span class="menuText">New</span></a>
	            <a style="text-decoration: none; border-bottom: 1px solid #666;" href="./myDiagrams.php" title="Open diagram"><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/icon_open.jpg" border="0" width="20" height="21"/><span class="menuText">Open...</span></a>
                <a style="text-decoration: none;" href="javascript:save();"  title="Save diagram (Ctrl-S)"><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/icon_save.jpg" border="0" width="22" height="22"/><span class="menuText">Save</span></a>
                <a style="text-decoration: none; border-bottom: 1px solid #666;" href="javascript:saveAs();"  title="Save diagram as..."><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/icon_save_as.jpg" border="0" width="22" height="22"/><span class="menuText">Save as...</span></a>
                <a style="text-decoration: none; border-bottom: 1px solid #666;" href="javascript:void(0)" onclick="showImport();"  title="Import diagram"><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/icon_import.gif" border="0" width="25" height="21"/><span class="menuText">Import</span></a>
                <a style="text-decoration: none; border-bottom: 1px solid #666;" href="./exportDiagram.php?diagramId=<?=$_REQUEST['diagramId']?>"  title="Export diagram"><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/icon_export.jpg" border="0" width="22" height="22"/><span class="menuText">Export</span></a>
                <a style="text-decoration: none; border-bottom: 1px solid #666;" href="javascript:print_diagram();" title="Print diagram"><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/icon_print.png" border="0" width="20" height="21"/><span class="menuText">Print</span></a>
                <a style="text-decoration: none;" href="./common/controller.php?action=logoutExe"><img style="vertical-align:middle;" src="../diagramo/assets/images/icon_logout.gif" border="0" width="16" height="16"/><span class="menuText">Logout (<?= $loggedUser->email ?>)</span></a>
            </div>
        </div>
        <!-- /File menu-->

        <!--Settings menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('settings')" onmouseout="dropdownSpace.menuCloseTime()">Settings</a>
            <div class="dropdown_menu_panel"  id="settings" onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()">
                <a href="./settings.php">My settings</a>
            </div>
        </div>
        <!--Settings menu-->
        
        <!--Users menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('users')" onmouseout="dropdownSpace.menuCloseTime()">Users</a>
            <div class="dropdown_menu_panel"  id="users" onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()">
                <a style="text-decoration: none;" href="./users.php"  title="Invite/Manage collaborators"><img style="vertical-align:middle; margin-right: 3px;" src="../diagramo/assets/images/collaborators.gif" border="0" width="22" height="22"/><span class="menuText">Users</span></a>
            </div>
        </div>
        <!--Help menu-->
        
        <!--Help menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('help')" onmouseout="dropdownSpace.menuCloseTime()">Help</a>            
            <div class="dropdown_menu_panel" id="help"    onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()" >
                <a href="https://bitbucket.org/scriptoid/diagramo-script/issues/new" target="new">Report bug</a>
                <a href="./license.php">License</a>
            </div>                        
        </div>
        <!--Help menu-->
        
        <!--Direct link-->
        <div style="padding-top: 6px;">
            <img style="vertical-align:middle;" src="../diagramo/assets/images/upper_bar_separator.jpg" border="0" width="2" height="16"/>
            <span class="menuText" title="Use this URL to share diagram to others">Direct link : </span> <input style="font-size: 10px;" title="External direct URL to diagram" type="text" class="text" size="100" value="<?=$url?>"/>
            <input type="button" style="" value="View" onclick="window.open('<?=$url?>')"/>
        </div>
        <!-- //Direct link-->

        <script type="text/javascript">
            //check if browser is ready
            if(!isBrowserReady()){                
                document.write('<span style="background-color: red;" >');
                document.write("No support for HTML5. More <a href=\"http://<?=$WEBADDRESS?>/htm5-support.php\">here</a></a>");
                document.write("</span>");                
            }
        </script>   
        
    </div>
</div>
<div id="actions">
    <a style="text-decoration: none;" href="#" onclick="return save();" title="Save diagram (Ctrl-S)"><img src="../diagramo/assets/images/icon_save.jpg" border="0" width="16" height="16"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a style="text-decoration: none;" href="./myDiagrams.php" title="Open diagram"><img src="../diagramo/assets/images/icon_open.jpg" border="0" width="16" height="16"/></a>

    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    <a style="text-decoration: none;" href="#" onclick="return print_diagram();" title="Print diagram"><img src="../diagramo/assets/images/icon_print.png" border="0" width="16" height="16"/></a>

    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:action('connector-straight');"  title="Straight connector"><img src="../diagramo/assets/images/icon_connector_straight.gif" border="0"/></a>

    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:action('connector-jagged');" title="Jagged connector"><img src="../diagramo/assets/images/icon_connector_jagged.gif" border="0"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:action('connector-organic');" title="Organic connector (Experimental)"><img src="../diagramo/assets/images/icon_connector_organic.gif" border="0" alt="Organic"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:action('container');" title="Container (Experimental)"><img src="../diagramo/assets/images/container.png" border="0" alt="Container"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>            
                
    <input type="checkbox" onclick="showGrid();" id="gridCheckbox"  title="Show grid" /> <span class="toolbarText">Show grid</span>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <input type="checkbox" onclick="snapToGrid();" id="snapCheckbox" title="Snap elements to grid" /> <span class="toolbarText">Snap to grid</span>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

    <a href="javascript:action('front');" title="Move to front"><img src="../diagramo/assets/images/icon_front.gif" border="0"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:action('back');" title="Move to back"><img src="../diagramo/assets/images/icon_back.gif" border="0"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:action('moveforward');" title="Move (one level) to front"><img src="../diagramo/assets/images/icon_forward.gif" border="0"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:action('moveback');" title="Move (one level) back"><img src="../diagramo/assets/images/icon_backward.gif" border="0"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    <a href="javascript:action('group');" title="Group (Ctrl-G)"><img src="../diagramo/assets/images/group.gif" border="0"/></a>
    
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    <a href="javascript:action('ungroup');" title="Ungroup (Ctrl-U)"><img src="../diagramo/assets/images/ungroup.gif" border="0"/></a>

    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
    <a href="javascript:createFigure(figure_Text);"  title="Add text"><img  src="../diagramo/assets/images/text.gif" border="0" height ="16"/></a>
    <img class="separator" src="../diagramo/assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

    <a href="javascript:action('undo');" title="Undo (Ctrl-Z)"><img src="../diagramo/assets/images/arrow_undo.png" border="0"/></a>
</div>
<div id="editor">
	<div id="figures">
        <select style="width: 120px;" onchange="setFigureSet(this.options[this.selectedIndex].value);">
            <script type="text/javascript">
                for(var setName in figureSets){
                    var set = figureSets[setName];
                    document.write('<option value="' + setName + '">' + set['name'] + '</option>');
                }
            </script>
        </select>
        
        <script type="text/javascript">
        /**Builds the figure panel*/
        function buildPanel(){
            //var first = true;
            var firstPanel = true;
            for(var setName in figureSets){                            
                var set = figureSets[setName];
                //creates the div that will hold the figures
                var eSetDiv = document.createElement('div');
                eSetDiv.setAttribute('id', setName);
                //eSetDiv.style.border = '1px solid green';
                if(firstPanel) {
                    firstPanel = false;
                }
                else{
                    eSetDiv.style.display = 'none';
                }
                document.getElementById('figures').appendChild(eSetDiv);
                
                //add figures to the div
                for(var figure in set['figures']){
                    figure = set['figures'][figure];
                    
                    var figureFunctionName = 'figure_' + figure.figureFunction;                                
                    var figureThumbURL = '../diagramo/lib/sets/' + setName + '/' + figure.image;
                    
                    var eFigure = document.createElement('img');
                    eFigure.setAttribute('src', figureThumbURL);
                    
                    eFigure.addEventListener('mousedown', function (figureFunction, figureThumbURL){                                    
                        return function(evt) {
                            evt.preventDefault();
                            //Log.info("editor.php:buildPanel: figureFunctionName:" + figureFunctionName);
                            createFigure(window[figureFunction] /*we need to search for function in window namespace (as all that we have is a simple string)**/
                                ,figureThumbURL);
                        };
                    } (figureFunctionName, figureThumbURL)
                    , false);

                    //in case use drops the figure
                    eFigure.addEventListener('mouseup', function (){
                        createFigureFunction = null;    
                        selectedFigureThumb = null;
                        state = STATE_NONE;
                    }
                    , false);                                                                                                
                    
                    
                    eFigure.style.cursor = 'pointer';
                    eFigure.style.marginRight = '5px';
                    eFigure.style.marginTop = '2px';
                    
                    eSetDiv.appendChild(eFigure);
                }
            }
        }
        buildPanel();
        </script>
     </div>
     
     <div style="display:none;" id="more">
          More sets of figures <a href="http://diagramo.com/figures.php" target="_new">here</a>
     </div>
     
     <!--THE canvas-->
     <div style="width: 100%">
         <div  id="container">
             <canvas id="a" width="800" height="600">
                 Your browser does not support HTML5. Please upgrade your browser to any modern version.
             </canvas>
             <div id="text-editor"></div>
             <div id="text-editor-tools"></div>
         </div>
     </div>
     
     <!--Right panel-->
     <div id="right">
         <center>
             <div id="minimap">
             </div>
         </center>
         <div style="overflow: scroll; height: 400px;" id="edit">
         </div>
     </div>
</div>
 
<!--The import panel-->
<div id="import-dialog" style="background-color: white; display: none; margin-top: auto; margin-bottom: auto;">
    <form action="./common/controller.php" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="action" value="importDiagramExe"/>
        <h2>Import Diagramo file </h2>
        <p/>
        <input type="file" name="diagramFile" id="diagramFile"/>  
        <p/>
        <input type="image" src="../diagramo/assets/images/import.gif"/>
    </form>
</div>

<script type="text/javascript">
    function loadFill(check){
        if(check.checked === true){
            if($('#colorpickerHolder3').css('display') === 'none'){
                $('#colorSelector3').click();
            }
        }
        else{
            if($('#colorpickerHolder3').css('display') === 'block'){
                $('#colorSelector3').click();
            }
        }
    }
</script>
<br/>
</body>
</html>