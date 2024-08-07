import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#fff",
      alignItems: 'center',
      justifyContent: "flex-start",
    },
    
    label: {
        alignItems:"flex-end",
        marginTop:20,
        marginBottom:1,
        fontSize:23
    },
    separator: {
      marginVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    separatorNoLine: {
        marginVertical:10,
    },
    separatorCounter: {
      marginVertical: 15,
      color:"#fff",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 6,
      backgroundColor: '#3a87cc',
    },

    buttonDeactivated: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 6,
      backgroundColor: '#6B6B74',
    },
    buttonLogin: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 6,
      backgroundColor: '#3a87cc',
      width:150

    },
    buttonHome1: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 6,
      backgroundColor: '#2A62F4',
      

    },
    buttonHome2: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 6,
      backgroundColor: '#3356BD',
      

    },
    buttonHome3: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 6,
      backgroundColor: '#0291f7',
      

    },   
    buttonHome4: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      fontSize:1,
      borderRadius: 10,
      elevation: 6,
      backgroundColor: '#14b5de',
    },

    selectorButtonON: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 3,
      borderRadius: 30,
      margin:8,
      elevation: 0,
      shadowOpacity:0,
      marginHorizontal:5,
      backgroundColor: '#14b5de',
    },
    selectorButtonOff: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 3,
      margin:8,
      borderRadius: 30,
      marginHorizontal:5,
      elevation: 12,
      shadowOffset:3,
      backgroundColor: '#6B6B74',
    },

    littleButtonText: {
      fontSize: 14,
      lineHeight: 15,
      fontWeight: "normal",
      letterSpacing: 0.25,
      color: 'white',
      
    },

    buttonText: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      
    },
    textSmall:{
      fontSize:12,
      textAlign :"center",
      textAlignVertical:"center"
    },
    input: {
        borderColor: "gray",
        width: "70%",
        borderWidth: 1,
        margin:10,
        borderRadius: 10,
        padding: 10,
      },

    viewCounter:{
      flexDirection:"row"
    },
    labelCounter:{
      fontSize:20,
      marginTop:1,
      textAlign: "center"
    },
    warningCounter:{
      fontSize:15,
      marginTop:1,
      textAlign: "center"
    },
    inputMemberDetail: {
      borderColor: "gray",
      width: "55%",
      borderWidth: 1,
      margin:10,
      borderRadius: 10,
      padding: 10,
    },
    containerMemberDetails: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'start',
      justifyContent: "flex-start",
      textAlign:"center"
    },
    imageLogin:{
      width: 300, 
      height: 300,
    },

    inputCounterM:{
      borderColor:"blue",
      width:"90%",
      borderWidth:2,
      margin:10,
      borderRadius:10,
      padding:5
    },
    inputCounterF:{
      borderColor:"red",
      width:"90%",
      borderWidth:2,
      margin:10,
      borderRadius:10,
      padding:5
    },
    buttonAlert:{
      borderWidth:10
    },
    textLogin:{
        fontSize:35,
        fontStyle:"italic",
        fontWeight:"bold",
        textAlign:"center"
    },
    textTitle:{
      fontSize:30,
      fontStyle:"italic",
      fontWeight:"bold"
  },
    textLogin2:{
      fontSize:30,
      fontStyle:"italic"
  },
    lists:{
      alignItems:"",
      width:300,
      borderRadius: 4,
    },
    textTitleList:{
      fontWeight: 'bold',
      fontSize: 20,
    },
    textNoTitleList:{
      fontSize: 18,
    }
    ,
    textNoTitleListGreen:{
      fontSize: 18,
      color:"green"
    }
    ,
    textNoTitleListRed:{
      fontSize: 18,
      color:"red"
    },
    textSelector:{
      fontSize:16
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    
    textSelectorTitle:{
      fontWeight:"bold",
      fontSize:18
    },

    viewSelector:{
      width:"50%",
      alignItems:""
    },


    labelTitle:{
        alignSelf:"flex-start",
        padding:10,
        marginLeft:50,
        fontSize:23,
        fontWeight:"bold"
    },
    paragraph:{
      fontSize:20,
      marginBottom:1,
      textAlignVertical:"center"
    },
    dropdown: {
      margin: 16,
      height: 50,
      width:300,
      backgroundColor: 'lightblue',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    tableHeader: { 
      backgroundColor: '#DCDCDC', 
    }, 
    
    dropdownLittle: {
      margin: 10,
      height: 35,
      width:175,
      backgroundColor: 'lightblue',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    textSelector:{
      fontSize:20,
      padding:10
    },
    spaceBetween:{
      justifyContent: 'space-between',
    },
    spaceAround:{
      justifyContent:"space-around"
    },
    containerTable: { 
      flex: 1, 
      padding: 10, 
      justifyContent: 'center', 
      backgroundColor: '#fff' },
    
    head: { 
      height: 44, 
      backgroundColor: 'darkblue' 
    },
    headText: { 
      fontSize: 20, 
      fontWeight: 'bold' , 
      textAlign: 'center', 
      color: 'white' },
    text: { 
      margin: 6, 
      fontSize: 16, 
      fontWeight: 'normal' , 
      alignSelf: 'center',
    },

    textBold: { 
      margin: 6, 
      fontSize: 18, 
      fontWeight: "bold" , 
      textAlign: 'center', 
    },
    
    textNoBold:{
      fontSize:18,
      textAlign :"auto",
      textAlignVertical:"center"
    }

    }
  )