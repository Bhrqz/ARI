//This is just the color picker for the Asistencia Visual preview Report


function colorPicker (selec) {
    switch(selec){
        case "Adolescentes_M":
            return "#1fcc61"
            break
        case "Adolescentes_F":
            return "#e6c3e4"
            break
        case "Parvulos_F":
            return "#d4e3bc"
            break
        case "Parvulos_M":
            return "#c1f5d5"
            break
        case "Primarios_F":
            return "#d4cf6e"
            break
        case "Primarios_M":
            return "#6bed9d"
            break
        case "Principiantes_F":
            return "#d1a3ca"
            break
        case "Principiantes_M":
            return "#aaeff2"
            break
        case "Sala_Cuna_F":
            return "#ed74db"
            break
        case "Sala_Cuna_M":
            return "#05e9f5"
            break
        case "Principiantes_M":
            return "#79a8f2"
            break
        case "Salon_Principal_F":
            return "#f25572"
            break
        case "Salon_Principal_M":
            return "#0a62f0"
            break
        
    }
}

export default colorPicker