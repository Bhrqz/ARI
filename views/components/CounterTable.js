import React from 'react'; 
import styles from './styles';
import { DataTable } from 'react-native-paper'; 
import { Pressable } from 'react-native';

  
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
          <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color1}` }}></Pressable>
      </DataTable.Header>
      
      

      <DataTable.Header> 
        <DataTable.Title>{props.label2}</DataTable.Title>
        <DataTable.Title>{props.value2}</DataTable.Title> 
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color2}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label3}</DataTable.Title>
        <DataTable.Title>{props.value3}</DataTable.Title> 
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color3}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label4}</DataTable.Title>
        <DataTable.Title>{props.value4}</DataTable.Title> 
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color4}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label5}</DataTable.Title> 
        <DataTable.Title>{props.value5}</DataTable.Title>
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color5}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label6}</DataTable.Title> 
        <DataTable.Title>{props.value6}</DataTable.Title>
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color6}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label7}</DataTable.Title> 
        <DataTable.Title>{props.value7}</DataTable.Title>
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color7}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label8}</DataTable.Title> 
        <DataTable.Title>{props.value8}</DataTable.Title>
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color8}` }}></Pressable> 
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label9}</DataTable.Title> 
        <DataTable.Title>{props.value9}</DataTable.Title>
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color9}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label10}</DataTable.Title> 
        <DataTable.Title>{props.value10}</DataTable.Title> 
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color10}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label11}</DataTable.Title> 
        <DataTable.Title>{props.value11}</DataTable.Title> 
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color11}` }}></Pressable>
      </DataTable.Header>

      <DataTable.Header> 
        <DataTable.Title>{props.label12}</DataTable.Title> 
        <DataTable.Title>{props.value12}</DataTable.Title> 
        <Pressable style={{ borderRadius: 12, margin: 15, width: 30, height: 16, backgroundColor: `${props.color12}` }}></Pressable>
      </DataTable.Header>

       

    </DataTable> 
  ); 
}; 
  
export default CounterTable; 