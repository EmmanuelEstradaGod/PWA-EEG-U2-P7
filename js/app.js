let contextSW = "/PWA-EEG-U2-P7/sw.js";
let url = window.location.href;

let player = $("#player");
let btnCamera = $("#btnCamera");
let btnCameraBack = $("#btnCameraBack");
let btnTakePhoto = $("#btnTakePhoto");

let photoUser = $("#photoUser");

let imagenes = document.getElementById("imagenes");

const camera = new Camera(player[0]);

let camaraActiva = null;

btnCamera.on("click", () => {
    camera.on()
    .then(result => {
        if (!result) {
            alert("Error al iniciar cámara");
        }
    });
    camaraActiva = "Frontal";
});

btnCameraBack.on("click", () => {
    camera.onBack()
    .then(result =>{
        if (!result) {
            alert("Error al iniciar la cámara");
        }
    });
    camaraActiva = "Trasera";
});

btnTakePhoto.on("click", () => {
    camera.off();
    // photoUser.attr("src",camera.takePhoto());
    let card = document.createElement("div");
    card.setAttribute("class","card");
    let image = document.createElement("img");
    image.setAttribute("src",camera.takePhoto());
    card.appendChild(image);

    let p = document.createElement("p");
    p.textContent = camaraActiva;

    card.appendChild(p);

    imagenes.appendChild(card);
    
});

if (navigator.serviceWorker) {
    if (url.includes("localhost")) {
        contextSW = "/sw.js"
    }
    navigator.serviceWorker.register(contextSW)
}