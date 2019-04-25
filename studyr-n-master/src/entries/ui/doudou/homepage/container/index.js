import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, NativeModules, AsyncStorage, SwipeableFlatList,StyleSheet,Dimensions } from "react-native";
import { StackActions } from "react-navigation";
import Storage from 'react-native-storage';
import image1 from "../../../../../assets/images/home_01.png"
import image2 from "../../../../../assets/images/guanyu.png"
import image3 from "../../../../../assets/images/home_03.png"
import AlarmCell from './alarmCell'
import * as Progress from 'react-native-progress';
const AlarmManager = NativeModules.AlarmManager;


var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
})
// 全局变量
global.storage = storage

export default class HomeController extends PureComponent {

    constructor(props) {
        super(props);
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        this.state = { listData:[],
                       secondValue:0,
                       minuteRotate:-90 + minute * 6 + (second / 60) * 6,
                       hourRotate: -90 + (hour % 12) * 30 + (minute / 60) * 30,
                       };

        // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {

        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        this.setState({secondValue:second,
                       minuteRotate: -90 + minute * 6 + (second / 60) * 6,
                       hourRotate: -90 + (hour % 12) * 30 + (minute / 60) * 30});
        
      }, 1000);
    
    this.getDataFromStorage();
      
    }

    
    getDataFromStorage = async () => {
        
        //这种方式在第一次进来时去本地取数据会发生警告，表示没有相应数据
        // let list = await storage.load({
        //     key:'alarmData',
            
        // })

        // if (list.length){
        //     this.setState({listData:list});
        // }

        storage.load({
            key:'alarmData',
        }).then(ret => {
            this.setState({listData:ret});
        }).catch(err => {

        })
        
    }

    clickRightItem(){
        this.props.navigation.dispatch(
            StackActions.push({
              routeName: "About",
             
            })
          );
    }

    clickAddBtn(){
        this.props.navigation.dispatch(
            StackActions.push({
              routeName: "AlarmSet",
              params:{
                index:-1,
                refresh:()=>{
                    this.getDataFromStorage();
                }
              }
            })
          );
    }

    clickAlarmCell(index){
        
        this.props.navigation.dispatch(
            StackActions.push({
              routeName: "AlarmSet",
              params:{
                index:index,
                refresh:()=> {
                    this.getDataFromStorage();
                }
              }
            })
          );

    }

    clickSwitchView(index,value){
        //设置数据到本地
        let list = this.state.listData;
        list[index]['open']= value;
        global.storage.save({
                key: 'alarmData',
                data: list,
                expires:null
        });  

        //添加闹钟本地推送
        if(value == true){      
            var timeStr = '';
            if(list[index]['open'] == 'PM'){
                    var hourInt = Number(list[index]['hour']) + 12;
                    timeStr = String(hourInt) + ':' + list[index]['minute'];
                    // if(hourInt == 24){
                    //         timeStr = '00' + ':' + list[index]['minute'];
                    // }
            }else{
                    timeStr = list[index]['hour'] + ':' + list[index]['minute'];
            }
            AlarmManager.openAlarmWithTime(timeStr,
                list[index]['repeat'],
                list[index]['alarmSound'],
                list[index]['closeMode'],
                list[index]['remark'],
                String(index));
        }else{//删除闹钟
            var timeStr = '';
            if(list[index]['open'] == 'PM'){
                    var hourInt = Number(list[index]['hour']) + 12;
                    timeStr = String(hourInt) + ':' + list[index]['minute'];
            }else{
                    timeStr = list[index]['hour'] + ':' + list[index]['minute'];
            }
            AlarmManager.deleteAlarmWithTime(timeStr,String(index));
        }
    }

    deleteData(index){
        //删除数据并存储到本地
        let list = this.state.listData;
        
        //删除闹钟
        var timeStr = '';
        if(list[index]['open'] == 'PM'){
                var hourInt = Number(list[index]['hour']) + 12;
                timeStr = String(hourInt) + ':' + list[index]['minute'];
        }else{
                timeStr = list[index]['hour'] + ':' + list[index]['minute'];
        }
        AlarmManager.deleteAlarmWithTime(timeStr,String(index));

        list.splice(index,1);
        this.setState({listData:list});
        global.storage.save({
            key: 'alarmData',
            data: list,
            expires:null
        });

        

    }

    //侧滑菜单渲染
    getQuickActions = (renderItem) => {
        
        return <View style={styles.quickAContent}>
        <TouchableOpacity
            onPress={() => this.deleteData(renderItem['index'])}
        >
        <View style={styles.quick}>
          <Text style={styles.delete}>删除</Text>
        </View>
        </TouchableOpacity>
        </View>
    };


    render() {
        var {height,width} =  Dimensions.get('window');
        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                    <View style = {{height:64,paddingTop:35,flexDirection:'row'}}>
                            <View  style = {{flex:1,marginLeft:30,flexDirection:'row',justifyContent:'center'}}>
                                    <Text  style = {{fontSize:14}}>闹钟</Text>
                            </View>
                            <TouchableOpacity onPress={this.clickRightItem.bind(this)}>
                                    <Image source={image2} style={{width: 20, height: 20, 
                                    resizeMode:'contain', marginRight:20}}></Image>
                            </TouchableOpacity>
                    </View>

                    <ImageBackground source={image1} style={{width: 213, height: 182,justifyContent:'center', 
                            resizeMode:'contain', marginTop:30, alignSelf:'center',alignItems:'center'}}>
                            <Progress.Circle
                            unfilledColor = "white"
                            color="#F97E43"
                            animated = {false}
                            thickness = {1.5}
                            size = {140}
                            borderWidth = {0}
                            progress={this.state.secondValue/60}
                            showsText = {true}
                            formatText = {() => ''}
                            textStyle={{fontSize:15}}
                            style = {{justifyContent:'center',alignItems:'center'}}>  
                                    <View  style = {{width:70,height:4,borderRadius:2,marginLeft:30,
                                    position: 'absolute',
                                    transform:[{rotate:String(this.state.hourRotate )+ 'deg'}]}}>
                                            <View style = {{width:35,height:4,marginLeft:35,
                                                backgroundColor:'white',borderRadius:2}}>
                                            </View>
                                    </View>
                                    <View  style = {{width:90,height:2,borderRadius:1,marginRight:35,
                                    position: 'absolute',
                                    transform:[{rotate:String(this.state.minuteRotate )+ 'deg'}]}}>
                                            <View style = {{width:45,height:2,marginLeft:45,
                                                backgroundColor:'white',borderRadius:1}}>
                                            </View>
                                    </View>
                                    <View style = {{width:20,height:20,backgroundColor:'#F97E43',position: 'absolute',
                                    justifyContent:"center",alignItems:'center',borderRadius:10}}>
                                            <View style = {{width:6,height:6,backgroundColor:'black',
                                            position: 'absolute',borderRadius:3}}>
                                            </View>
                                    </View>
                            </Progress.Circle>
                            
                    </ImageBackground>

                    <SwipeableFlatList
                            style = {{marginTop:40}}
                            data={this.state.listData}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => <AlarmCell 
                                 time = {item.hour + ':' + item.minute}
                                 timeState = {item.timeState}
                                 switchIsOn = {item.open}
                                 repeat = {item.repeat}
                                 remark = {item.remark}
                                 clickCell ={this.clickAlarmCell.bind(this,index)}
                            switchValueChange = {(value) => this.clickSwitchView(index,value)}>
                            </AlarmCell>
                            }
                            //2创建侧滑菜单
                            renderQuickActions={(renderItem) => this.getQuickActions(renderItem)}//创建侧滑菜单
                            maxSwipeDistance={80}//可展开（滑动）的距离
                            bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果

                    ></SwipeableFlatList>

                    <TouchableOpacity onPress={this.clickAddBtn.bind(this)} style = {{width: 95, height: 95,marginTop:height - 95,position: 'absolute', alignSelf:'center'}}>
                                    <Image source={image3} style={{width: 95, height: 95, 
                                    resizeMode:'contain', marginBottom:20}}></Image>
                            </TouchableOpacity>
            
            </View>
        );
    }
}


const styles = StyleSheet.create({
    
    //侧滑菜单的样式
  quickAContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  quick: {
    backgroundColor: "#F97E43",
    flex: 1,
    alignItems: 'center',//水平靠右
    justifyContent: 'center',//上下居中
    width: 70,
    borderRadius: 5,
    elevation: 5,//漂浮的效果

  },
  delete: {
    color: "white",
  },
});

