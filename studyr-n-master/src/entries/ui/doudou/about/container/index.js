import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackActions } from "react-navigation";

export default class AboutController extends PureComponent {
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
      }
    render(){
        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                    <View style = {{height:64,paddingTop:35,flexDirection:'row'}}>
                            <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                            <Text  style = {{width:30, fontSize:14, marginLeft:15,color:'black'}}>取消</Text>
                            </TouchableOpacity>

                            <View  style = {{flex:1,marginRight:45,flexDirection:'row',justifyContent:'center'}}>
                            <Text  style = {{fontSize:14,color:'black'}}>关于</Text>
                            </View>
                            </View>
            </View>
        );
    }
}