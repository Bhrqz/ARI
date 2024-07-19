import { ActivityIndicator, Text, View, FlatList, Pressable, ScrollView, Alert } from 'react-native';
import React from 'react';
import { useState } from 'react';
import styles from './styles';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



const Consolidadocompo = (props) => {
    
    
    
    /** Esquema del consolidado
     * Total de asistentes
     *      adultos: F M
     *       niños: F M
     *       Visitantes: F M
     *          entregados: F M
     */
    
    let CountToShow = {}
    let CountTotal = 0

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
    
    const excludeKeys = (obj, keysToExclude) => {
        const newObj = { ...obj };
        keysToExclude.forEach(key => {
          delete newObj[key];
        });
        return newObj;
      };

    for (let days of props.count){
        if (dateCreation(days["Fecha_Reporte"].toDate()) == dateCreation(mostRecentCountingReport["Fecha_Reporte"].toDate()))
            {
                const keysToExclude = ["Fecha_Reporte", "id", "Hour"];
                CountToShow = excludeKeys(days, keysToExclude);  

                const sumValues = (object) => {
                    return Object.values(object).reduce((sum, value) => Number(sum) + Number(value), 0);
                  };
                
                CountTotal = sumValues(CountToShow)
            }
        }
    console.log(CountToShow)
    console.log(CountTotal)
        


    return (
        <ScrollView>
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={state.tableData} textStyle={styles.text}/>
                </Table>
            </View>
        </ScrollView>
    );
}

export default Consolidadocompo;

