/*

*/
import React, {Component} from 'react'
import {StyleSheet,
        View,Text,Image,
        TouchableOpacity,ScrollView,
        Modal,Dimensions} from 'react-native'
import {StackNavigator} from 'react-navigation'

var kScreenWidth = Dimensions.get('window').width
var  kScreenHeight = Dimensions.get('window').height

var labelItems = []

class LabelItem extends React.Component {
    render() {
        return(
            <Text style={styles.labelItem}>
             {this.props.text}
            </Text>
        );
    }
}

class LabelItemList extends React.Component {
    render() {

        var labelItemArr = [];
        for(var i in this.props.labelItemArray) {
            console.log(i);
            var label = (
                <View key = {i}>
                  <LabelItem 
                  text={this.props.labelItemArray[i].title + '：' + this.props.labelItemArray[i].value}
                  />
                </View>
                
            );
            labelItemArr.push(label);
        }

        console.log('labelItemArr' + labelItemArr);

        return(
            <View style={styles.labelItemBg}>
              {labelItemArr}
            </View>
        );
    }
}

export class detail extends React.Component {

    //重构navigationOptions使得可以接收参数
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title:params? params.name : '详情',
            headerTintColor:'black',
            headerTitleStyle: {
                flex:1,
                textAlign:'center',
                fontSize:15,
                fontWeight:'200',
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            summary:'',
            Qfriend:'',
            allIndex:'',
            colorIndex:'',
            loveIndex:'',
            healthIndex:'',
            moneyIndex:'',
            numberIndex:'',
            workIndex:'',
        }

    }

    fetchData(name,dateType) {
        let url = "http://web.juhe.cn:8080/constellation/getAll" + 
        "?consName=" + name + "&type=" + dateType + "&key=dff00ebeef5b3bc1c4bdf51af88c521c"
        
        // let url = "http://image.baidu.com/channel/listjson?pn=0&rn=30&tag1=美女&tag2=街拍&ie=utf8"

        console.log(url);
        
        fetch(url,{
            method:'GET'
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            let data = responseData;

            let all = data.all;

            // if(labelItems.count > 0) {
            //     console.log('数组中有值');
            //     labelItems.splice(0,labelItems.count);
            // }

            if(data) {
                all.length>0 ? labelItems.push({title:'综合指数',value:data.all}) : null;
                // data.color.length>0 ? labelItems.push({title:'幸运色',value:data.color}) : null;
                // data.love.length>0 ? labelItems.push({title:'恋爱指数',value:data.love}) : null;
                // data.health.length>0 ? labelItems.push({title:'健康指数',value:data.health}) : null;
                // data.money.length>0 ? labelItems.push({title:'财运指数',value:data.money}) : null;
                // data.number.length>0 ? labelItems.push({title:'幸运数字',value:data.number}) : null;
                // data.QFriend.length>0 ? labelItems.push({title:'速配星座',value:data.QFriend}) : null;
                // data.work.length>0 ? labelItems.push({title:'工作指数',value:data.work}) : null;
            }

            console.log('labelItems：' + labelItems);

            this.setState({
                summary:data.summary ? data.summary : '',
                date:data.datetime ? data.datetime : '',
                allIndex:data.all ? data.all : '',
                colorIndex:data.color ? data.color : '',
                loveIndex:data.love ? data.love : '',
                healthIndex:data.health ? data.health : '',
                moneyIndex:data.money ? data.money : '',
                numberIndex:data.number ? data.number : '',
                Qfriend:data.QFriend ? data.QFriend : '',
                workIndex:data.work ? data.work : '',
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.fetchData(params.name,params.dateType);
    }

    render() {

        const { params } = this.props.navigation.state;
        return (
          <View style={styles.homebg}>
            
            <ScrollView 
            style={styles.homeModule}
            > 

            <Image 
            style={styles.img} 
            source={require('../Source/Img/img.jpeg')}
            />
            <Text style={styles.name}>
              {params.name}
            </Text>

            <Text style={styles.date}>
              今日运势 {'   (' + this.state.date + ')'}
            </Text>

            <Text style={styles.summary}>
              {'     ' + this.state.summary}
            </Text>

            <LabelItemList labelItemArray={labelItems}></LabelItemList>
         
             <View style={styles.bottomSpace}></View>
            </ScrollView>
 
          </View>
            
        );
    }

}

const styles = StyleSheet.create({

   loadingBg: {
        flex:1,
        margin:0,
        backgroundColor:'red',
   },

   alertTitle:{
        color:'black',
        fontSize:15,
        textAlign:'center',
        top:200,
        left:30,
   },


    homebg: {
        flex:1,
        margin:0,
    },
    homeModule: {
        flex:1,
        backgroundColor:'#FC9D99',
        margin:10,
        marginTop:15,
        borderRadius:6,
    },
    img: {
        marginTop:25,
        marginLeft:30,
        width:40,
        height:40,
    },
    name :{
        color:'white',
        fontSize:17,
        textAlign:'left',
        marginTop:-30,
        marginRight:30,
        marginLeft:100,
    },
    date: {
        color:'white',
        fontSize:15,
        textAlign:'left',
        marginTop:40,   //设置控件之间的距离，最好用marginTop，不要用top
        marginRight:15,
        marginLeft:15,
    },
    summary: {
        color:'white',
        fontSize:15,
        textAlign:'left',
        marginTop:20,
        marginLeft:15,
        marginRight:25,
        lineHeight:20,
    },

    //LabelItem
   labelItemBg:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:25,
    justifyContent:'space-between',
    flexWrap:'wrap',
    width:kScreenWidth - 50 - 20,
    backgroundColor:'red',
},
   labelItem: {
    color:'white',
    fontSize:15,
    textAlign:'left',
    marginBottom:25,
    width:(kScreenWidth - 50 - 20)/2,
   },

    bottomSpace: {
        top:60,
        height:70,
    },
 
 });