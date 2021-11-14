let contextSW = "/PWA-EEG-U2-P7/sw.js";
let url = window.location.href;

let player = $("#player");
let btnCamera = $("#btnCamera");
let btnCameraBack = $("#btnCameraBack");
let btnTakePhoto = $("#btnTakePhoto");

let photoUser = $("#photoUser");

const camera = new Camera(player[0]);

btnCamera.on("click", () => {
    camera.on()
    .then(result => {
        if (!result) {
            alert("Error al iniciar cámara");
        }
    });
});

btnCameraBack.on("click", () => {
    camera.onBack()
    .then(result =>{
        if (!result) {
            alert("Error al iniciar la cámara");
        }
    });
});

btnTakePhoto.on("click", () => {
    camera.off();
    photoUser.attr("src",camera.takePhoto());
});

if (navigator.serviceWorker) {
    if (url.includes("localhost")) {
        contextSW = "/sw.js"
    }
    navigator.serviceWorker.register(contextSW)
}