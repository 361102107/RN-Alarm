import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions,NativeModules } from "react-native";
import { StackActions } from "react-navigation";
import backImage from "../../../../../assets/images/close_back.png"
import image_u_1 from "../../../../../assets/images/unSelect_01.png"
import image_u_2 from "../../../../../assets/images/unSelect_02.png"
import image_u_3 from "../../../../../assets/images/unSelect_03.png"
import image_s_1 from "../../../../../assets/images/select_01.png"
import image_s_2 from "../../../../../assets/images/select_02.png"
import image_s_3 from "../../../../../assets/images/select_03.png"

export default class CloseMode extends PureComponent {

    constructor(props){
        super(props);
        
        this.state = { 
            currentMode:'默认',
        };

        
    }

    componentWillMount(){
        this.setState({currentMode:this.props.navigation.state.params.closeMode});
    }

    handleBackPress() {
        
        this.props.navigation.state.params.selectedMode(this.state.currentMode);
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
      }

    clickedMode(value){
        this.setState({currentMode:value});

    }
    render(){
        var {height,width} =  Dimensions.get('window');
        let imageWidth = (width - 15 - 15 - 20)/2;
        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                    <View style = {{height:64,paddingTop:35,flexDirection:'row',backgroundColor:'#1B1B1B'}}>
                            <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                            <Image source={backImage} style={{width: 20, height: 20, 
                                    resizeMode:'contain',marginLeft:15 }}></Image>
                            </TouchableOpacity>

                            <View  style = {{flex:1,marginRight:35,flexDirection:'row',justifyContent:'center'}}>
                            <Text  style = {{fontSize:14,color:'white'}}>关闭方式</Text>
                            </View>
                    </View>

                    <View style = {{flexDirection:'row',marginTop:15}}>
                            <TouchableOpacity
                            onPress={() => this.clickedMode('默认')}>
                                    <Image source={this.state.currentMode == '默认'? image_s_1 : image_u_1} style={{width: imageWidth, height: imageWidth,resizeMode:'contain',marginLeft:15 }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => this.clickedMode('答题')}>
                                    <Image source={this.state.currentMode == '答题'? image_s_2 : image_u_2} style={{width: imageWidth, height: imageWidth,resizeMode:'contain',marginLeft:20}}></Image>
                            </TouchableOpacity>
                    </View>
                    <View style = {{flexDirection:'row',marginTop:15}}>
                            <TouchableOpacity
                            onPress={() => this.clickedMode('摇晃')}>
                                    <Image source={this.state.currentMode == '摇晃'? image_s_3 : image_u_3} style={{width: imageWidth, height: imageWidth,resizeMode:'contain',marginLeft:15 }}></Image>
                            </TouchableOpacity>
                            
                    </View>
            </View>
        );
    }
}