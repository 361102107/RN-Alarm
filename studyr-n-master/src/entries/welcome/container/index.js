import React, { PureComponent } from "react";
import { View, StatusBar,Image } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import styles from "./style";
import image1 from "../../../assets/images/welcom_01.png"
import image2 from "../../../assets/images/welcom_02.png"
import image3 from "../../../assets/images/welcom_03.png"

export default class Welcome extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "DouDou"
                        })
                    ]
                })
            );
        }, 1000);
    }
    render() {
        return (
            <View style={styles.welcomeLayout}>
                <StatusBar
                    backgroundColor={this.props.statusBarBgColor || '#F1F1F1'}
                    barStyle={this.props.barStyle || 'dark-content'}/>
                <Image source={image1} style={{width: 227, height: 133, resizeMode:'contain',marginTop:110}}></Image>
                <Image source={image2} style={{width: 220, height: 210, resizeMode:'contain',marginTop:40}}></Image>
                <View style = {{flex:1,justifyContent:'flex-end'}}>
                        <Image source={image3} style={{width: 115, height: 26, resizeMode:'contain',marginBottom:100}}></Image>
                        </View>
            </View>
        );
    }
}
