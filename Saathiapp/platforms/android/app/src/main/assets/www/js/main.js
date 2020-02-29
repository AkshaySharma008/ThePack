
var contacts = [];


function add() {
    var node = document.createElement("LI");
    
    var a = document.getElementById("num").value;
    contacts.push(a);
    console.log(contacts);  
    var textnode = document.createTextNode(a);
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
    document.getElementById("num").value="";
  }

  var jobject={};

function login(){


    var username = document.getElementById("username").value;
    var password = document.getElementById("pass").value;


    jobject = { 'username':username,'password':password};
    
    console.log(jobject);
    const url="https://vast-coast-82501.herokuapp.com/verify";
    const other_params = {
        headers : { "content-type" : "application/json; charset=UTF-8" },
        body : JSON.stringify(jobject),
        method : "POST",
        mode : "cors"
    };  

    fetch(url, other_params)
        .then(function(response) {
            //console.log(response.text);
        
            response.text().then(function (text) {
                text = JSON.parse(text);
                console.log(text['login']);
                localStorage.setItem('username',text['login']);
                location.replace("./sos.html");
              });
        }).catch(function(error) {
            console.log(error);
        });
    return true;


}
// document.getElementById("myBtn").addEventListener("click",sendSms)

    function sendSms() {
        var latitude=18.6390699;
        var longitude=73.8017924;
        // alert("called");
        requestSMSPermission();
        function requestSMSPermission() {
        var number = '8698618134'; /* iOS: ensure number is actually a string */
        var message = `XYZ#${localStorage.getItem('username')}#18.6388445#73.7994321#https://www.google.com/maps/place/Auto+Cluster+Exhibition+Center/@18.6388445,73.7994321,17z/data=!3m1!4b1!4m5!3m4!1s0x3bc2b84992d04bbd:0x9f1c44fb853ba461!8m2!3d18.6388394!4d73.8016208 `;
        console.log("number=" + number + ", message= " + message);

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without opening any other app
            }
        };

        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
        }

    }


    document.addEventListener("click", init, false);
    function init() {
        console.log("navigator.geolocation works well");
        navigator.geolocation.getCurrentPosition(geolocationSuccess,
            onError,false)

        var geolocationSuccess = function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n');
        };
    
        // onError Callback receives a PositionError object
        //        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    }




// document.getElementById("butn").addEventListener("click", init, false);

// function init()
// {   
//     window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function readFile(fileEntry) {
// const fullPath ="storage/Bluetooth/macs.txt";
//     fileEntry.file(function (file) {
//         var reader = new FileReader();

//         reader.onloadend = function() {
//             window.alert("Successful file read: " + this.result);
//             displayFileData(fileEntry.fullPath + ": " + this.result);
//         };

//         reader.readAsText(file);

//     }, onErrorReadFile);
// }, onErrorLoadFs);}



// window.onload = function() {
//     var startPos;
//     var geoSuccess = function(position) {
//       startPos = position;
//       console.log(startPos.coords.latitude);
//       console.log(startPos.coords.longitude);
//       alert(startPos.coords.latitude)
//     };
//     navigator.geolocation.getCurrentPosition(geoSuccess);
//   };