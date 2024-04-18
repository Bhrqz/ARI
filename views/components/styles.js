import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: "flex-start",
    },
    
    label: {
        alignItems:"flex-end",
        padding:10,
        fontSize:23
    },
    separator: {
      marginVertical: 15,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#3a87cc',
    },
    buttonText: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    text:{
      fontSize:16,
      textAlign :"auto",
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
      textAlign: "center"
    },
    inputMemberDetail: {
      borderColor: "gray",
      width: "50%",
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
    separatorCounter:{
      margin: 15,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },

    buttonAlert:{
      borderWidth:10
    },
    textLogin:{
        fontSize:35
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
      marginBottom:15
    }


    }
  )