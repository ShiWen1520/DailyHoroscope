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

class LabelItem extends React.Component {
    render() {
        return(
            <Text style={styles.labelItem}>
             {this.props.text}
            </Text>
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
            summary:null,
            Qfriend:null,
            allIndex:null,
            colorIndex:null,
            loveIndex:null,
            healthIndex:null,
            moneyIndex:null,
            numberIndex:null,
            workIndex:null,
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

            this.setState({
                summary:data.summary ? data.summary : '',
                // date:data.datetime ? data.datetime : '',
                // allIndex:data.all ? data.all : '',
                // colorIndex:data.color ? data.color : '',
                // loveIndex:data.love ? data.love : '',
                // healthIndex:data.health ? data.health : '',
                // moneyIndex:data.money ? data.money : '',
                // numberIndex:data.number ? data.number : '',
                // Qfriend:data.QFriend ? data.QFriend : '',
                // workIndex:data.work ? data.work : '',
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

        if(!this.state.summary) {
            return this.renderLoadingView;
        }

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

            <View style={styles.labelItemBg}>
            {/* <LabelItem 
              style={styles.allIndex}
              text={'综合指数：' + this.state.allIndex}
            />
            <LabelItem 
              style={styles.Qfriend}
              text={'速配星座：' + this.state.Qfriend}
            />
            <LabelItem 
              style={styles.Qfriend}
              text={'幸运色：' + this.state.colorIndex}
            />
            <LabelItem 
              style={styles.Qfriend}
              text={'恋爱指数：' + this.state.loveIndex}
            />
            <LabelItem 
              style={styles.Qfriend}
              text={'健康指数：' + this.state.healthIndex}
            />
            <LabelItem 
              style={styles.Qfriend}
              text={'财运指数：' + this.state.moneyIndex}
            />
            <LabelItem 
              style={styles.Qfriend}
              text={'幸运数字：' + this.state.numberIndex}
            />
            <LabelItem 
              style={styles.Qfriend}
              text={'工作指数：' + this.state.workIndex}
            /> */}
            </View>
         
             <View style={styles.bottomSpace}></View>
            </ScrollView>
 
          </View>
            
        );
    }

    renderLoadingView(){
        return (
            <View style={styles.loadingBg}>
             <Text style={styles.alertTitle}>
             正在加载电影数据......
             </Text>
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
        top:25,
        left:30,
        width:40,
        height:40,
    },
    name :{
        color:'white',
        fontSize:17,
        textAlign:'left',
        top:-5,
        marginRight:30,
        left:100,
    },
    date: {
        color:'white',
        fontSize:15,
        textAlign:'left',
        top:30,
        marginRight:15,
        left:15,
    },
    summary: {
        color:'white',
        fontSize:15,
        textAlign:'left',
        top:55,
        left:15,
        marginRight:25,
        lineHeight:20,
    },

    //LabelItem
   labelItemBg:{
    flexDirection:'row',
    top:65,
    left:25,
    justifyContent:'space-between',
    // backgroundColor:'red',
    flexWrap:'wrap',
    width:kScreenWidth - 50 - 20,
},
   labelItem: {
    color:'white',
    fontSize:15,
    textAlign:'left',
    marginTop:25,
    width:(kScreenWidth - 50 - 20)/2,
   },

    bottomSpace: {
        top:60,
        height:70,
    },
 
 });