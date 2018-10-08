
/*

*/
import React, {Component} from 'react'
import {StyleSheet,
        View,Text,Image,
        TouchableOpacity,ListView,
        Button,SegmentedControlIOS,
        Dimensions} from 'react-native'
import {detail} from './detail';
import shareData from '../Source/File/content.json'

var kScreenWidth = Dimensions.get('window').width;
var dateType = 'today';

//自定义组件
class CatageoryItem extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
               {this._renderImage()}
            </TouchableOpacity>
        );
    }
    _renderImage() {
        return(
          <View style={styles.itemBg}>
            <Image 
             style={styles.itemImg}
             source={this.props.source}
            ></Image>
            <Text style={styles.itemTitle}>
             {this.props.title}
            </Text>
            <Text style={styles.itemMonth}>
             {this.props.month}
            </Text>
          </View>
           
        );
    }
}

export class home extends React.Component {

    static navigationOptions = {
        header: null
    }
   
    constructor(props) {
        super(props);
        //初始状态
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2
            }),
            typeStr:null,
        };
    }

    _onChange = (event) => {

        if(event.nativeEvent.selectedSegmentIndex == 0) {
            dateType = 'tomorrow';
            console.log(event.nativeEvent.value);
        }else if(event.nativeEvent.selectedSegmentIndex == 1) {
            dateType = 'today';
        }else if(event.nativeEvent.selectedSegmentIndex == 2) {
            dateType = 'week';
        }else if(event.nativeEvent.selectedSegmentIndex == 3) {
            dateType = 'month';
        }else if(event.nativeEvent.selectedSegmentIndex == 4) {
            dateType = 'year';
        }

   }


   _onValueChange = (value) => {
    //    console.log('value change' + value);
       
   }

    render() {
        return (
            <View style={styles.homebg}>

            <Text style={styles.homeTitle}>星座运势</Text>
            
            <SegmentedControlIOS
            style={styles.segmentControl}
               selectedIndex={0}
               onChange={this._onChange}
               onValueChange={this._onValueChange}
               tintColor='red'
               values={['今日','明日','本周','本月','今年']}
            />

            <View style={styles.homeModule}> 
            <ListView
               dataSource={this.state.dataSource}
               renderRow={this._renderRow.bind(this)} //页面跳转
               contentContainerStyle={styles.contentContainerStyle}
            />
            </View>
           

           </View>
            
        );
    }

    componentDidMount() {
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(shareData.Stars)
        })
    }

    _renderRow(rowData) {
        return(
            <CatageoryItem
                source={require('../Source/Img/img.jpeg')}
                style={styles.tianpingItem}
                title={rowData.name}
                month={rowData.month}
                onPress = {() => {
                    this.props.navigation.navigate('Detail',{
                        name:rowData.name,
                        dateType:dateType
                    });  //页面跳转
                }}
                
              >
              </CatageoryItem>
        )
    }
}

const styles = StyleSheet.create({
   homebg: {
       flex:1,
       margin:0,
   },
   homeTitle: {
       color:'#333333',
       fontSize:15,
       textAlign:'center',
       marginTop:35,
   },
   homeModule: {
    flex:1,
    flexDirection:'column',
    backgroundColor:'#FC9D99',
    margin:10,
    marginTop:35,
    borderRadius:6,
   },
   segmentControl:{
       left:30,
       top:15,
       width:kScreenWidth-60,
   },
   contentContainerStyle:{
    flexDirection:'column',
    flexWrap:'wrap',
    justifyContent:'space-between',
   },
   itemBg: {
       flexDirection:'row',
       alignItems:'center',
       height:80,
       margin:10,
       marginTop:0,
       justifyContent:'space-evenly',
   },
   itemImg: {
       width:40,
       height:40,
   },
   itemTitle: {
       left:20,
       textAlign:'center',
       color:'white',
       fontSize:13,
   },
   itemMonth: {
    textAlign:'right',
    color:'white',
    fontSize:13,
},

});