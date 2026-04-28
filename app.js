// ── Set global de análisis seleccionados (lo usan las tarjetas del index.html) ──
const analisisSeleccionados = new Set();

function toggleAnalisis(card, value) {
    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        analisisSeleccionados.delete(value);
    } else {
        card.classList.add('selected');
        analisisSeleccionados.add(value);
    }
    actualizarResumen();
    verificarAlertaEspecial(card);
}

function actualizarResumen() {
    const el = document.getElementById('analisis-resumen');
    if (!el) return;
    if (analisisSeleccionados.size === 0) {
        el.innerHTML = '<span style="color:#aaa;">Ningún análisis seleccionado aún.</span>';
    } else {
        const tags = [...analisisSeleccionados].map(v => {
            const code = v.match(/\(([^)]+)\)/);
            const label = code ? code[1] : v.split(' ')[0];
            return `<span class="resumen-tag">${label}</span>`;
        }).join('');
        el.innerHTML = `<span class="resumen-titulo">${analisisSeleccionados.size} análisis seleccionado${analisisSeleccionados.size > 1 ? 's' : ''}:</span>${tags}`;
    }
}

// ── Alertas especiales por tarjeta ──
const alertasEspeciales = {
    'card-mino':  '⚠️ Para este análisis la muestra debe enviarse en <b>frasco de vidrio</b> y con <b>aluminio en la tapa</b> para evitar contacto con materiales plásticos.',
    'card-ethox': '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
    'card-phos':  '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
    'card-sulfi': '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
    'card-vinac': '⚠️ Esta muestra debe enviarse en un <b>empaque herméticamente sellado</b>.',
    'card-cloro': '⚠️ Para este método es necesario enviar la <b>muestra de forma independiente</b>.'
};

function verificarAlertaEspecial(card) {
    if (!card.classList.contains('selected')) return;
    const id = card.id;
    if (id && alertasEspeciales[id]) showInfoPopup(alertasEspeciales[id]);
}

function showInfoPopup(message) {
    if (document.getElementById('__popup_overlay__')) return;
    const overlay = document.createElement('div');
    overlay.id = '__popup_overlay__';
    Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.45)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 9999
    });
    const box = document.createElement('div');
    Object.assign(box.style, {
        background: '#fff', padding: '18px', borderRadius: '10px',
        maxWidth: '480px', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', textAlign: 'left'
    });
    const p = document.createElement('p');
    p.style.margin = '0 0 12px';
    p.innerHTML = message;
    box.appendChild(p);
    const btn = document.createElement('button');
    btn.textContent = 'Entendido';
    Object.assign(btn.style, {
        background: '#3B6D11', color: '#fff', border: 'none',
        padding: '8px 14px', borderRadius: '8px', cursor: 'pointer'
    });
    btn.addEventListener('click', () => document.body.removeChild(overlay));
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

// ── Pestañas ──
function switchAnalisisTab(name, btn) {
    document.querySelectorAll('.analisis-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.analisis-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + name).classList.add('active');
    btn.classList.add('active');
}

// ── Carga imagen para PDF ──
function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            const reader = new FileReader();
            reader.onload = function (event) { resolve(event.target.result); };
            reader.readAsDataURL(this.response);
        }
        xhr.send();
    });
}

// ── Evento submit del formulario ──
window.addEventListener('load', () => {

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const NombreSolicitante = document.getElementById('NombreSolicitante').value;
        const Nit               = document.getElementById('Nit').value;
        const Direccion         = document.getElementById('Direccion').value;
        const Ciudad            = document.getElementById('Ciudad').value;
        const PersonaContacto   = document.getElementById('PersonaContacto').value;
        const TelefonoContacto  = document.getElementById('TelefonoContacto').value;

        let NombreFacturante, NitFacturante, CiudadFacturante, TelefonoFacturante;
        if (document.getElementById('FacturanteSi').checked) {
            NombreFacturante   = NombreSolicitante;
            NitFacturante      = Nit;
            CiudadFacturante   = Ciudad;
            TelefonoFacturante = TelefonoContacto;
        } else {
            NombreFacturante   = document.getElementById('NombreFacturante').value;
            NitFacturante      = document.getElementById('NitFacturante').value;
            CiudadFacturante   = document.getElementById('CiudadFacturante').value;
            TelefonoFacturante = document.getElementById('TelefonoFacturante').value;
        }

        const fact        = document.getElementById('fact').value;
        const matriz      = document.getElementById('matriz').value;
        const fecha       = document.getElementById('fecha').value;
        const codigo      = document.getElementById('codigo').value;
        const anotaciones = document.getElementById('anotaciones').value;
        const fechaenvio  = document.getElementById('fechaenvio').value;
        const enviante    = document.getElementById('enviante').value;

        const todosAnalisis = [...analisisSeleccionados];

        generatePDF(
            NombreSolicitante, Nit, TelefonoContacto, Direccion, Ciudad, PersonaContacto,
            NombreFacturante, NitFacturante, CiudadFacturante, TelefonoFacturante,
            fact, matriz, fecha, codigo,
            todosAnalisis,
            anotaciones, fechaenvio, enviante
        );
    });

    // ── Botón correo ──
    document.getElementById("enviarCorreoBtn").addEventListener("click", function () {
        const nombre = document.getElementById("NombreSolicitante").value.trim();
        if (!nombre) {
            alert("Por favor, completa el campo 'Empresa o persona titular del resultado'.");
            return;
        }
        const destinatarios = "registro@primoris-lab.ec;luz.romero@primoris-lab.ec;christian.velasco@primoris-lab.ec";
        const asunto = `Solicitud de servicio / Demanda de análisis ${nombre}`;
        const cuerpo = `Cordial saludo, Adjunto solicitud de servicio para ...`;
        window.location.href = `mailto:${destinatarios}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    });
});

// ── Generar PDF ──
async function generatePDF(
    NombreSolicitante, Nit, TelefonoContacto, Direccion, Ciudad, PersonaContacto,
    NombreFacturante, NitFacturante, CiudadFacturante, TelefonoFacturante,
    fact, matriz, fecha, codigo,
    todosAnalisis,
    anotaciones, fechaenvio, enviante
) {
    const image = await loadImage("imagenes/FormatoSolicitud2.jpg");
    const pdf = new jsPDF('1', 'pt', [612, 792]);

    pdf.addImage(image, 'PNG', 0, 0, 612, 792);

    // Datos empresa
    pdf.setFontSize(9);
    pdf.text(NombreSolicitante, 130, 155);
    pdf.text(Nit, 448, 155);
    pdf.setFontSize(8);
    pdf.text(Direccion, 130, 165);
    pdf.text(Ciudad, 448, 165);
    pdf.text(PersonaContacto, 130, 175);
    pdf.text(TelefonoContacto, 448, 175);

    // Datos facturante
    pdf.setFontSize(9);
    pdf.text(NombreFacturante, 130, 205);
    pdf.text(NitFacturante, 448, 205);
    pdf.setFontSize(8);
    pdf.text(CiudadFacturante, 130, 217);
    pdf.text(TelefonoFacturante, 448, 217);
    pdf.text(fact, 130, 227);

    // Datos muestra
    pdf.text(matriz, 175, 265);
    pdf.text(fecha, 448, 263);
    pdf.text(codigo, 175, 280);

    // Análisis seleccionados — tabla dos columnas: Código | Descripción
    let startY = 335;
    const lineHeight = 11;
    const colCodigo = 60;
    const colDesc   = 155;
    const colDescW  = 390;

    if (todosAnalisis.length > 0) {
        // Cabecera tabla
        pdf.setFontSize(7.5);
        pdf.setTextColor(120, 120, 120);
        pdf.text("CÓDIGO", colCodigo, startY);
        pdf.text("DESCRIPCIÓN", colDesc, startY);
        startY += 3;
        pdf.setDrawColor(180, 180, 180);
        pdf.setLineWidth(0.4);
        pdf.line(colCodigo, startY, 545, startY);
        startY += lineHeight - 2;
        pdf.setTextColor(0, 0, 0);

        todosAnalisis.forEach((analisis, i) => {
            if (i % 2 === 0) {
                pdf.setFillColor(245, 249, 243);
                pdf.rect(colCodigo - 2, startY - 8, 487, lineHeight + 1, 'F');
            }
            const matchCodigo = analisis.match(/^\(([^)]+)\)/);
            const codigo_pdf  = matchCodigo ? matchCodigo[1] : analisis.split(' ').slice(0,2).join(' ');
            const desc_pdf    = matchCodigo
                ? analisis.replace(/^\([^)]+\)\s*/, '').trim()
                : analisis;

            pdf.setFontSize(8);
            pdf.setFont(undefined, 'bold');
            pdf.text(codigo_pdf, colCodigo, startY);
            pdf.setFont(undefined, 'normal');
            const descLines = pdf.splitTextToSize(desc_pdf, colDescW);
            pdf.text(descLines, colDesc, startY);

            const rowH = Math.max(lineHeight, descLines.length * lineHeight);
            pdf.setDrawColor(220, 220, 220);
            pdf.setLineWidth(0.2);
            pdf.line(colCodigo - 2, startY + 3, 545, startY + 3);
            startY += rowH;
        });
        startY += 6;
    }

    // Orgánico
    const orgSi = document.getElementById('OrgSi');
    const orgNo = document.getElementById('OrgNo');
    if (orgSi && orgSi.checked) pdf.text('X', 358, 488);
    if (orgNo && orgNo.checked) pdf.text('X', 448, 488);

    // Tipo servicio
    pdf.setFontSize(10);
    if (document.getElementById("normal").checked) {
        pdf.text("X", 157, 548);
    } else if (document.getElementById("express").checked) {
        pdf.text("X", 292, 548);
    }

    // Observaciones
    pdf.setFontSize(8);
    const lines = pdf.splitTextToSize(anotaciones, 450);
    pdf.text(lines, 125, 514);

    // Fecha y responsable
    pdf.text(fechaenvio, 240, 584);
    pdf.text(enviante, 435, 584);

    pdf.save("Solicitud_Analisis_PRIMORIS.pdf");
}
