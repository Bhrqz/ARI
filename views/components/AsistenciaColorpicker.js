//This is just the color picker for the Asistencia Visual preview Report


function colorPicker (selec) {
    switch(selec){
        case "Adolescentes_M":
            return "#82406c"
            break
        case "Adolescentes_F":
            return "#d40f92"
            break
        case "Parvulos_F":
            return "#911bcc"
            break
        case "Parvulos_M":
            return "#be7ede"
            break
        case "Primarios_F":
            return "#3f2de0"
            break
        case "Primarios_M":
            return "#7c74c4"
            break
        case "Principiantes_F":
            return "#16c5d9"
            break
        case "Principiantes_M":
            return "#aaeff2"
            break
        case "Sala_Cuna_F":
            return "#16d94a"
            break
        case "Sala_Cuna_M":
            return "#7dd494"
            break
        case "Salon_Principal_F":
            return "#8f2c2c"
            break
        case "Salon_Principal_M":
            return "#c92626"
            break
        
    }
}

export default colorPicker