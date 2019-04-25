import React, { PureComponent } from "react";
// import  PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
import { StackActions } from "react-navigation";
import SwitchView from './switchView'

export default class AlarmCell extends PureComponent {

    

    clickRightItem(){

    }

    createRepeatUI(){
        
        var bodyHtml = [];

        if(this.props.repeat == "只响一次"){
                bodyHtml.push(<Text style = {{color:'rgba(150,150,150,1)'}}>只响一次</Text>);
        }else if(this.props.repeat == "每天"){
                for(let i = 1;i < 8;i ++){
                        bodyHtml.push(<View key = {String(i)} style = {styles.textStyleCustom}><Text style = {{color:'rgba(150,150,150,1)'}}>{i}</Text></View>);
                }
        }else if(this.props.repeat == "法定工作日"){
                for(let i = 1;i < 6;i ++){
                        bodyHtml.push(<View key = {String(i)} style = {styles.textStyleCustom}><Text style = {{color:'rgba(150,150,150,1)'}}>{i}</Text></View>);
                }
        }else if(this.props.repeat == "周末"){
                for(let i = 6;i < 8;i ++){
                        bodyHtml.push(<View key = {String(i)} style = {styles.textStyleCustom}><Text style = {{color:'rgba(150,150,150,1)'}}>{i}</Text></View>);
                }
        }
        return bodyHtml;
        
    }
   
    render() {
        return (
            <View style={{backgroundColor: 'white',paddingLeft:15,paddingRight:15}}>
                    <View style = {{height:0.5,backgroundColor:'#DCDCDC'}}></View>
                    <View style = {{flexDirection:'row'}}>
                            <TouchableOpacity style = {{flex:1,height:110,justifyContent:'center',
                            marginRight:10}} onPress={this.props.clickCell}>
                                    <View style = {{flex:1,height:30,flexDirection:'row',alignItems:'flex-end'}}>
                                            <Text style = {{fontSize:30}}>{this.props.time}</Text>
                                            <Text style = {{fontSize:15}}>  {this.props.timeState}</Text>
                                    </View>
                                    <View style = {{height:40,flexDirection:'row',paddingTop:8,justifyContent:'flex-start'}}>
                                            {this.createRepeatUI()}
                                    </View>
                                    <Text style = {{fontSize:12,marginBottom:10,color:'rgba(150,150,150,1)'}}>{this.props.remark}</Text>
                            </TouchableOpacity>
                            <SwitchView style = {{alignSelf:'center'}}
                            isOn = {this.props.switchIsOn}
                            switchValueChange = {(value) => this.props.switchValueChange(value)}>
                            </SwitchView>

                    </View>
                    <View style = {{height:0.5,backgroundColor:'#DCDCDC'}}></View>
            
            </View>
        );
    }
}


const styles = StyleSheet.create({
    
    textStyleCustom:{
        width:20,
        height:20,
        marginRight:10,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'rgba(150,150,150,1)',
        borderRadius:10,
        borderWidth:1
    },
});