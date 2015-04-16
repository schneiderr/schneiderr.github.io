var count = 0;
var a = 1;

arel.sceneReady(function()
                {
                //send request to ARViewController to remove spinner
                arel.Media.openWebsite('removeSpinner://');
                //Activate arel debug concole GUI
                arel.Debug.activate();
                arel.Debug.activateArelLogStream();
                
                //Output to the console if scene loaded properly
                arel.Debug.log("ToYuancheng: sceneReady");
                
                //set a listener to tracking to get information about when the image is tracked
                arel.Events.setListener(arel.Scene, trackingHandler);
                
                // Check initial state of tracking
                arel.Scene.getTrackingValues(function(trackingValues)
                                             {
                                             if (trackingValues.length == 0)
                                             {
                                             document.getElementById('info').style.display = "block";
                                             }
                                             });
                
                var Scale = new arel.Vector3D(5.0, 5.0, 5.0);
                var Rotation = new arel.Rotation();
                Rotation.setFromEulerAngleDegrees(new arel.Vector3D(45.0, 0.0, 0.0));
                
                //call customization function - customize the AR webview with JS
                ARWebviewCustomize();
                
                arel.Debug.log("Fully Loaded");
                });

function trackingHandler(type, param)
{
    //check if there is tracking information available
    if (param[0] !== undefined)
    {
        if(fixed == false){
            //if the pattern is found, hide the information to hold your phone over the pattern
            if (type == arel.Events.Scene.ONTRACKING && param[0].getState() == arel.Tracking.STATE_TRACKING)
            {
                document.getElementById('info').style.display = "none";
                var id = param[0].getCoordinateSystemID();
                //var a = parseInt(id);
                arel.Debug.log(a);
                arel.Media.openWebsite('media://='+a);
                switch(a)
                {
                    case 1:
                        document.getElementById('item-h3').innerHTML = "Biacore!";
                        
                        arel.Debug.log("a in case 1 before: " + a);
                        //arel.Scene.setTrackingConfiguration("../Tracking/3DMapTracking/map-cardcase.zip", true);
                        arel.Scene.setTrackingConfiguration("map-cardcase.zip", true);
                        a += 1;
                        arel.Debug.log("a in case 1 after: " + a);
                        
                        break;
                    case 2:
                        document.getElementById('item-h3').innerHTML = "Card Case!";
                        
                        arel.Debug.log("a in case 2 before: " + a);
                        arel.Scene.setTrackingConfiguration("map-liquid tube.zip", true);
                        a += 1;
                        arel.Debug.log("a in case 2 after: " + a);
                        
                        break;
                    case 3:
                        document.getElementById('item-h3').innerHTML = "Liquid!";
                        
                        arel.Debug.log("a in case 3 before: " + a);
                        arel.Scene.setTrackingConfiguration("../Tracking/3DMapTracking/map-right half tubes and arm.zip", true);
                        a+= 1;
                        arel.Debug.log("a in case 3 after: " + a);
                        
                        break;
                    case 4:
                        document.getElementById('item-h3').innerHTML = "Inside the Biacore!";
                        
                        arel.Debug.log("a in case 4 before: " + a);
                        arel.Scene.setTrackingConfiguration("../Tracking/3DMapTracking/map-roboticArm.zip", true);
                        a += 1;
                        arel.Debug.log("a in case 4 after: " + a);
                        
                        break;
                    case 5:
                        document.getElementById('item-h3').innerHTML = "Robotic Arm!";
                        
                        arel.Debug.log("a in case 5 before: " + a);
                        arel.Scene.setTrackingConfiguration("../Tracking/3DMapTracking/map-biacore.zip", true);
                        a = 1;
                        arel.Debug.log("a in case 5 after: " + a);
                        
                        break;
                }
                
                document.getElementById('item').style.display = "block";

            }
            //if the pattern is lost tracking, show the information to hold your phone over the pattern
            else if (type == arel.Events.Scene.ONTRACKING && param[0].getState() == arel.Tracking.STATE_NOTTRACKING)
            {
                document.getElementById('info').style.display = "block";
                document.getElementById('item').style.display = "none";
                
                if(qaExpand == false){
                    
                    document.getElementById('qaBox').style.display = "none";
                    
                    qaTransition();
                    
                    document.getElementById('qaBox').style.display = "block";
                    
                }
                
                if(videoExpand == false){
                    
                    document.getElementById('videoBox').style.display = "none";
                    
                    videoTransition();
                    
                    document.getElementById('videoBox').style.display = "block";
                    
                }
                
                if(quickTutorialExpand == false){
                    
                    document.getElementById('quickTutorialBox').style.display = "none";
                    
                    quickTutorialTransition();
                    
                    document.getElementById('quickTutorialBox').style.display = "block";
                    
                }
                
                document.getElementById('text-info').innerHTML = "";
            }
        }
    }
};





