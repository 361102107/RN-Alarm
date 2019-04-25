import React, { Component } from "react";
import { View, TouchableOpacity,Animated } from "react-native";
import { StackActions } from "react-navigation";

export default class SwitchView extends Component {
    constructor(props) {
        super(props);
        this.state = { isLeft: !this.props.isOn,
            fadeAnim: !this.props.isOn ? new Animated.Value(0) : new Animated.Value(20)};
    }

    componentDidMount(){
          
    }

    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
      }

    open(){

    }

    close(){

    }

    clickSwitchView(){
        this.setState({isLeft:!this.state.isLeft})
        Animated.timing(                  // 随时间变化而执行动画
            this.state.fadeAnim,            // 动画中的变量值
            {
              toValue: this.state.isLeft ? 20 : 0,                   // 透明度最终变为1，即完全不透明
              duration: 100,              // 让动画持续一段时间
            }
          ).start();                        // 开始执行动画
          
        this.props.switchValueChange(this.state.isLeft);
    }
    render() {
        let { fadeAnim } = this.state;
        
        return (
            <TouchableOpacity style = {this.props.style} onPress={this.clickSwitchView.bind(this)}>
                <View ref = 'line' style={{width:40,height:3,borderRadius:1.5, 
                    backgroundColor: this.state.isLeft ? 'black' : '#F97E43', flexDirection:"row"}}>
                    <Animated.View style = {{width:20,height:20,borderRadius:10,
                    backgroundColor: this.state.isLeft ? 'black' : '#F97E43',alignSelf:'center',marginLeft:fadeAnim}} >
                    </Animated.View>
                    
                </View>                 
            </TouchableOpacity>
        );
    }
}