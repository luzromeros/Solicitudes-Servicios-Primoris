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
        let gmo = document.getElementById('gmo').value;
        let anotaciones = document.getElementById('anotaciones').value; // observaciones
        let fechaenvio = document.getElementById('fechaenvio').value;
        let enviante = document.getElementById('enviante').value;
        let normal = document.getElementById('normal').value;
        let express = document.getElementById('express').value;

        
        

        generatePDF( NombreSolicitante, Nit, TelefonoContacto, Direccion, Cuidad, PersonaContacto,NombreFacturante,NitFacturante,DireccionFacturante,CuidadFacturante,TelefonoFacturante, fact,matriz,fecha, codigo,multiresiduo,micotoxinaSeleccionada,ditios,antimonio,arsenico,boro,cadmio,cinc,cobre,cromo,estaño,hierro, magnesio,manganeso,mercurio,plata, plomo,selenio,sodio,potasio,metalesSi
                    ,glyfo,fosetyl,clorato,diquat,oxEtil,acrilamida,amitraz,gmo,anotaciones,fechaenvio,enviante, normal,express
        
                     
            );
    })

});

async function generatePDF(NombreSolicitante, Nit, TelefonoContacto, Direccion, Ciudad,PersonaContacto,NombreFacturante,NitFacturante,DireccionFacturante,CuidadFacturante,TelefonoFacturante,fact, matriz,fecha,codigo, multiresiduo,micotoxinaSeleccionada,ditios,antimonio,arsenico,boro,cadmio,cinc,cobre,cromo,estaño,hierro, magnesio,manganeso,mercurio,plata, plomo,selenio,sodio,potasio, metalesSi
                            ,glyfo,fosetyl,clorato,diquat,oxEtil,acrilamida,amitraz,gmo,anotaciones, fechaenvio, enviante,normal,express
                      
                          
    ) {
    const image = await loadImage("imagenes/FormatoSolicitud2.jpg");
    
    const pdf = new jsPDF('1', 'pt', [612, 792]);

    pdf.addImage(image, 'PNG', 0, 0, 612, 792);
    
    pdf.setFontSize(9);
    pdf.text(NombreSolicitante, 125, 126);
    pdf.text(Nit, 450, 126);
    pdf.text(Direccion, 125, 140);
    pdf.text(Ciudad, 450, 140);
    pdf.setFontSize(7);
    pdf.text(PersonaContacto, 125, 151);
    pdf.setFontSize(7);
    pdf.text(TelefonoContacto, 450, 151);
    pdf.text(CuidadFacturante, 125,209);
    pdf.text('- '+DireccionFacturante, 190, 209);
    pdf.setFontSize(9);
    pdf.text(NombreFacturante, 125, 195);
    pdf.text(NitFacturante, 450, 195);
    pdf.text(TelefonoFacturante, 450,209);
    
    pdf.setFontSize(8);
    pdf.text(fact, 125, 221);

    
    pdf.setFontSize(8);
    pdf.text(matriz, 175, 260);
    //pdf.text(productor, 220, 280);
    pdf.text(fecha, 450, 260);
    pdf.text(codigo, 175, 280);
    //pdf.text(sampler, 545, 295);
    //pdf.text(infadicional, 220, 315);


    
    pdf.setFontSize(9);
    pdf.text(multiresiduo, 60, 335);
    pdf.text(ditios,60,345);
    pdf.text(micotoxinaSeleccionada, 60, 355);
    
    
    // IMPRESION METALES
    const metals = [
        'antimonio', 'arsenico', 'boro', 'cadmio', 'cinc', 'cobre','cromo', 'estaño', 'hierro', 'magnesio', 'manganeso', 'mercurio','plata', 'plomo', 'selenio', 'sodio', 'potasio'];
    
    const selectedValues = metals
    .filter(metalId => document.getElementById(metalId).checked)  
    .map(metalId => document.getElementById(metalId).value)  
    .filter(value => value.trim() !== '')  
    .join(', ');  

    pdf.setFontSize(9);
    pdf.text(selectedValues, 100, 365);
     
    pdf.text(metalesSi.value, 60, 365);

    if (document.getElementById("glyfo").checked) {
        pdf.text(document.getElementById("glyfo").value, 60, 375);  // Ajusta coordenadas
    }
    if (document.getElementById("fosetyl").checked) {
        pdf.text(document.getElementById("fosetyl").value, 60, 385);
    }
    if (document.getElementById("MINO").checked) {
        pdf.text(document.getElementById("MINO").value, 60, 395);
    }
    if (document.getElementById("clorato").checked) {
        pdf.text(document.getElementById("clorato").value, 60, 405);
    }
    if (document.getElementById("diquat").checked) {
        pdf.text(document.getElementById("diquat").value, 60, 415);
    }
    if (document.getElementById("oxEtil").checked) {
        pdf.text(document.getElementById("oxEtil").value, 60, 425);
    }
    if (document.getElementById("acrilamida").checked) {
        pdf.text(document.getElementById("acrilamida").value, 60, 435);
    }
    if (document.getElementById("amitraz").checked) {
        pdf.text(document.getElementById("amitraz").value, 60, 445);
    }
    if (document.getElementById("gmo").checked) {
        pdf.text(document.getElementById("gmo").value, 60, 455);
    }


    const orgSi = document.getElementById('OrgSi');
    const orgNo = document.getElementById('OrgNo');
    if (orgSi.checked) {
    pdf.text('X', 360, 496); // Coordenadas para el "Sí"
    }
    if (orgNo.checked) {
    pdf.text('X', 450, 496); // Coordenadas para el "No"
    }
    pdf.setFontSize(10);
    if (document.getElementById("normal").checked) {
    pdf.text("X", 150, 560);  // Coordenadas para "normal"
    } else if (document.getElementById("express").checked) {
    pdf.text("X", 285, 560);  // Coordenadas para "express"
    }
 

    pdf.setFontSize(8);
    const maxWidth = 450; // ancho máximo
    const lines = pdf.splitTextToSize(anotaciones, maxWidth);  
    pdf.text(lines, 125, 523); 
   
    pdf.text(fechaenvio, 240, 598);
    pdf.text(enviante, 435, 598);
  

    pdf.save("Solicitud_Analisis_PRIMORIS.pdf");
}
