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
        let Ciudad = document.getElementById('Ciudad').value;
        let PersonaContacto = document.getElementById('PersonaContacto').value;
        let TelefonoContacto = document.getElementById('TelefonoContacto').value;
        let NombreFacturante = document.getElementById('NombreFacturante').value;
        let NitFacturante = document.getElementById('NitFacturante').value;
        let CiudadFacturante = document.getElementById('CiudadFacturante').value;
        let TelefonoFacturante = document.getElementById('TelefonoFacturante').value;
        var error= document.getElementById('error');

        if (document.getElementById('FacturanteSi').checked) {
            NombreFacturante = NombreSolicitante
            NitFacturante= Nit
            CiudadFacturante= Ciudad
            TelefonoFacturante= TelefonoContacto

        } else {
            NombreFacturante = NombreFacturante
            NitFacturante= NitFacturante 
            CiudadFacturante= CiudadFacturante  
            TelefonoFacturante= TelefonoFacturante                  
        }

        if (document.getElementById('FacturanteNo').checked) {
            NombreFacturante = NombreFacturante
            NitFacturante= NitFacturante 
            CiudadFacturante= CiudadFacturante  
            TelefonoFacturante= TelefonoFacturante

        } else {
            NombreFacturante = NombreSolicitante
            NitFacturante= Nit
            CiudadFacturante= Ciudad
            TelefonoFacturante =TelefonoContacto
        }

        let fact = document.getElementById('fact').value;
        let matriz = document.getElementById('matriz').value;
        let fecha= document.getElementById('fecha').value;
        let codigo= document.getElementById('codigo').value;

        let multiresiduo = document.getElementById('multiresiduo').value;
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

        let acrilamida = document.getElementById('acrilamida').checked ? document.getElementById('acrilamida').value : '';
        let AFL = document.getElementById('AFL').checked ? document.getElementById('AFL').value : '';
        let AFLM = document.getElementById('AFLM').checked ? document.getElementById('AFLM').value : '';
        let AFLOTA = document.getElementById('AFLOTA').checked ? document.getElementById('AFLOTA').value : '';
        let amitraz = document.getElementById('amitraz').checked ? document.getElementById('amitraz').value : '';
        let bromuro = document.getElementById('bromuro').checked ? document.getElementById('bromuro').value : '';
        let ciromazina = document.getElementById('ciromazina').checked ? document.getElementById('ciromazina').value : '';
        let clorato = document.getElementById('clorato').checked ? document.getElementById('clorato').value : '';
        let cloratos = document.getElementById('cloratos').checked ? document.getElementById('cloratos').value : '';
        let cloruro = document.getElementById('cloruro').checked ? document.getElementById('cloruro').value : '';
        let cloro = document.getElementById('cloro').checked ? document.getElementById('cloro').value : '';
        let DIOX_PCBDs = document.getElementById('DIOX_PCBDs').checked ? document.getElementById('DIOX_PCBDs').value : '';
        let ditios = document.getElementById('ditios').checked ? document.getElementById('ditios').value : '';
        let ditiosLow = document.getElementById('ditiosLow').checked ? document.getElementById('ditiosLow').value : '';
        let DTCAN = document.getElementById('DTCAN').checked ? document.getElementById('DTCAN').value : '';
        let DON = document.getElementById('DON').checked ? document.getElementById('DON').value : '';
        let doscuatroD = document.getElementById('doscuatroD').checked ? document.getElementById('doscuatroD').value : '';
        let ETH = document.getElementById('ETH').checked ? document.getElementById('ETH').value : '';
        let ETHOX = document.getElementById('ETHOX').checked ? document.getElementById('ETHOX').value : '';
        let FAL = document.getElementById('FAL').checked ? document.getElementById('FAL').value : '';
        let FLON = document.getElementById('FLON').checked ? document.getElementById('FLON').value : '';
        let FLUO = document.getElementById('FLUO').checked ? document.getElementById('FLUO').value : '';
        let FOLP = document.getElementById('FOLP').checked ? document.getElementById('FOLP').value : '';
        let fosetyl = document.getElementById('fosetyl').checked ? document.getElementById('fosetyl').value : '';
        let FUM = document.getElementById('FUM').checked ? document.getElementById('FUM').value : '';
        let GCCAN = document.getElementById('GCCAN').checked ? document.getElementById('GCCAN').value : '';
        let GGA = document.getElementById('GGA').checked ? document.getElementById('GGA').value : '';
        let GMOS = document.getElementById('GMOS').checked ? document.getElementById('GMOS').value : '';
        let LCCAN = document.getElementById('LCCAN').checked ? document.getElementById('LCCAN').value : '';
        let LHR = document.getElementById('LHR').checked ? document.getElementById('LHR').value : '';
        let MC1 = document.getElementById('MC1').checked ? document.getElementById('MC1').value : '';
        let MEL = document.getElementById('MEL').checked ? document.getElementById('MEL').value : '';
        let MINO = document.getElementById('MINO').checked ? document.getElementById('MINO').value : '';
        let NEG = document.getElementById('NEG').checked ? document.getElementById('NEG').value : '';
        let NIT = document.getElementById('NIT').checked ? document.getElementById('NIT').value : '';
        let NITRI = document.getElementById('NITRI').checked ? document.getElementById('NITRI').value : '';
        let OTA = document.getElementById('OTA').checked ? document.getElementById('OTA').value : '';
        let PAH = document.getElementById('PAH').checked ? document.getElementById('PAH').value : '';
        let patulina = document.getElementById('patulina').checked ? document.getElementById('patulina').value : '';
        let PER = document.getElementById('PER').checked ? document.getElementById('PER').value : '';
        let PHOS = document.getElementById('PHOS').checked ? document.getElementById('PHOS').value : '';
        let QU1 = document.getElementById('QU1').checked ? document.getElementById('QU1').value : '';
        let QU2 = document.getElementById('QU2').checked ? document.getElementById('QU2').value : '';
        let RAD1 = document.getElementById('RAD1').checked ? document.getElementById('RAD1').value : '';
        let S421 = document.getElementById('S421').checked ? document.getElementById('S421').value : '';
        let SULFA = document.getElementById('SULFA').checked ? document.getElementById('SULFA').value : '';
        let SULFI = document.getElementById('SULFI').checked ? document.getElementById('SULFI').value : '';
        let SULFLU = document.getElementById('SULFLU').checked ? document.getElementById('SULFLU').value : '';
        let VINAC = document.getElementById('VINAC').checked ? document.getElementById('VINAC').value : '';
        let ZEA = document.getElementById('ZEA').checked ? document.getElementById('ZEA').value : '';

        let anotaciones = document.getElementById('anotaciones').value; // observaciones
        let fechaenvio = document.getElementById('fechaenvio').value;
        let enviante = document.getElementById('enviante').value;
        let normal = document.getElementById('normal').value;
        let express = document.getElementById('express').value;
        
        generatePDF(NombreSolicitante, Nit, TelefonoContacto, Direccion,Ciudad,PersonaContacto,NombreFacturante,NitFacturante,CiudadFacturante,TelefonoFacturante, fact,matriz,fecha, codigo,multiresiduo,antimonio,arsenico,boro,cadmio,cinc,cobre,cromo,estaño,hierro, magnesio,manganeso,mercurio,plata, plomo,selenio,sodio,potasio,metalesSi
                    ,acrilamida,AFL,AFLM,AFLOTA,amitraz,bromuro,ciromazina,clorato,cloratos,cloruro,cloro,DIOX_PCBDs,ditios,ditiosLow,DON,doscuatroD,DTCAN,ETH,ETHOX,FAL,FLON,FLUO,FOLP,fosetyl,FUM,GCCAN,GGA,GMOS,LCCAN,LHR,MC1,MEL,MINO,NEG,NIT,NITRI,OTA,PAH,patulina,PER,PHOS,QU1,QU2,RAD1,S421,SULFA,SULFI,SULFLU,VINAC,ZEA,
                    anotaciones,fechaenvio,enviante,normal,express
            );
    })

function showInfoPopup(message) {
  if (document.getElementById('__popup_overlay__')) return;
  const overlay = document.createElement('div');
  overlay.id = '__popup_overlay__';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  });

  const box = document.createElement('div');
  Object.assign(box.style, {
    background: '#fff',
    padding: '18px',
    borderRadius: '10px',
    maxWidth: '480px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
    textAlign: 'left'
  });

  const p = document.createElement('p');
  p.style.margin = '0 0 12px';
  p.innerHTML = message;
  box.appendChild(p);
  const btn = document.createElement('button');
  btn.textContent = 'Entendido';
  Object.assign(btn.style, {
    background: '#4e9af1',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer'
  });
  btn.addEventListener('click', () => document.body.removeChild(overlay));
  box.appendChild(btn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

const mensajesPopup = {
  MINO: '⚠️ Para este análisis la muestra debe enviarse en <b>frasco de vidrio</b> y con <b>aluminio en la tapa</b> para evitar contacto con materiales plásticos.',
  ETHOX: '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
  PHOS: '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
  SULFI: '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
  VINAC: '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
  cloro: '⚠️ Para este método es necesario enviar la <b>muestra de forma independiente</b>.'
};

// 
Object.entries(mensajesPopup).forEach(([id, mensaje]) => {
  const chk = document.getElementById(id);
  if (chk) {
    chk.addEventListener('change', (e) => {
      if (e.target.checked) {
        showInfoPopup(mensaje);
      }
    });
  } else {
    console.warn(`⚠️ No se encontró el checkbox con id="${id}"`);
  }
});
});

async function generatePDF(NombreSolicitante, Nit, TelefonoContacto, Direccion, Ciudad,PersonaContacto,NombreFacturante,NitFacturante,CiudadFacturante,TelefonoFacturante,fact, matriz,fecha,codigo, multiresiduo,antimonio,arsenico,boro,cadmio,cinc,cobre,cromo,estaño,hierro, magnesio,manganeso,mercurio,plata, plomo,selenio,sodio,potasio, metalesSi
                            ,acrilamida,AFL,AFLM,AFLOTA,amitraz,bromuro,ciromazina,clorato,cloratos,cloruro,cloro,DIOX_PCBDs,ditios,ditiosLow,DON,doscuatroD,DTCAN,ETH,ETHOX,FAL,FLON,FLUO,FOLP,fosetyl,FUM,GCCAN,GGA,GMOS,LCCAN,LHR,MC1,MEL,MINO,NEG,NIT,NITRI,OTA,PAH,patulina,PER,PHOS,QU1,QU2,RAD1,S421,SULFA,SULFI,SULFLU,VINAC,ZEA,
                            anotaciones,fechaenvio,enviante,normal,express                          
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
    pdf.text(CiudadFacturante, 130,217);
    pdf.setFontSize(9);
    pdf.text(NombreFacturante, 130, 205);
    pdf.text(NitFacturante, 448, 205);
    pdf.text(TelefonoFacturante, 448,217);
    pdf.setFontSize(8);
    pdf.text(fact, 130, 227);
    pdf.setFontSize(8);
    pdf.text(matriz, 175, 265);
    pdf.text(fecha, 448, 263);
    pdf.text(codigo, 175, 280);

    // --- LISTADO ORGANIZADO ---
    let startY = 335;   // posición inicial en Y
    let lineHeight = 10; 

    pdf.setFontSize(9);

    // --- MULTIRESIDUO ---
    if (multiresiduo.trim() !== "") {
    pdf.text("Multiresiduos:", 60, startY);
    startY += lineHeight;
    pdf.text("- " + multiresiduo, 75, startY);
    startY += lineHeight + 7; 
    }

    // --- METALES ---
    const metals = [
    'antimonio', 'arsenico', 'boro', 'cadmio', 'cinc', 'cobre','cromo','estaño','hierro','magnesio','manganeso','mercurio','plata','plomo','selenio','sodio','potasio'
    ];

    const selectedValues = metals
    .filter(metalId => document.getElementById(metalId).checked)  
    .map(metalId => document.getElementById(metalId).value)  
    .filter(value => value.trim() !== '');
    
    if (selectedValues.length > 0) {
    pdf.text("Metales:", 60, startY);
    startY += lineHeight;
    pdf.text("                              - " + selectedValues.join(", "), 70, startY);
    startY += lineHeight + 7; 
    }

    // --- OTROS ---
    const otrosIds = ["acrilamida","AFL","AFLM","AFLOTA","amitraz","bromuro","ciromazina","clorato","cloratos","cloruro","cloro","DIOX_PCBDs","ditios","ditiosLow","DON","doscuatroD","DTCAN","ETH","ETHOX","FAL","FLON","FLUO","FOLP","fosetyl","FUM","GCCAN","GGA","GMOS","LCCAN","LHR","MC1","MEL","MINO","NEG","NIT","NITRI","OTA","PAH","patulina","PER","PHOS","QU1","QU2","RAD1","S421","SULFA","SULFI","SULFLU","VINAC","ZEA"
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
    pdf.text('X', 358, 488); // Coordenadas para el "Sí"
    }
    if (orgNo.checked) {
    pdf.text('X', 448, 488); // Coordenadas para el "No"
    }
    pdf.setFontSize(10);
    if (document.getElementById("normal").checked) {
    pdf.text("X", 157, 548);  // Coordenadas para "normal"
    } else if (document.getElementById("express").checked) {
    pdf.text("X", 292, 548);  // Coordenadas para "express"
    }
 
    pdf.setFontSize(8);
    const maxWidth = 450; // ancho máximo
    const lines = pdf.splitTextToSize(anotaciones, maxWidth);  
    pdf.text(lines, 125, 514); 
   
    pdf.text(fechaenvio, 240, 584);
    pdf.text(enviante, 435, 584);
  

    pdf.save("Solicitud_Analisis_PRIMORIS.pdf");
}
