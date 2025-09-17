function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });}

let signaturePad = null;

window.addEventListener('load', async () => {

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        let NombreSolicitante = document.getElementById('NombreSolicitante').value;
        let Nit = document.getElementById('Nit').value;
        let Direccion = document.getElementById('Direccion').value;
        let Cuidad = document.getElementById('Ciudad').value;
        let PersonaContacto = document.getElementById('PersonaContacto').value;
        let TelefonoContacto = document.getElementById('TelefonoContacto').value;
        let NombreFacturante = document.getElementById('NombreFacturante').value;
        let NitFacturante = document.getElementById('NitFacturante').value;
        let DireccionFacturante = document.getElementById('DireccionFacturante').value;
        let CuidadFacturante = document.getElementById('CuidadFacturante').value;
        let TelefonoFacturante = document.getElementById('TelefonoFacturante').value;
        var error= document.getElementById('error');

        if (document.getElementById('FacturanteSi').checked) {
            NombreFacturante = NombreSolicitante
            NitFacturante= Nit
            DireccionFacturante = Direccion
            CuidadFacturante= Cuidad
            TelefonoFacturante= TelefonoContacto

        } else {
            NombreFacturante = NombreFacturante
            NitFacturante= NitFacturante 
            DireccionFacturante= DireccionFacturante
            CuidadFacturante= CuidadFacturante  
            TelefonoFacturante= TelefonoFacturante                  
        }

        if (document.getElementById('FacturanteNo').checked) {
            NombreFacturante = NombreFacturante
            NitFacturante= NitFacturante 
            DireccionFacturante= DireccionFacturante
            CuidadFacturante= CuidadFacturante  
            TelefonoFacturante= TelefonoFacturante

        } else {
            NombreFacturante = NombreSolicitante
            NitFacturante= Nit
            DireccionFacturante = Direccion
            CuidadFacturante= Cuidad
            TelefonoFacturante =TelefonoContacto
        }

        let fact = document.getElementById('fact').value;

        let matriz = document.getElementById('matriz').value;
        let fecha= document.getElementById('fecha').value;
        let codigo= document.getElementById('codigo').value;

  
        
 
        let multiresiduo = document.getElementById('multiresiduo').value;

       
        let MicoSi = document.getElementById('MicoSi').value;
        let micotoxinaSeleccionada = "";
            const radioSeleccionado = document.querySelector('input[name="micotoxinas"]:checked');
            if (radioSeleccionado) {
                micotoxinaSeleccionada = radioSeleccionado.value;
                                    }  
        let ditios = "";
            const ditiosSeleccionado = document.querySelector('input[name="ditios"]:checked');
            if (ditiosSeleccionado) {
            ditios = ditiosSeleccionado.value;
            }
        
        let antimonio = document.getElementById('antimonio').value;
        let arsenico = document.getElementById('arsenico').value;
        let boro = document.getElementById('boro').value;
        let cadmio = document.getElementById('cadmio').value;
        let cinc = document.getElementById('cinc').value;
        let cobre = document.getElementById('cobre').value;
        let cromo = document.getElementById('cromo').value;
        let estaño = document.getElementById('estaño').value;
        let hierro = document.getElementById('hierro').value;
        let magnesio = document.getElementById('magnesio').value;
        let manganeso = document.getElementById('manganeso').value;
        let mercurio = document.getElementById('mercurio').value;
        let plata = document.getElementById('plata').value;
        let plomo = document.getElementById('plomo').value;
        let selenio = document.getElementById('selenio').value;
        let sodio = document.getElementById('sodio').value;
        let potasio = document.getElementById('potasio').value;
        let metalesSi = document.getElementById('metalesSi');

        
        let glyfo = document.getElementById('glyfo').value;
        let fosetyl = document.getElementById('fosetyl').value;
        let clorato = document.getElementById('clorato').value;
        let diquat = document.getElementById('diquat').value;
        let oxEtil = document.getElementById('oxEtil').value;
        let acrilamida = document.getElementById('acrilamida').value;
        let amitraz= document.getElementById('amitraz').value;
        let patulina= document.getElementById('patulina').value;
        let gmo = document.getElementById('gmo').value;
        let doscuatroD= document.getElementById('doscuatroD').value;
        let anotaciones = document.getElementById('anotaciones').value; // observaciones
        let fechaenvio = document.getElementById('fechaenvio').value;
        let enviante = document.getElementById('enviante').value;
        let normal = document.getElementById('normal').value;
        let express = document.getElementById('express').value;

        
        

        generatePDF( NombreSolicitante, Nit, TelefonoContacto, Direccion, Cuidad, PersonaContacto,NombreFacturante,NitFacturante,DireccionFacturante,CuidadFacturante,TelefonoFacturante, fact,matriz,fecha, codigo,multiresiduo,micotoxinaSeleccionada,ditios,antimonio,arsenico,boro,cadmio,cinc,cobre,cromo,estaño,hierro, magnesio,manganeso,mercurio,plata, plomo,selenio,sodio,potasio,metalesSi
                    ,glyfo,fosetyl,clorato,diquat,oxEtil,acrilamida,amitraz,patulina,gmo,doscuatroD,anotaciones,fechaenvio,enviante, normal,express
        
                     
            );
    })

});

async function generatePDF(NombreSolicitante, Nit, TelefonoContacto, Direccion, Ciudad,PersonaContacto,NombreFacturante,NitFacturante,DireccionFacturante,CuidadFacturante,TelefonoFacturante,fact, matriz,fecha,codigo, multiresiduo,micotoxinaSeleccionada,ditios,antimonio,arsenico,boro,cadmio,cinc,cobre,cromo,estaño,hierro, magnesio,manganeso,mercurio,plata, plomo,selenio,sodio,potasio, metalesSi
                            ,glyfo,fosetyl,clorato,diquat,oxEtil,acrilamida,amitraz,patulina,gmo,doscuatroD,anotaciones, fechaenvio, enviante,normal,express
                      
                          
    ) {
    const image = await loadImage("imagenes/FormatoSolicitud2.jpg");
    
    const pdf = new jsPDF('1', 'pt', [612, 792]);

    pdf.addImage(image, 'PNG', 0, 0, 612, 792);
    
    pdf.setFontSize(9);
    pdf.text(NombreSolicitante, 130, 155);
    pdf.text(Nit, 448, 155);
    pdf.setFontSize(8);
    pdf.text(Direccion, 130, 165);
    pdf.text(Ciudad, 448, 165);
    pdf.text(PersonaContacto, 130, 175);
    pdf.text(TelefonoContacto, 448, 175);
    pdf.text(CuidadFacturante, 130,217);
    pdf.text('- '+DireccionFacturante, 200, 217);
    pdf.setFontSize(9);
    pdf.text(NombreFacturante, 130, 205);
    pdf.text(NitFacturante, 448, 205);
    pdf.text(TelefonoFacturante, 448,217);
    
    pdf.setFontSize(8);
    pdf.text(fact, 130, 227);

    
    pdf.setFontSize(8);
    pdf.text(matriz, 175, 265);
    //pdf.text(productor, 220, 280);
    pdf.text(fecha, 448, 263);
    pdf.text(codigo, 175, 280);
    //pdf.text(sampler, 545, 295);
    //pdf.text(infadicional, 220, 315);


    // --- LISTADO ORGANIZADO ---
    let startY = 335;   
    let lineHeight = 10; 

    pdf.setFontSize(9);

    // --- MULTIRESIDUO ---
    if (multiresiduo.trim() !== "") {
    pdf.text("Multiresiduos:", 60, startY);
    startY += lineHeight;
    pdf.text("- " + multiresiduo, 75, startY);
    startY += lineHeight + 7; 
    }

    // --- DITIOS ---
    if (ditios.trim() !== "") {
    pdf.text("Ditios:", 60, startY);
    startY += lineHeight;
    pdf.text("- " + ditios, 75, startY);
    startY += lineHeight + 7;
    }

    // --- MICOTOXINAS ---
    if (micotoxinaSeleccionada.trim() !== "") {
    pdf.text("Micotoxinas:", 60, startY);
    startY += lineHeight;
    pdf.text("- " + micotoxinaSeleccionada, 75, startY);
    startY += lineHeight + 7;
    }

    // --- METALES ---
    const metals = [
    'antimonio', 'arsenico', 'boro', 'cadmio', 'cinc', 'cobre','cromo',
    'estaño','hierro','magnesio','manganeso','mercurio','plata','plomo',
    'selenio','sodio','potasio'
    ];

    const selectedValues = metals
    .filter(metalId => document.getElementById(metalId).checked)  
    .map(metalId => document.getElementById(metalId).value)  
    .filter(value => value.trim() !== '');
    
    if (selectedValues.length > 0) {
    pdf.text("Metales:", 60, startY);
    startY += lineHeight;
    pdf.text("- " + selectedValues.join(", "), 70, startY);
    startY += lineHeight + 7; 
    }

    // --- OTROS ---
    const otrosIds = [
    "glyfo","fosetyl","MINO","clorato","diquat",
    "oxEtil","acrilamida","amitraz","gmo","patulina","doscuatroD"
    ];

    const otrosSeleccionados = otrosIds
    .map(id => {
        const el = document.getElementById(id);
        return el && el.checked ? el.value : null;
    })
    .filter(v => v !== null);

    if (otrosSeleccionados.length > 0) {
    pdf.text("Otros:", 60, startY);
    startY += lineHeight;
    otrosSeleccionados.forEach(o => {
        pdf.text("- " + o, 75, startY);
        startY += lineHeight;
    });
    startY += 7;
    }
    

    const orgSi = document.getElementById('OrgSi');
    const orgNo = document.getElementById('OrgNo');
    if (orgSi.checked) {
    pdf.text('X', 358, 488); 
    }
    if (orgNo.checked) {
    pdf.text('X', 448, 488); 
    }
    pdf.setFontSize(10);
    if (document.getElementById("normal").checked) {
    pdf.text("X", 157, 548);  
    } else if (document.getElementById("express").checked) {
    pdf.text("X", 292, 548);  
    }
 

    pdf.setFontSize(8);
    const maxWidth = 450; 
    const lines = pdf.splitTextToSize(anotaciones, maxWidth);  
    pdf.text(lines, 125, 514); 
   
    pdf.text(fechaenvio, 240, 584);
    pdf.text(enviante, 435, 584);
  

    pdf.save("Solicitud_Analisis_PRIMORIS.pdf");
}
