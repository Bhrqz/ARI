import { ActivityIndicator, Text, View, FlatList, Pressable, ScrollView, Alert } from 'react-native';
import React from 'react';

const Consolidadocompo = (props) => {
    


    function dateCreation (date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
    
        const key = `${day}-${month}-${year}`;

        return key
    }

    const getMostRecentCountingReport = (data) => {
        if (!data ) {
            return null;
        }
      
        return data.reduce((mostRecent, current) => {
            const currentFechaReporte = new Date(current["Fecha_Reporte"].seconds * 1000); // Convertir Timestamp a Date
            const mostRecentFechaReporte = new Date(mostRecent["Fecha_Reporte"].seconds * 1000); // Convertir Timestamp a Date
            return currentFechaReporte > mostRecentFechaReporte ? current : mostRecent;
        });
    };

    const mostRecentCountingReport = getMostRecentCountingReport(props.count);
    console.log(mostRecentCountingReport);
    
    console.log(dateCreation(mostRecentCountingReport["Fecha_Reporte"].toDate()))
    return (
        <View>
            <Text>Prueba</Text>
        </View>
    );
}

export default Consolidadocompo;

