var fixed = false;

function ARWebviewCustomize(){
    //set the box draggable
    var container = document.getElementById("draggableContainer");
    setDraggable(container);
    setInTheMiddle(container);

    //set the qa box draggable
    var qaBox = document.getElementById("qaBox");
    setDraggable(qaBox);
    
    //set the video box draggable
    var videoBox = document.getElementById("videoBox");
    setDraggable(videoBox);
    
    //set the quick tutorial box draggable
    var quickTutorialBox = document.getElementById("quickTutorialBox");
    setDraggable(quickTutorialBox);

    //stop bubbling
    var textInfo = document.getElementById("text-info");
    var touchStart = arel.Debug.activeBrowser?"mousedown":"touchstart";
    textInfo.addEventListener(touchStart, function(e) {
        event.stopPropagation();
    });
    document.getElementById("qaCross").addEventListener(touchStart, function(){
        event.stopPropagation();
    });
    document.getElementById("qaContent").addEventListener(touchStart, function(){
        event.stopPropagation();
    });
    document.getElementById("videoCross").addEventListener(touchStart, function(){
                                                        event.stopPropagation();
                                                        });
    document.getElementById("videoContent").addEventListener(touchStart, function(){
                                                          event.stopPropagation();
                                                          });

    //close/expend menu bar
    var menuBar = document.getElementById('menuBar');
    var menuBarButton = document.getElementById('menu-close-expend');
    var menuBarButtonWidth = parseInt(getComputedStyle(menuBarButton, null).width);
    var closeExpendFlag = true;
    var fTimer = null;
    var target = 0;
    var position = 0;
    var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    menuBarButton.addEventListener("click", function(e){
                                   
                                   
                                   
        position = parseInt(getComputedStyle(menuBar, null).marginLeft);
        if(closeExpendFlag){
            //close
            target = clientWidth - menuBarButtonWidth;
            closeExpendFlag = false;
        }else{
            //expend
            target = 0;
            closeExpendFlag = true;
        }
        clearInterval(fTimer);
        fTimer = setInterval(function() {
            if (position === target) {
                clearInterval(fTimer);
            } else {
                var speed = (target - position > 0) ? Math.ceil((target - position) / 8) : Math.floor((target - position) / 8);
                position = position + speed;
                menuBar.style.marginLeft = position + 'px';
            }
                             if(qaExpand == true){
                             document.getElementById("qaBox").style.top = (getOffsetTop(document.getElementById("qaBoxButton")))+"px";
                             document.getElementById("qaBox").style.left = (getOffsetLeft(document.getElementById("qaBoxButton")))+"px";
                             document.getElementById("videoBox").style.top = (getOffsetTop(document.getElementById("videoBoxButton")))+"px";
                             document.getElementById("videoBox").style.left = (getOffsetLeft(document.getElementById("videoBoxButton")))+"px";
                             document.getElementById("quickTutorialBox").style.top = (getOffsetTop(document.getElementById("quickTutorialBoxButton")))+"px";
                             document.getElementById("quickTutorialBox").style.left = (getOffsetLeft(document.getElementById("quickTutorialBoxButton")))+"px";
                             }
        }, 30);
                                   
                                   
                                   
    });
    window.onorientationchange = function() {
        menuBar.style.display = "none";
        setTimeout(function(){
            clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if(!closeExpendFlag){
                menuBar.style.marginLeft = clientWidth - menuBarButtonWidth + 'px';
            }
            menuBar.style.display = "block";
        }, 500);
    }
    
    boxCustomization();
    
    //screen shot
    document.getElementById("screenShotButton").onclick = function(){
        arel.Media.openWebsite('screenShot://');
    };

};

function displayScreenshotSuccessAlert(){
    var screenshotAlert = document.getElementById("screenshotAlert");
    appearAndFadeout(screenshotAlert);
    setInTheMiddle(screenshotAlert);
}

function appearAndFadeout(element){
    element.style.display = "block";
    element.style.opacity = 1;
    setTimeout(function(){
        var position = 100;
        var target = 0;
        var fTimer = null;
        fTimer = setInterval(function() {
            if (position === target) {
                clearInterval(fTimer);
                element.style.display = "none";
            } else {
                var speed = (target - position > 0) ? Math.ceil((target - position) / 8) : Math.floor((target - position) / 12);
                position = position + speed;
                element.style.opacity = position / 100;
            }
        }, 30);
    }, 1000);
}

function setInTheMiddle(element){
    var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var elementWidth = parseInt(getComputedStyle(element, null).width);
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var elementHeight = parseInt(getComputedStyle(element, null).height);
    element.style.marginLeft = clientWidth / 2 - elementWidth / 2 + 'px';
    element.style.marginTop = clientHeight / 2 - elementHeight / 2 + 'px';
}

function setDraggable(container){
    container.style.position = "absolute";
    var touchStart = "touchstart";
    var touchMove = "touchmove";
    var touchEnd = "touchend";
    var touchLeave = "touchleave";
    var touchCancel = "touchcancel";
    var pressed = false;
    var offsetY = 0;
    var offsetX = 0;
    if (arel.Debug.activeBrowser) {
        touchStart = "mousedown";
        touchMove = "mousemove";
        touchEnd = "mouseup";
        touchLeave = "mouseleave";
        touchCancel = "mousecancel"
    }
    container.addEventListener(touchStart, function(j) {
                               pressed = true;
                               var positionX = arel.Debug.activeBrowser?event.pageX:event.touches[0].pageX;
                               var positionY = arel.Debug.activeBrowser?event.pageY:event.touches[0].pageY;
                               offsetX = positionX - parseInt(getComputedStyle(container, null).marginLeft);
                               offsetY = positionY - parseInt(getComputedStyle(container, null).marginTop);
                               container.style.opacity = 0.5;
                               //event.preventDefault()
                               });
    container.addEventListener(touchMove, function(k) {
                               if (pressed) {
                               //vertical
                               var positionY = 0;
                               if (event.touches) {
                               positionY = event.touches[0].pageY;
                               }
                               if (arel.Debug.activeBrowser) {
                               positionY = event.pageY;
                               }
                               container.style.marginTop = positionY - offsetY + "px";
                               //horizontal
                               var positionX = 0;
                               if(event.touches){
                               positionX = event.touches[0].pageX;
                               }
                               if (arel.Debug.activeBrowser) {
                               positionX = event.pageX;
                               }
                               container.style.marginLeft = positionX - offsetX + "px";
                               event.preventDefault()
                               }
                               });
    container.addEventListener(touchEnd, function(j) {
                               pressed = false;
                               container.style.opacity = 1
                               });
    container.addEventListener(touchCancel, function(j) {
                               pressed = false;
                               container.style.opacity = 1
                               });
    container.addEventListener(touchLeave, function(j) {
                               pressed = false;
                               container.style.opacity = 1
                               });
}

var looper;
var degrees = 0;
var rotateBack = false;
function rotateAnimationForward(speed){
    
    var elem = document.getElementById("pin");
    
    if(degrees >= -44){
        
        elem.style.WebkitTransform = "rotate("+degrees+"deg)";
        
        looper = setTimeout('rotateAnimationForward('+speed+')',speed);
        
    }
    
    degrees--;
    
}

function rotateAnimationBackward(speed){
    
    var elem = document.getElementById("pin");
    
    if(degrees <= 0){
        
        elem.style.WebkitTransform = "rotate("+degrees+"deg)";
        
        looper = setTimeout('rotateAnimationBackward('+speed+')',speed);
        
    }
    
    degrees++;
    
}

function rotateDirection(){
    
    arel.Debug.log("in rotate");
    if(rotateBack == false){
        
        degrees = 0;
        rotateAnimationForward(1);
        rotateBack = true;
        
    }else{
        
        degrees = -44;
        rotateAnimationBackward(1);
        rotateBack = false;
        
    }
    
}

function fix(){
    
    if(fixed == false){
        
        fixed = true;
        document.getElementById('fix').style.background = "rgba(0,0,0,0.6)";
        
    }else{
        
        fixed = false;
        document.getElementById('fix').style.background = "transparent";
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

    }
    
    rotateDirection();
    
}

var qaExpand = true;
var videoExpand = true;
var quickTutorialExpand = true;

function getOffsetTop(elem) {

    var top = 0;

    while(elem) {

        top = top + parseInt(elem.offsetTop);

        elem = elem.offsetParent;

    }

    return top;

}

function getOffsetLeft(elem) {
    
    var left = 0;
    
    while(elem) {
        
        left = left + parseInt(elem.offsetLeft);
        
        elem = elem.offsetParent;
        
    }
    
    return left;
    
}

function boxCustomization(){
    
    document.getElementById("qaBox").style.top = (getOffsetTop(document.getElementById("qaBoxButton")))+"px";
    document.getElementById("qaBox").style.left = (getOffsetLeft(document.getElementById("qaBoxButton")))+"px";
    document.getElementById("videoBox").style.top = (getOffsetTop(document.getElementById("videoBoxButton")))+"px";
    document.getElementById("videoBox").style.left = (getOffsetLeft(document.getElementById("videoBoxButton")))+"px";
    document.getElementById("quickTutorialBox").style.top = (getOffsetTop(document.getElementById("quickTutorialBoxButton")))+"px";
    document.getElementById("quickTutorialBox").style.left = (getOffsetLeft(document.getElementById("quickTutorialBoxButton")))+"px";

}

var qaIndent = 0;

function qaBoxExpand(){

    arel.Media.openWebsite('qa://=' + qaIndent);

    var qaBoxButton = document.getElementById("qaBoxButton");
    var qaBox = document.getElementById("qaBox");
    
    if(qaBox.style.display == "none"){
    
        qaBox.style.display = "block";
    
    }
    
    qaBoxButton.style.borderStyle = "solid";
    qaBoxButton.style.backgroundColor = "rgba(65, 65, 65, 0.6)";
    document.getElementById("qaContent").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("qaCross").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("qaArrowLeft").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("qaArrowRight").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("qaContent").style.opacity = "1";
    document.getElementById("qaCross").style.opacity = "1";
    document.getElementById("qaArrowLeft").style.opacity = "1";
    document.getElementById("qaArrowRight").style.opacity = "1";
    qaBox.style.top = "65%";
    qaBox.style.left = "10%";

    qaBox.style.width = "80%";
    qaBox.style.height = "50%";

    
}

function qaBoxShrink(){
    
    var qaBoxButton = document.getElementById("qaBoxButton");
    var qaBox = document.getElementById("qaBox");
    
    qaBoxButton.style.borderStyle = "none";
    qaBoxButton.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    document.getElementById("qaContent").style.WebkitTransitionDelay = "0s";
    document.getElementById("qaCross").style.WebkitTransitionDelay = "0s";
    document.getElementById("qaArrowLeft").style.WebkitTransitionDelay = "0s";
    document.getElementById("qaArrowRight").style.WebkitTransitionDelay = "0s";
    document.getElementById("qaContent").style.opacity = "0";
    document.getElementById("qaCross").style.opacity = "0";
    document.getElementById("qaArrowLeft").style.opacity = "0";
    document.getElementById("qaArrowRight").style.opacity = "0";
    qaBox.style.top = (getOffsetTop(qaBoxButton))+"px";
    qaBox.style.left = (getOffsetLeft(qaBoxButton))+"px";
    qaBox.style.width = "0";
    qaBox.style.height = "0";
    
}

function qaTransition(){
    
    if(qaExpand == true){
        
        qaBoxExpand();
        
        qaExpand = false;
        
    }else{
        
        qaBoxShrink();
        
        qaExpand = true;
        
    }
    
}

function qaSwitchLeft(){

    qaIndent--;
    arel.Media.openWebsite('qa://=' + qaIndent);
    

}

function qaSwitchRight(){
    
    qaIndent++;
    arel.Media.openWebsite('qa://=' + qaIndent);
    
}

function qaSubmit(){

    var form = document.getElementById("yesNo");
    
    if(form != null){
    
        var choices = document.getElementsByName("choice");
        var value;
        for (var i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                // get value, set checked flag or do whatever you need to
                value = choices[i].value;
            }
        }
        
        //arel.Debug.log(value);
        
        var answer = document.getElementById("answer");
        
        if(value == answer.innerHTML){
        
            alert("Correct!");
        
        }else{
        
            alert("Sorry. The correct answer is: " + answer.innerHTML);
        
        }
    
    }else{
    
        form = document.getElementById("multipleChoice");
        
        if(form != null){
            
            var choices = document.getElementsByName("choice");
            var value;
            for (var i = 0; i < choices.length; i++) {
                if (choices[i].checked) {
                    // get value, set checked flag or do whatever you need to
                    value = choices[i].value.charAt(0);
                }
            }
            
            arel.Debug.log(value);
            
            var answer = document.getElementById("answer");
            
            if(value == answer.innerHTML.charAt(0)){
                
                alert("Correct!");
                
            }else{
                
                alert("Sorry. The correct answer is: " + answer.innerHTML.charAt(0));
                
            }
            
        }else{
            
            var value = document.getElementById("qaInputBox").value;
            
            var answer = document.getElementById("answer");
            
            alert("Your answer: " + value +"\n"+
                  "Correct answer: " + answer.innerHTML)
            
            
        }
    
    }

}

function videoBoxExpand(){
    
    var videoBoxButton = document.getElementById("videoBoxButton");
    var videoBox = document.getElementById("videoBox");
    
    if(videoBox.style.display == "none"){
        
        videoBox.style.display = "block";
        
    }
    
   // arel.Debug.log(getOffsetTop(document.getElementById("videoBoxButton")));
   // arel.Debug.log(getOffsetLeft(document.getElementById("videoBoxButton")));
    
    videoBoxButton.style.borderStyle = "solid";
    videoBoxButton.style.backgroundColor = "rgba(65, 65, 65, 0.6)";
    document.getElementById("videoContent").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("videoCross").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("videoContent").style.opacity = "1";
    document.getElementById("videoCross").style.opacity = "1";
    videoBox.style.top = "65%";
    videoBox.style.left = "50%";
    videoBox.style.width = "40%";
    videoBox.style.height = "20%";
    
}

function videoBoxShrink(){
    
    var videoBoxButton = document.getElementById("videoBoxButton");
    var videoBox = document.getElementById("videoBox");
    
    videoBoxButton.style.borderStyle = "none";
    videoBoxButton.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    document.getElementById("videoContent").style.WebkitTransitionDelay = "0s";
    document.getElementById("videoCross").style.WebkitTransitionDelay = "0s";
    document.getElementById("videoContent").style.opacity = "0";
    document.getElementById("videoCross").style.opacity = "0";
    videoBox.style.top = (getOffsetTop(videoBoxButton))+"px";
    videoBox.style.left = (getOffsetLeft(videoBoxButton))+"px";
    videoBox.style.width = "0";
    videoBox.style.height = "0";
    
}

function videoTransition(){
    
    if(videoExpand == true){
        
        videoBoxExpand();
        
        videoExpand = false;
        
    }else{
        
        videoBoxShrink();
        
        videoExpand = true;
        
    }
    
}

function quickTutorialBoxExpand(){
    
    var quickTutorialBoxButton = document.getElementById("quickTutorialBoxButton");
    var quickTutorialBox = document.getElementById("quickTutorialBox");
    
    if(quickTutorialBox.style.display == "none"){
        
        quickTutorialBox.style.display = "block";
        
    }
    
    quickTutorialBoxButton.style.borderStyle = "solid";
    quickTutorialBoxButton.style.backgroundColor = "rgba(65, 65, 65, 0.6)";
    document.getElementById("quickTutorialContent").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("quickTutorialCross").style.WebkitTransitionDelay = "0.8s";
    document.getElementById("quickTutorialContent").style.opacity = "1";
    document.getElementById("quickTutorialCross").style.opacity = "1";
    quickTutorialBox.style.top = "65%";
    quickTutorialBox.style.left = "30%";
    quickTutorialBox.style.width = "40%";
    quickTutorialBox.style.height = "20%";
    
}

function quickTutorialBoxShrink(){
    
    var quickTutorialBoxButton = document.getElementById("quickTutorialBoxButton");
    var quickTutorialBox = document.getElementById("quickTutorialBox");
    
    quickTutorialBoxButton.style.borderStyle = "none";
    quickTutorialBoxButton.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    document.getElementById("quickTutorialContent").style.WebkitTransitionDelay = "0s";
    document.getElementById("quickTutorialCross").style.WebkitTransitionDelay = "0s";
    document.getElementById("quickTutorialContent").style.opacity = "0";
    document.getElementById("quickTutorialCross").style.opacity = "0";
    quickTutorialBox.style.top = (getOffsetTop(quickTutorialBoxButton))+"px";
    quickTutorialBox.style.left = (getOffsetLeft(quickTutorialBoxButton))+"px";
    quickTutorialBox.style.width = "0";
    quickTutorialBox.style.height = "0";
    
}

function quickTutorialTransition(){
    
    if(quickTutorialExpand == true){
        
        quickTutorialBoxExpand();
        
        quickTutorialExpand = false;
        
    }else{
        
        quickTutorialBoxShrink();
        
        quickTutorialExpand = true;
        
    }
    
}

function resetTransition(){
    
    var qaBox = document.getElementById('qaBox');
    var videoBox = document.getElementById('videoBox');
    var quickTutorialBox = document.getElementById('quickTutorialBox');
    
    if(qaExpand == false){
        
        qaBox.style.display = "none";
        
        qaTransition();
        
        qaBox.style.display = "block";
        
    }
    
    if(videoExpand == false){
        
        videoBox.style.display = "none";
        
        videoTransition();
        
        videoBox.style.display = "block";
        
    }
    
    if(quickTutorialExpand == false){
        
        quickTutorialBox.style.display = "none";
        
        quickTutorialTransition();
        
        quickTutorialBox.style.display = "block";
        
    }
    
    qaBox.style.marginTop = "0";
    qaBox.style.marginLeft = "0";
    videoBox.style.marginTop = "0";
    videoBox.style.marginLeft = "0";
    quickTutorialBox.style.marginTop = "0";
    quickTutorialBox.style.marginLeft = "0";

}
