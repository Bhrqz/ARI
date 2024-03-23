import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: "flex-start",
    },
    input: {
        borderColor: "gray",
        width: "75%",
        borderWidth: 1,
        margin:10,
        borderRadius: 10,
        padding: 10,
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
      textAlign :"center",
    },
    buttonAlert:{
      borderWidth:10
    },
    textLogin:{
        fontSize:35
    },
    lists:{
      alignItems:"flex-start",
      

    }
    }
  )