import React from 'react'; 
import styles from './styles';
import { DataTable } from 'react-native-paper'; 

  
const CounterTable = (props) => { 
  return ( 
    <DataTable style={styles.container}> 

      <DataTable.Header style={styles.tableHeader}> 
        <DataTable.Title>Categoría</DataTable.Title> 
        <DataTable.Title>Asistentes</DataTable.Title> 
        <DataTable.Title>Color</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header > 
        <DataTable.Title>{props.label1}</DataTable.Title>
        <DataTable.Title>{props.value1}</DataTable.Title>  
        <DataTable.Title>{props.color1}</DataTable.Title> 
      </DataTable.Header>
      
      

      <DataTable.Header> 
        <DataTable.Title>{props.label2}</DataTable.Title>
        <DataTable.Title>{props.value2}</DataTable.Title> 
        <DataTable.Title>{props.color2}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label3}</DataTable.Title>
        <DataTable.Title>{props.value3}</DataTable.Title> 
        <DataTable.Title>{props.color3}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label4}</DataTable.Title>
        <DataTable.Title>{props.value4}</DataTable.Title> 
        <DataTable.Title>{props.color4}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label5}</DataTable.Title> 
        <DataTable.Title>{props.value5}</DataTable.Title>
        <DataTable.Title>{props.color5}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label6}</DataTable.Title> 
        <DataTable.Title>{props.value6}</DataTable.Title>
        <DataTable.Title>{props.color6}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label7}</DataTable.Title> 
        <DataTable.Title>{props.value7}</DataTable.Title>
        <DataTable.Title>{props.color7}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label8}</DataTable.Title> 
        <DataTable.Title>{props.value8}</DataTable.Title>
        <DataTable.Title>{props.color8}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label9}</DataTable.Title> 
        <DataTable.Title>{props.value9}</DataTable.Title>
        <DataTable.Title>{props.color9}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label10}</DataTable.Title> 
        <DataTable.Title>{props.value10}</DataTable.Title> 
        <DataTable.Title>{props.color10}</DataTable.Title>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label11}</DataTable.Title> 
        <DataTable.Title>{props.value11}</DataTable.Title> 
        <DataTable.Title>{props.color11}</DataTable.Title> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label12}</DataTable.Title> 
        <DataTable.Title>{props.value12}</DataTable.Title> 
        <DataTable.Title>{props.color12}</DataTable.Title> 
      </DataTable.Header>

       

    </DataTable> 
  ); 
}; 
  
export default CounterTable; 