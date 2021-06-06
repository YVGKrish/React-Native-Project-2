import axios from 'axios';
import _ from 'underscore';
import config from '../config/Config';
import {AsyncStorage} from 'react-native';
var Utils = function() {};

Utils.prototype.isValidMobile = function (phoneNumber) {
    return phoneNumber && _.isNumber(phoneNumber) && (phoneNumber.toString().length === 10);
};

Utils.prototype.isValidNumber = function(value){
    return /^[0-9]*$/.test(value);
};

Utils.prototype.isValidEmail = function (email) {
    return email && /^\S+@\S+\.\S+/.test(email);
};

Utils.prototype.isValidPassword = function (pwd) {
    return _.isString(pwd) && (pwd.length >= config.appUtils.passwordLength);
};

Utils.prototype.dbCall = function(url, method, header, data, callback){
    let inputParams = {};
    if(method === 'GET'){
        inputParams = { url: config.routes.base + url, method: method, headers: header };
    } else {
        inputParams = { url: config.routes.base + url, method: method, headers: header, data:data };
    }
    axios(inputParams)
    .then((response) => {
        callback(response.data, true);
    })
    .catch((error) => {
        console.log('Error: ' + error + ' = From: ' + url);
        callback(error, false);
    });
};
Utils.prototype.getToken = function(key, callBack){
    AsyncStorage.getItem('chakravarthysir:' + key, (err, resp) => {
        if(err)
            callBack('Error fetching token', false);
        else
            callBack(JSON.parse(resp), true);
    });
};

Utils.prototype.setToken = function(key, value, callBack){
    AsyncStorage.setItem('chakravarthysir:' + key, JSON.stringify(value), (err) => {
        if(err)
            callBack('Error setting token', false);
        else
            callBack(null, true);
    });
};

Utils.prototype.sortByKey = function(array, key) {
    return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

Utils.prototype.splitString = function(value, char){
    return value.split(char);
};

Utils.prototype.regexCheck = function(value, type){
    let alphaRegex = /[^a-zA-Z]+/g;
    if(type === 'string'){
        if(alphaRegex.test(value)){
            return value.replace(alphaRegex, '');
        } else {
            return value;
        }
    }
};


export default new Utils();