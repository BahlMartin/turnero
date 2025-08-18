addEventListener("DOMContentLoaded",()=>{
    btnagregarpaciente.addEventListener("click",agregarpaciente);
});

function agregarpaciente() {
    const formulario = document.getElementById('miFormulario');
    const formularioData = new FormData(formulario);
    
    paciente = {
        nombre: formularioData.get('nombre'),
        apellido: formularioData.get('apellido'),
        dni: formularioData.get('dni'),
    }
}
