import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Modal,TouchableOpacity,Image,TextInput,Picker,NativeModules } from "react-native";
import { StackActions } from "react-navigation";
import indicatorImage from "../../../../../assets/images/indicator.png"
import image1 from "../../../../../assets/images/alarmSet_01.png"
import image2 from "../../../../../assets/images/alarmSet_02.png"
import Storage from 'react-native-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const AlarmManager = NativeModules.AlarmManager;

export default class AlarmSetController extends PureComponent {
    constructor(props){
        super(props);
        var date = new Date();
        var hour = date.getHours()%12;
        var minute = date.getMinutes();
        var hourStr = String(hour)
        var minuteStr =  String(minute)
        if(hour < 10){
                hourStr = '0' + String(hour);
        }
        if(minute < 10){
                minuteStr = '0' + String(minute);
        }

        this.state = { 
                chosenDate: new Date(),
                listData:[],
                remark:'',
                modalVisible:false,
                currentRepeat:'周末',
                dateTitle:date.getHours() < 12 ? 'AM' : 'PM',
                dateHour:hourStr,
                dateMinute:minuteStr,
                isOpen:'true',
                modeIndex:-1,//表示进来时是增加还是修改
                closeMode:'默认',
                soundName:"ringtone_clock"
        };
        this.setDate = this.setDate.bind(this);

        
    }

    componentWillMount(){
        this.getDataFromStorage();
    }

    getDataFromStorage = async () => {

        storage.load({
                key:'alarmData',
            }).then(list => {
                let index = this.props.navigation.state.params.index;
                
                if(index != -1){//修改闹钟,状态赋值
                        let item = list[index];
                        this.setState({
                                listData:list,
                                remark:item.remark,
                                currentRepeat:item.repeat,
                                dateTitle:item.timeState,
                                dateHour:item.hour,
                                dateMinute:item.minute,
                                isOpen:item.open,
                                modeIndex:index,
                                closeMode:item.closeMode,
                                soundName:item.alarmSound,
                        });
                }else{//增加闹钟
                        this.setState({
                                listData:list,
                                
                        });
                }
            }).catch(err => {
    
            })

//这种方式在第一次进来时去本地取数据会发生警告，表示没有相应数据
        // let index = this.props.navigation.state.params.index;
        // let list = await storage.load({
        //         key:'alarmData'
        //     })
        // let item = list[index];
        
        // if(index != -1){//修改闹钟,状态赋值
        //         this.setState({
        //                 listData:list,
        //                 remark:item.remark,
        //                 currentRepeat:item.repeat,
        //                 dateTitle:item.timeState,
        //                 dateHour:item.hour,
        //                 dateMinute:item.minute,
        //                 isOpen:item.open,
        //                 modeIndex:index,
        //                 closeMode:item.closeMode,
        //                 soundName:item.alarmSound,
        //         });
        // }else{//增加闹钟
        //         this.setState({
        //                 listData:list,
                        
        //         });
        // }
        
    }

    clickSureBtn(){
        let list = this.state.listData;
         //添加闹钟本地推送
         if(this.state.isOpen){
                var timeStr = '';
                if(this.state.dateTitle == 'PM'){
                        var hourInt = Number(this.state.dateHour) + 12;
                        timeStr = String(hourInt) + ':' + this.state.dateMinute;
                }else{
                        timeStr = this.state.dateHour + ':' + this.state.dateMinute;
                }
                var index = 0;
                if (this.state.modeIndex == -1){
                        index = list.length;
                }else{
                        index = this.state.modeIndex;
                }
                AlarmManager.openAlarmWithTime(timeStr,
                        this.state.currentRepeat,
                        this.state.soundName,
                        this.state.closeMode,
                        this.state.remark,
                        String(index));
                
        }
        
        if(this.state.modeIndex != -1){//修改闹钟
            list.splice(this.state.modeIndex,1,{
                id:String(this.state.modeIndex),
                hour:this.state.dateHour,
                minute:this.state.dateMinute,
                open:this.state.isOpen,
                timeState:this.state.dateTitle,
                repeat:this.state.currentRepeat,
                remark:this.state.remark,
                closeMode:this.state.closeMode,
                alarmSound:this.state.soundName,
            });
        }else{//增加闹钟
            list.push({
                    id:String(list.length),
                    hour:this.state.dateHour,
                    minute:this.state.dateMinute,
                    open:this.state.isOpen,
                    timeState:this.state.dateTitle,
                    repeat:this.state.currentRepeat,
                    remark:this.state.remark,
                    closeMode:this.state.closeMode,
                    alarmSound:this.state.soundName,
                });
            
        }
        
        global.storage.save({
                key: 'alarmData',
                data: list,
                expires:null
        });

        this.handleBackPress();
}

    setDate(newDate) {
        this.setState({chosenDate: newDate});
      }

    handleBackPress() {
        this.props.navigation.state.params.refresh();
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
      }

    clickCell(index){
        if(index == 1){
                this.showModal(true);
        }else if(index == 2){
                this.props.navigation.dispatch(
                        StackActions.push({
                          routeName: "Sound",
                          params:{
                                soundName:this.state.soundName,
                                selectedSound:(value)=> {
                                        this.selectedAlarmSound(value);
                                    }
                          }
                        })
                      );
        }else if(index == 3){
                this.props.navigation.dispatch(
                        StackActions.push({
                          routeName: "CloseMode",
                          params:{
                                closeMode:this.state.closeMode,
                                selectedMode:(value)=> {
                                        this.selectedCloseMode(value);
                                    }
                          }
                        })
                      );
        }
    }
    selectedAlarmSound(value){
        this.setState({soundName:value});
    }

    selectedCloseMode(value){
        
        this.setState({closeMode:value});
    }

    userInputInfo(value){
        this.setState({remark:value});
    }

    

    showModal(value){
            this.setState({modalVisible:value});
    }

    closeModal(){
            this.showModal(false);
            
    }
    clickModalWithIndex(value){
            this.setState({currentRepeat:value});
            this.closeModal()
    }

    selectedDate(value1,value2,value3){
             
    }

    createHourPicker(){
            var bodyHtml = [];
            for(let i = 0;i < 12;i ++){
                bodyHtml.push(<Picker.Item key = {String(i)} label={i < 10 ? '0' + String(i) : String(i)} value={i < 10 ? '0' + String(i) : String(i)} 
                color = 'white'/>);
            }
            return bodyHtml;
    }

    createMinutePicker(){
        var bodyHtml = [];
        for(let i = 0;i < 60;i ++){
            bodyHtml.push(<Picker.Item key = {String(i)} label={i < 10 ? '0' + String(i) : String(i)} value={i < 10 ? '0' + String(i) : String(i)} 
            color = 'white'/>);
        }
        return bodyHtml;
    }

    createRepeatUI(){
        
        var bodyHtml = [];

        if(this.state.currentRepeat == "只响一次"){
                bodyHtml.push(<Text style = {{color:'#F98141'}}>只响一次</Text>);
        }else if(this.state.currentRepeat == "每天"){
                for(let i = 1;i < 8;i ++){
                        bodyHtml.push(<View key = {String(i)} style = {styles.textStyleCustom}><Text style = {{color:'white'}}>{i}</Text></View>);
                }
        }else if(this.state.currentRepeat == "法定工作日"){
                for(let i = 1;i < 6;i ++){
                        bodyHtml.push(<View key = {String(i)} style = {styles.textStyleCustom}><Text style = {{color:'white'}}>{i}</Text></View>);
                }
        }else if(this.state.currentRepeat == "周末"){
                for(let i = 6;i < 8;i ++){
                        bodyHtml.push(<View key = {String(i)} style = {styles.textStyleCustom}><Text style = {{color:'white'}}>{i}</Text></View>);
                }
        }
        return bodyHtml;
        
    }

    render() {
        
        return (
            <KeyboardAwareScrollView style={{flex:1,backgroundColor: 'white'} }
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
                    <Modal animationType = {'none'} transparent = {true} visible = {this.state.modalVisible}>
                            <View style={{flex:1,justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,0.3)'}}>
                                <View style  = {{marginLeft:10,marginRight:10,marginBottom:20,height:200,
                                        backgroundColor:'white',borderRadius:8,justifyContent:'center'}}>
                                        <TouchableOpacity style = {{height:50,alignItems:'center',flexDirection:'row'}}
                                        onPress={() => this.clickModalWithIndex('只响一次')}>
                                                <Image source={image2} style={{width:10,height: 12,marginLeft:10,
                                                marginRight:10,opacity:this.state.currentRepeat == '只响一次' ? 1 : 0}} 
                                                resizeMode = 'contain'>
                                                </Image>
                                                <Text style = {{height:16}}>只响一次</Text>
                                        </TouchableOpacity>
                                        <View  style = {{height:1,marginLeft:30,marginRight:10,backgroundColor:'#DCDCDC'}}/>
                                        <TouchableOpacity style = {{height:50,alignItems:'center',flexDirection:'row'}}
                                        onPress={() => this.clickModalWithIndex('每天')}>
                                                <Image source={image2} style={{width:10,height: 12,marginLeft:10,
                                                marginRight:10,opacity:this.state.currentRepeat == '每天' ? 1 : 0}} 
                                                resizeMode = 'contain'>
                                                </Image>
                                                <Text style = {{height:16}}>每天</Text>
                                        </TouchableOpacity>
                                        <View  style = {{height:1,marginLeft:30,marginRight:10,backgroundColor:'#DCDCDC'}}/>
                                        <TouchableOpacity style = {{height:50,alignItems:'center',flexDirection:'row'}}
                                        onPress={() => this.clickModalWithIndex('法定工作日')}>
                                                <Image source={image2} style={{width:10,height: 12,marginLeft:10,
                                                marginRight:10,opacity:this.state.currentRepeat == '法定工作日' ? 1 : 0}} 
                                                resizeMode = 'contain'>
                                                </Image>
                                                <Text style = {{height:16}}>法定工作日 </Text>
                                        </TouchableOpacity>
                                        <View  style = {{height:1,marginLeft:30,marginRight:10,backgroundColor:'#DCDCDC'}}/>

                                        <TouchableOpacity style = {{height:50,alignItems:'center',flexDirection:'row'}}
                                        onPress={() => this.clickModalWithIndex('周末')}>
                                                <Image source={image2} style={{width:10,height: 12,marginLeft:10,
                                                marginRight:10,opacity:this.state.currentRepeat == '周末' ? 1 : 0}} 
                                                resizeMode = 'contain'>
                                                </Image>
                                                <Text style = {{height:16}}>周末</Text>
                                        </TouchableOpacity>
                                </View>
                            </View>
                            
                    </Modal>
                    <View style = {{height:300,backgroundColor:'#1B1B1B'}}>
                            <View style = {{height:64,paddingTop:35,flexDirection:'row'}}>
                                    <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                                    <Text  style = {{width:30, fontSize:14, marginLeft:15,color:'white'}}>取消</Text>
                                    </TouchableOpacity>

                                    <View  style = {{flex:1,marginRight:45,flexDirection:'row',justifyContent:'center'}}>
                                    <Text  style = {{fontSize:14,color:'white'}}>设置闹钟</Text>
                                    </View>
                            </View>

                            <View style = {{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Picker selectedValue={this.state.dateTitle}
                                    style={{ height: 50, width: 50,marginLeft:40,justifyContent:'center'}}
                                    onValueChange={(itemValue) => this.setState({dateTitle:itemValue})}>
                                            <Picker.Item label="AM" value="AM" color = '#FFFFFF'/>
                                            <Picker.Item label="PM" value="PM" color = '#FFFFFF'/>
                                    </Picker>
                                    <View style = {{marginRight:90,flexDirection:'row',justifyContent:'center',
                                    alignItems:'center',flex:1}}>
                                            <Picker selectedValue={this.state.dateHour}
                                                style={{ height: 50, width: 50,justifyContent:'center'}}
                                                onValueChange={(itemValue) => this.setState({dateHour:itemValue})}>
                                                {this.createHourPicker()}
                                            </Picker>
                                            <Picker selectedValue={this.state.dateMinute}
                                                style={{ height: 50, width: 50,marginLeft:40,justifyContent:'center'}}
                                                onValueChange={(itemValue) => this.setState({dateMinute:itemValue})}>
                                                {this.createMinutePicker()}
                                            </Picker>
                                    </View>
                                    
                                    
                            </View>
                        
                            
                    </View>
                    <TouchableOpacity style = {{height:70,flexDirection:'row',alignItems:'center',marginLeft:15,marginRight:15}}
                     onPress={() => this.clickCell(1)}>
                            <View style = {{flex:1}}>
                                    <Text>重复周期</Text>
                                    <View style = {{flexDirection:'row',marginTop:10}}>  
                                            {this.createRepeatUI()}    
                                    </View>
                            </View>
                            <Image source={indicatorImage} style={{width: 8, height: 12, 
                                    resizeMode:'contain'}}></Image>

                    </TouchableOpacity>
                    <View style = {{height:1,marginLeft:15,marginRight:15,backgroundColor:'#DCDCDC'}}></View>
                    <TouchableOpacity style = {{height:70,flexDirection:'row',alignItems:'center',marginLeft:15,marginRight:15}}
                     onPress={() => this.clickCell(2)}>
                            <View style = {{flex:1}}>
                                    <Text>闹钟铃声</Text>
                                    <Text style = {{fontSize:12,color:'#DCDCDC',marginTop:5}}>{this.state.soundName}</Text>
                            </View>
                            <Image source={indicatorImage} style={{width: 8, height: 12, 
                                    resizeMode:'contain'}}></Image>

                    </TouchableOpacity>
                    <View style = {{height:1,marginLeft:15,marginRight:15,backgroundColor:'#DCDCDC'}}></View>
                    <TouchableOpacity style = {{height:70,flexDirection:'row',alignItems:'center',marginLeft:15,marginRight:15}}
                     onPress={() => this.clickCell(3)}>
                            <View style = {{flex:1}}>
                                    <Text>关闭方式</Text>
                                    <Text style = {{fontSize:12,color:'#DCDCDC',marginTop:5}}>{this.state.closeMode}</Text>
                            </View>
                            <Image source={indicatorImage} style={{width: 8, height: 12, 
                                    resizeMode:'contain'}}></Image>

                    </TouchableOpacity>
                    <View style = {{height:1,marginLeft:15,marginRight:15,backgroundColor:'#DCDCDC'}}></View>
                    <View style = {{height:50,flexDirection:'row',alignItems:'center',marginLeft:15,marginRight:15}}>
                            <Text>闹钟备注</Text>
                            <View style = {{width:1,height:15,backgroundColor:'#DCDCDC',marginLeft:10,marginRight:10}}>
                            </View>
                            <TextInput placeholder = "输入备注" style = {{width:200, fontSize:12}}
                            onChangeText = {(value) => this.userInputInfo(value)}
                            value = {this.state.remark}>
                            </TextInput>
                    </View>
                    <View style = {{flex:1, justifyContent:'flex-end'}}>
                            <TouchableOpacity style = {{
                                marginBottom:10,alignSelf:'center'}} onPress={this.clickSureBtn.bind(this)}>
                                    <Image source={image1} style={{width:212,height: 85}} resizeMode = 'contain'>
                                    </Image>

                            </TouchableOpacity>
                    </View>
                    
                    
            </KeyboardAwareScrollView>
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
        backgroundColor:'#F98141',
        borderRadius:10,
    },
});