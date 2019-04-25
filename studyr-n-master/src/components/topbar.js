import React, { PureComponent, PropTypes } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet, TouchableOpacity
} from "react-native";
import { StackActions } from "react-navigation";
import backIcon from "../assets/images/back.png";
import closeIcon from "../assets/images/close.png";
import {width, unitWidth, titleHeight, statusBarHeight} from '../util/AdapterUtil'
class TopBar extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { leftIsVisible } = this.props;
        let { rightIsVisible } = this.props;
        //是否隐藏左边和右边图标
        let left= leftIsVisible ?
            <TouchableOpacity
            style={topStyles.back_btn}
            onPress={this._goBack.bind(this)} >
            <Image
                style={topStyles.back_icon}
                source={backIcon}/>
        </TouchableOpacity> : <View style={topStyles.back_btn}></View>;

        let right= rightIsVisible ? <TouchableOpacity
            style={topStyles.back_btn}
            onPress={this.rightOnPress.bind(this)}>
            <Image
                style={topStyles.back_icon}
                source={closeIcon}/>
        </TouchableOpacity>: <View style={topStyles.back_btn}></View>;

        return (
            <View>
                <StatusBar
                    backgroundColor={this.props.statusBarBgColor || '#F1F1F1'}
                    barStyle={this.props.barStyle || 'dark-content'}/>
                <View style={[topStyles.titleLayout, this.props.statusBarBgColor ? {backgroundColor :this.props.statusBarBgColor} : {backgroundColor :"#F1F1F1"}]}>
                    {left}
                    <View style={topStyles.title_container}>
                        <Text style={topStyles.title} numberOfLines={1}>{this.props.title}</Text>
                    </View>
                    {right}
                </View>

                <View style={{ height: 1,
                    backgroundColor:"#ccc",
                    transform:[{scaleY:0.5}]
                }}>
                </View>
            </View>
        );
    }

    _goBack() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    rightOnPress() {
        this.props._rightOnPress();
    }
}

const topStyles = StyleSheet.create({

    titleLayout: {
        height: 84,
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
    },
    back_btn: {
        height: 44,
        width:44,
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
    },
    back_icon: {
        height: 20,
        width:20
    },
    title_container: {
        flex:1,
        justifyContent:"center",
        alignItems: "center",
    },
    title: {
        color:"#222222",
        fontSize: 18,
    },
    statusBar: {
        width: width,
        height: statusBarHeight,
        backgroundColor: 'transparent'
    }
});
export default TopBar;
