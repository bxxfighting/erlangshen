import React, {Component} from 'react';
import {Button, Text, TextInput, View} from 'react-native'

export default class KeyInput extends Component {
    render() {
        return (
            <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text>请输入密钥</Text>
                <TextInput style={{width: 120, height: 25, borderColor: 'gray', borderWidth: 1, margin: 3}} placeholder="密钥" />
                <Button title="进入" />
            </View>
        );
    }
}
