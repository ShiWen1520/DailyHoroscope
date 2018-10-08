/*

*/
import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'

import {home} from './home'
import {detail} from './detail'

const RootStack = StackNavigator({
    //定义路由
    Home: {
       screen:home,
    },
    Detail: {
       screen:detail,
    },
  },
  {
      //定义配置
      initialRouteName:'Home',// 设置初始路由为Home
  }
    
) 

export default class router extends React.Component {

    render() {
        return <RootStack/>;
    }
}