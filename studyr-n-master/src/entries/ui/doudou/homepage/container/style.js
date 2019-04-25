import { StyleSheet } from "react-native";
export default StyleSheet.create({
    firstLayout: {
        height:100,
        flexDirection:"row",
        backgroundColor :"#fff"
    },
    portraitLayout: {
        margin:10,
        width:80,
        height:80,
        borderRadius:3
    },
    buttonStyle:{
        marginTop:20,
        borderRadius: 20,
        height:40,
        justifyContent:'center'
      },
    fontStyle: {
        fontSize:30,
        fontWeight:'bold',
        alignItems: "center",
        justifyContent: "center",
    }
});
