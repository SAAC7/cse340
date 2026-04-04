function changeattributes() {
    const classificationList = document.querySelector("#classificationList");
    
    if (classificationList) {
        // 1. Nos aseguramos que no esté deshabilitado
        classificationList.disabled = false; 
        
        // 2. Aplicamos el "readonly" visual (bloquea clics y teclado)
        classificationList.style.pointerEvents = "none";
        classificationList.style.touchAction = "none"; // Para móviles
        classificationList.setAttribute("tabindex", "-1"); // Evita que lleguen con la tecla Tab
        
        // 3. (Opcional) Un toque visual para que el usuario entienda que no es editable
        classificationList.style.background = "#f0f0f0"; 
    }
}

changeattributes();
