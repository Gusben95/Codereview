const index = document.querySelector("#container")
async function registerServiceWorker () {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("../service-worker.js")
            }
           catch (err) {console.error(err)}
    }
}
registerServiceWorker();

index.addEventListener("click", () =>{
    window.location.replace("index.html")
    // window.location.replace("../in");
})