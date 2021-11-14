class Camera{
    constructor(videoNode){
        this.videoNode = videoNode;
        this.stream = null;
        this.photo = null;
        console.log("Nueva cámara creada");
    }

    on(){
        this.off();
        if (navigator.mediaDevices) {
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300
                }
            }).then(stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true;
            }).catch(err => {
                alert("Ups! Ocurrió un error al activar la cámara");
                console.log(err);
                return false;
            });
        }else{
            alert("No cuentas con dispositivos multimedia");
            return false;
        }
    }

    off(){
        if (this.videoNode) {
            this.videoNode.pause();
            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }
    }

    onBack(){
        this.off();
        if (navigator.mediaDevices) {
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300,
                    facingMode: {
                        exact: "environment"
                    }
                }
            }).then(stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true;
            }).catch(err => {
                alert("Ups! Ocurrió un error al activar la cámara");
                console.log(err);
                return false;
            });
        }else{
            alert("No cuentas con dispositivos multimedia");
            return false;
        }
    }

    takePhoto(){
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", 300);
        canvas.setAttribute("height", 300);
        let context = canvas.getContext("2d");
        context.drawImage(this.videoNode, 0,0,canvas.width,canvas.height);
        this.photo = context.canvas.toDataURL();
        canvas = null;
        context = null;
        this.videoNode.removeAttribute("src");
        this.videoNode.load();
        return this.photo;
    }
}