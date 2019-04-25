import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import TopBar from "../../../components/topbar";

export default class Index extends PureComponent {
    constructor() {
        super();
    }
    render() {
        return (
            <View>
                <TopBar title = "我的"
                        leftIsVisible = {false}></TopBar>
                <Text>my</Text>
            </View>
        );
    }
}
