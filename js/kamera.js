// Hämta html-attributer. Samt deklarera variabler/konstanter.
const galleri = document.querySelector(".GalleryBtn"); 
const kamera =  document.querySelector("#camera"); 
const taBild =    document.querySelector("#take-picture");  
const canvas =  document.querySelector("#picture"); 
const nyBild =  document.querySelector("#newPic"); 
const ctx = canvas.getContext("2d");
let notificationPermission = "";
let images; 
let stream;
let switchimage = true;
// Kollar om det redan finns något i localstorage så vi inte skriver över de redan 
//befinteliga bilderna. 
if (localStorage.getItem("tagnaBilder") !== null){
    images = JSON.parse(localStorage.getItem("tagnaBilder"));
}
else {
    images = [];
}
//  function för att starta kameran. 
async function startKamera() {
    if ("mediaDevices" in navigator)  {
        stream = await navigator.mediaDevices.getUserMedia({video: true , audio: false});
        console.log(stream);
        kamera.srcObject = stream;
    }
}
//Kör funtionen starta Kameran.
startKamera();


// rita en bild utifrån kamaran på click eventet.
taBild.addEventListener("click", () =>{
    if (switchimage){
     ctx.drawImage(kamera,0,0,canvas.width,canvas.height);
     //formatera till png
     const imageData = canvas.toDataURL("image/png")
     images.push({
         id: images.length,
         image : imageData

    })
    //skicka upp tagna bilder till local storage.
    localStorage.setItem("tagnaBilder" , JSON.stringify(images))
    createNotification("Din bild har sparats.");
    canvas.style.opacity = "1";
    taBild.innerHTML = "FÅNGA ETT NYTT ÖGONBLICK"
    switchimage = false; 
}
    else {
        canvas.style.opacity = "0";
        taBild.innerHTML= "FÖREVIGA ETT ÖGONBLICK"
        switchimage = true;
    }
});
//Lägg till ett event på galleriknappen för att ta en till /galleri.html
galleri.addEventListener("click", () =>{
    window.location.replace("../galleri.html");
})

// fråga om tillstånd 
function reqNotificationPermission(){
    Notification.requestPermission().then((permission) =>{
        notificationPermission = permission;
    })
}
reqNotificationPermission();
// , icon: icon
function createNotification(text){
    if (notificationPermission === "granted"){
        // const icon = "icon.png"
        const notification = new Notification("Bröllopsfotografen", {body: text});
        notification.addEventListener("click", () => {
            window.location.replace("../galleri.html");
        })
    }
}

