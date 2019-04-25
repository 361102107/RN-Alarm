import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity,Image,FlatList,NativeModules } from "react-native";
import { StackActions } from "react-navigation";
import backImage from "../../../../../assets/images/close_back.png"
import selectImage from "../../../../../assets/images/soundSelect.png"
const AlarmManager = NativeModules.AlarmManager;
export default class SoundController extends PureComponent {
    constructor(props){
        super(props);
        
        this.state = { 
            soundName:'ringtone_clock',
        };

       
    }

    componentWillMount(){
        this.setState({soundName:this.props.navigation.state.params.soundName});
    }
    handleBackPress() {
        AlarmManager.stopPlaySound();
        this.props.navigation.state.params.selectedSound(this.state.soundName);
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
      }

      clickCell(value){
          this.setState({soundName:value});
          AlarmManager.playSound(value);
      }
    render(){
        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                    <View style = {{height:64,paddingTop:35,flexDirection:'row',backgroundColor:'#1B1B1B'}}>
                            <TouchableOpacity onPress={this.handleBackPress.bind(this)}>
                            <Image source={backImage} style={{width: 20, height: 20, 
                                    resizeMode:'contain',marginLeft:15 }}></Image>
                            </TouchableOpacity>

                            <View  style = {{flex:1,marginRight:35,flexDirection:'row',justifyContent:'center'}}>
                            <Text  style = {{fontSize:14,color:'white'}}>铃声选择</Text>
                            </View>
                    </View>
                    <FlatList
                            data={[
                                    { id: "1", title: 'ringtone_clock'},
                                    { id: "2", title: 'ringtone_crystal'},
                                    { id: "3", title: 'ringtone_getup'},
                                    { id: "4", title: 'ringtone_lighter'},
                                    { id: "5", title: 'ringtone_melody'},
                                    { id: "6", title: 'ringtone_percussion'},
                                    { id: "7", title: 'ringtone_radar'},
                                    { id: "8", title: 'ringtone_rock'},
                                    { id: "9", title: 'ringtone_time'},
                                    { id: "10", title: 'ringtone_waving_flag'},
                                ]}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => <TouchableOpacity onPress={this.clickCell.bind(this, item.title)}>
                                    <View style = {{height:50,flexDirection:'row',
                                    borderBottomColor:'rgba(220,220,220,1)',borderBottomWidth:1,alignItems:'center'}}>
                                        <View  style = {{flex:1,marginLeft:35,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Text style = {{ fontSize:14}}>{item.title}</Text>
                                        </View>
                                        
                                        <View style = {{width:20,height:20,marginRight:15,justifyContent:'center'}}>
                                                <Image source={this.state.soundName == item.title ? selectImage : null} 
                                                style={{width: 20, height: 20, 
                                                resizeMode:'contain'}}>
                                                </Image>
                                        
                                        </View>
                                    </View>
                                    
                                    </TouchableOpacity>}
                    />
            </View>
        );
    }
}