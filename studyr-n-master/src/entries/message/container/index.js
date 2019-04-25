import React, { PureComponent } from "react";
import { View, Text,TouchableHighlight,NativeModules,TouchableNativeFeedback,TouchableOpacity,Platform} from "react-native";
import Confirm from "../../../components/confirm";
import styles from "./style";
import { NavigationActions, StackActions } from "react-navigation";
import TopBar from "../../../components/topbar";

var nativeModule = NativeModules.OpenNativeModule;

class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            modalTitle: "提示",
            modalContent: "你是一个大傻逼吗？",
            isVisible: false,
            user: null
        };
    }
    addBook() {}
    componentDidMount() {
        // let user = global.realm.objects("User").filtered('id = 1');
        let user = [{id:1,name:"大的"},{id:2,name:"小的"}];
        this.setState({
            user: user[0].name
        });
    }
    cancelDetailModal() {
        this.setState({
            isVisible: false
        });
    }
    sureDetailModal() {
        this.setState({
            isVisible: false
        });
    }
    openConfirm() {
        this.setState({
            isVisible: true
        });
    }
    openNative() {
        //跳转原生页面
       nativeModule.openNativeVC();
    }
    openListView() {
        // this.props.navigation.dispatch(StackActions.popToTop());
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'DouDou',
            })
        );
    }
    render() {
        return (
            <View style={styles.pageBox}>
                <TopBar title = "消息"
                        leftIsVisible = {false}></TopBar>
                <View>
                    <View style={{flexDirection: 'row',padding: 10}}>
                        <Text style={styles.fontStyle}>{this.state.user}</Text>
                        <Text style={styles.fontStyleRed}>视频列表!</Text>
                    </View>
                    <View style={{width:260,height:40, marginLeft:10,
                        marginBottom: 30,backgroundColor:'gray'}}>
                        <TouchableHighlight onPress={this.openConfirm.bind(this)} underlayColor="red">
                            <View style={[styles.button,{marginLeft:0,marginBottom: 0}]}>
                                <Text style={styles.fontStyleRed}>对话框</Text>
                            </View>
                        </TouchableHighlight>
                     </View>

                    <TouchableNativeFeedback onPress={this.openNative.bind(this)}
                                             background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>点击跳转原生</Text>
                        </View>
                    </TouchableNativeFeedback>


                    <TouchableOpacity onPress={this.openListView.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>点击跳转list</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Confirm
                    cancelClick={this.cancelDetailModal.bind(this)}
                    sureClick={this.sureDetailModal.bind(this)}
                    isVisible={this.state.isVisible}
                    title={this.state.modalTitle}
                    content={this.state.modalContent}
                />
            </View>
        );
    }
}
export default Index;
