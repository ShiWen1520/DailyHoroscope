/** @format */

import {AppRegistry} from 'react-native';
import router from './Class/router';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => router);
