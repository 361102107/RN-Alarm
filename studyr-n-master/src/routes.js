import React, { Component, PureComponent } from "react";

import {
    createBottomTabNavigator,
    createStackNavigator, NavigationActions, StackActions
} from "react-navigation";
import { View, Text, Image, StyleSheet,Platform ,DrawerLayoutAndroid} from "react-native";
import welcomScreen from "./entries/welcome";
import HomeScreen from "./entries/home";
import MsgScreen from "./entries/message";
import MyScreen from "./entries/my";
import DouDouScreen from "./entries/ui/doudou/homepage";
import msgIcon from "./assets/images/message.png";
import homeIcon from "./assets/images/home.png";
import myIcon from "./assets/images/my.png";
import connect from "react-redux/es/connect/connect";
import actions from "./models/actions";
import alarmSetScreen from "./entries/ui/doudou/alarmSetPage"
import AboutScreen from "./entries/ui/doudou/about"
import CloseModeScreen from "./entries/ui/doudou/closeMode"
import SoundScreen from "./entries/ui/doudou/soundPage"

const setIcon = function({ ...set }) {
    return (
        <View style={styles.iconbox}>
            <Text style={styles.text} />
            <Image
                source={set.source}
                style={{
                    width: 24,
                    height: 24
                }}
                tintColor={set.focused ? "red" : set.tintColor}
            />
        </View>
    );
};

const TabRoot = createBottomTabNavigator(
    {
        HomeStack: {
                screen: HomeScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "首页",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: homeIcon
                        });
                    }
                };
            }
        },
        Message: {
            screen: MsgScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "消息",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: msgIcon
                        });
                    }
                };
            }
        },
        My: {
            screen: MyScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "我的",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: myIcon
                        });
                    }
                };
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "red"
        }
    }
);

class Drawer extends PureComponent {
    constructor() {
        super();
    }
    render() {
        // var navigationView = (
        //     <View style={{flex: 1, backgroundColor: '#fff'}}>
        //         <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        //     </View>
        // );
        return (
            <DrawerLayoutAndroid
                //抽屉宽度this.propos
                drawerWidth={300}
                //往右边滑出
                drawerPosition={DrawerLayoutAndroid.positions.right}
                //抽屉组件
                renderNavigationView={()=> this.navigationView()}
                //打开是调用
                onDrawerOpen={this.onDrawerOpen}
                //关闭时调用
                onDrawerClose={()=> this.onDrawerClose()}>
                <TabRoot />
            </DrawerLayoutAndroid>
        );
    }

    navigationView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
        )
    }
    onDrawerOpen() {
        alert('open')
    }
    onDrawerClose() {
        alert('close')
    }
}

const newVar = connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(Drawer);

const RootRouter = createStackNavigator(
    {
        Welcom: {
            screen: welcomScreen
        },
        TabRoot: {
            screen: TabRoot
        },
        DouDou: {
            screen: DouDouScreen
        },
        AlarmSet:{
            screen: alarmSetScreen
        },
        About:{
            screen: AboutScreen
        },
        CloseMode:{
            screen: CloseModeScreen
        },
        Sound:{
            screen: SoundScreen
        },
        
        
    },
    {
        navigationOptions: () => {
            return {
                header: null
            };
        }
    }
);

const styles = StyleSheet.create({
    iconbox: {
        position: "relative"
    },
    text: {
        position: "absolute",
        right: -5,
        top: 0,
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: "red"
    }
});

export default class Route extends Component {
    render() {
        return <RootRouter />;
    }
}
