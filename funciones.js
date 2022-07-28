"use strict"
/*CODIGO DE BOTONES */
const watch = document.querySelector(".watch")
const tempori = document.querySelector(".tempo");
const crono = document.querySelector(".cronito");
const displayReloj = document.querySelector(".contenedorReloj");
const displayTempori = document.querySelector(".contenedorTempo");
const displayCrono = document.querySelector(".contenedorCrono");

watch.addEventListener("click", ()=> {
    displayReloj.style.display = "block";
    displayTempori.style.display = "none";
    displayCrono.style.display = "none";
});

tempori.addEventListener("click", ()=> {
    displayReloj.style.display = "none";
    displayTempori.style.display = "block";
    displayCrono.style.display = "none";
});

crono.addEventListener("click", ()=> {
    displayReloj.style.display = "none";
    displayTempori.style.display = "none";
    displayCrono.style.display = "block";
})

 /* CODIGO DEL RELOJ */
function Reloj() {
    const addZeros = n => { //necesitamos que se agregue un numero "antes" luego de 9
        if (n.toString().length < 2) return "0".concat(n); //
        return n;
    }
    
    const actualizarHora = ()=> {
        const Mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        const time = new Date();
        let hora = addZeros(time.getHours());
        let minutos = addZeros(time.getMinutes());
        let segundos = addZeros(time.getSeconds());

        document.querySelector(".hora-reloj").textContent = hora;
        document.querySelector(".minutos-reloj").textContent = minutos;
        document.querySelector(".segundos-reloj").textContent = segundos;

        let dia = document.querySelector(".dia");
        let mes = document.querySelector(".mes");
        let año = document.querySelector(".año");
        dia.textContent = time.getDate();
        mes.textContent = Mes[time.getMonth()];
        año.textContent = time.getFullYear();

    }
    actualizarHora();
    setInterval(actualizarHora, 1000);
    
    }

Reloj();


/*CODIGO DEL TEMPORIZADOR */

const hora1 = document.querySelector(".hora-temp");
const minutos1 = document.querySelector(".minutos-temp");
const segundos1 = document.querySelector(".segundos-temp");
const hora2 = document.querySelector(".hora-bar");
hora2.addEventListener("wheel",()=> console.log(hora2.value));
const minutos2= document.querySelector(".minutos-bar");
const segundos2 = document.querySelector(".segundos-bar");

const boton = document.getElementById("play-temp");
boton.addEventListener("click", ()=> {
    enviarHora();
});

const enviarHora = ()=> {
    let hora = hora2.value;
    let minutos = minutos2.value;
    let segundos = segundos2.value;
    if(hora == 0 && minutos == 0 && segundos == 0) return;
    else {
        if(hora >= 100 || minutos >= 61 || segundos >= 61) {
            document.querySelector(".mensaje").style.display = "block";
            setTimeout(()=>{
                document.querySelector(".mensaje").style.display = "none";
                hora2.value = "00";
                minutos2.value = "00";
                segundos2.value = "00";
            },1000);
            clearTimeout();
        }
        else {
        Temporizador(hora,minutos,segundos);
        hora2.value = "00";
        minutos2.value = "00";
        segundos2.value = "00";
        boton.style.display = "none";
        }
    }
} 

const addZeros = n => {
    if (n.toString().length < 2) return "0".concat(n); //
    return n;
}

function Temporizador(hora,minutos,segundos) {
    hora1.textContent = addZeros(hora);
    minutos1.textContent = addZeros(minutos);
    segundos1.textContent = addZeros(segundos);

    let tiempo = setInterval(() => {
        if(hora == 0 && minutos == 0 && segundos == 0){
        clearInterval();
        boton.style.display = "flex";
        } else {
        segundos--;
        segundos1.textContent = addZeros(segundos);
        }
        
        if (minutos == 0 && segundos == -1){
            hora--;
            hora1.textContent = addZeros(hora);
            minutos = 59;
            minutos1.textContent = addZeros(minutos);
            segundos = 59;
            segundos1.textContent = addZeros(segundos);
        } else if (segundos == -1){
            minutos--;
            minutos1.textContent = addZeros(minutos);
            segundos = 59;
            segundos1.textContent = addZeros(segundos);
        }

    }, 1000);

    document.getElementById("pause-temp").addEventListener("click",()=> {
        clearInterval(tiempo);
        hora2.value = hora1.textContent ;
        minutos2.value = minutos1.textContent ;
        segundos2.value = segundos1.textContent;
        boton.style.display = "flex";
    });

    document.getElementById("reset-temp").addEventListener("click",()=> {
        clearInterval(tiempo);
        hora2.value = "00";
        minutos2.value = "00";
        segundos2.value = "00";
        segundos1.textContent = "00";
        minutos1.textContent = "00";
        hora1.textContent = "00";
        boton.style.display = "flex";
    });
}

/* CRONOMETRO */
    const Play = document.querySelector(".crono-play")
    Play.addEventListener("click", ()=> {
        cronometrar()
        Play.style.display = "none";
    });
    const minutos3= document.querySelector(".minutos-crono");
    const segundos3 = document.querySelector(".segundos-crono");
    const mili3 = document.querySelector(".milisegundos-crono");    

    var m = 0;
    var s = 0;
    var ms = 0;

function cronometrar(){
    const id = setInterval(()=> {
    ms++;
    if (ms>99){s++;ms=0;}
    if (s>59){m++;s=0;}
    if (m>59){m=0;}

    minutos3.textContent = addZeros(m);
    segundos3.textContent = addZeros(s);
    mili3.textContent = addZeros(ms);
    },10);

    document.querySelector(".crono-pause").addEventListener("click", ()=> {
        clearInterval(id)
        Play.style.display = "block";
    });

    document.querySelector(".reset-crono").addEventListener("click", ()=> {
        clearInterval(id);
        m = 0;
        s = 0;
        ms = 0;
        minutos3.textContent = "00";
        segundos3.textContent = "00";
        mili3.textContent = "00";
        Play.style.display = "block";
    });

}

