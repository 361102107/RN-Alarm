import React, { PureComponent } from "react";
import { View, Text, TextInput, FlatList, StatusBar } from "react-native";
import styles from "./style";
import http from '../../../util/ajax'
import TopBar from "../../../components/topbar";
class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            user: null,
            data: null
        };
    }
    componentDidMount() {
        // let user = global.realm.objects("User").filtered('phone = "13452145875"');
        let user = [{id:1,name:"大的",phone:"123456"},{id:2,name:"小的",phone:"123456"},{id:3,name:"的的",phone:"123456"}];
        let data1= [];
        data1.push({
            id: user[0].id,
            name:user[0].name,
            phone: user[0].phone
        });
        data1.push({
            id: user[1].id,
            name:user[1].name,
            phone: user[1].phone
        });
        this.setState({
            user: user[0].name,
            data: data1
        });
        http.get({
            url:'/videoapi/',
            params:{format:"json",page_name:"coindex",block_sign:"index_index_focus_poster_small",_:"1542857342892"}
        }).then(res=>{
            alert(JSON.stringify((res)))
        })
        // fetch("http://v.baidu.com/videoapi/?format=json&page_name=coindex&block_sign=index_index_focus_poster_small&_=1542857342892",{
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }})
        //     .then((response) => {   // 数据解析方式
        //         if (response.ok) {
        //             return response.json();
        //         }
        //     })
        //     .then((responseData) => {       // 获取到的数据处理
        //         alert(JSON.stringify(responseData));
        //     })
        //     .catch((error) => { // 错误处理
        //         console.error(error);
        //     })
        //     .done();
    }
    _onPressItem = (id: string) => {

    };
    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            title={item.name}
        />
    )
    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={styles.pageBox}>
                <TopBar title = "首页"
                        leftIsVisible = {false}></TopBar>

                    <Text>百度一下,你就知道了</Text>
                    <View>
                        <View style={{padding: 10,flexDirection: 'row'}}>
                            <TextInput
                                style={{height: 40}}
                                onChangeText={(text) => this.setState({text})}
                            />
                            <Text>搜索{JSON.stringify(this.state.data)}</Text>
                        </View>
                        <Text>你好{this.state.user}</Text>
                    </View>

                    <View style={styles.pageBox}>
                            <FlatList
                            renderItem={this._renderItem}
                            data={[{id: '1',name: '小明'}, {id: '2',name: '大明'}]}
                            // data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            />
                    </View>
            </View>
        );
    }
}

class MyListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <View>
                <Text onPress={this._onPress}
                >你好{this.props.title}</Text>
            </View>
        )
    }
}
export default Index;
