import { ActivityIndicator, Text, View, FlatList, Pressable, ScrollView, Alert } from 'react-native';
import React from 'react';
import styles from './styles';

const Separator = () => <View style={styles.separatorCounter} />;

const Consolidadocompo = (props) => {
    
let countDate = "" 
let visitorsNumber = 0  
let visitorsDeclaredNumber = 0 
    
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
                countDate = dateCreation(days["Fecha_Reporte"].toDate())
                const keysToExclude = ["Fecha_Reporte", "id", "Hour"];
                CountToShow = excludeKeys(days, keysToExclude);  

                const sumValues = (object) => {
                    return Object.values(object).reduce((sum, value) => Number(sum) + Number(value), 0);
                  };
                
                CountTotal = sumValues(CountToShow)
            }
        }
    
    for (let element of props.visitors){
        if(dateCreation(element.Fecha_registro.toDate())== countDate){
            visitorsNumber++
            if(element["Declaración de Fe"]){
                visitorsDeclaredNumber++
            }
        }
        
    }

    console.log(CountToShow)
    console.log(CountTotal)
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.viewCounter}>
                    <Text style={styles.text}> Fecha:</Text>
                    <Text style={styles.textNoBold}>{countDate}</Text>
                </View> 
                <View style={styles.viewCounter}>
                    <Text style={styles.text}> Total de Personas:</Text>
                    <Text style={styles.textNoBold}>{CountTotal}</Text>
                </View>
                <View style={styles.viewCounter}>
                    <Text style={styles.text}> Visitantes en el dia:</Text>
                    <Text style={styles.textNoBold}>{visitorsNumber}</Text>
                </View> 
                <View style={styles.viewCounter}>
                    <Text style={styles.text}> Visitantes Declarados:</Text>
                    <Text style={styles.textNoBold}>{visitorsDeclaredNumber}</Text>
                </View> 
            </View>
            <Separator/>

            <View style={styles.container}>
                <Text style={styles.text}> Salon Principal</Text>
                <View style={styles.viewCounter}>
                    <Text>
                        Mujeres: {CountToShow.Salon_Principal_M}
                    </Text>
                    <Text>  /  </Text>
                    <Text>
                        Hombres: {CountToShow.Salon_Principal_F}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Adolescentes</Text>
                <View style={styles.viewCounter}>
                    <Text>
                        Niñas: {CountToShow.Adolescentes_F}
                    </Text>
                    <Text>  /  </Text>
                    <Text>
                        Niños: {CountToShow.Adolescentes_M}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Párvulos</Text>
                <View style={styles.viewCounter}>
                    <Text>
                        Niñas: {CountToShow.Parvulos_F}
                    </Text>
                    <Text>  /  </Text>
                    <Text>
                        Niños: {CountToShow.Parvulos_M}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Primarios</Text>
                <View style={styles.viewCounter}>
                    <Text>
                        Niñas: {CountToShow.Primarios_F}
                    </Text>
                    <Text>  /  </Text>
                    <Text>
                        Niños: {CountToShow.Primarios_M}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Principiantes</Text>
                <View style={styles.viewCounter}>
                    <Text>
                        Niñas: {CountToShow.Principiantes_F}
                    </Text>
                    <Text>  /  </Text>
                    <Text>
                        Niños: {CountToShow.Principiantes_M}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Adolescentes</Text>
                <View style={styles.viewCounter}>
                    <Text>
                        Niñas: {CountToShow.Adolescentes_F}
                    </Text>
                    <Text>  /  </Text>
                    <Text>
                        Niños: {CountToShow.Adolescentes_M}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Sala Cuna</Text>
                <View style={styles.viewCounter}>
                    <Text>
                        Niñas: {CountToShow.Sala_Cuna_F}
                    </Text>
                    <Text>  /  </Text>
                    <Text>
                        Niños: {CountToShow.Sala_Cuna_M}
                    </Text>
                </View>
            </View>


        </ScrollView>
    );
}

export default Consolidadocompo;

