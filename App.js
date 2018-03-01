import React, {Component} from 'react';
import {FlatList, ListView, Alert, Button, Text, TextInput, View} from 'react-native';
import {StackNavigator} from 'react-navigation';

var CryptoJS = require("crypto-js")

class AddAccountItemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'key': '',
            'platform': '',
            'username': '',
            'password': '',
        };
    }

    add_account_item() {
        fetch('http://www.buxingxing.com/erlangshen/account/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({
                platform: CryptoJS.AES.encrypt(this.state.platform, this.state.key).toString(),
                username: CryptoJS.AES.encrypt(this.state.username, this.state.key).toString(),
                password: CryptoJS.AES.encrypt(this.state.password, this.state.key).toString(),
            })
        })
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        const key = params ? params.key : '';
        this.setState({
            key: key,
        })
    }

    render() {
        return (
            <View
                style={{
                    flex:1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TextInput
                    style={{height: 25}}
                    placeholder="平台"
                    onChangeText={(text) => this.setState({platform: text})}
                />
                <TextInput
                    style={{height: 25}}
                    placeholder="账号"
                    onChangeText={(text) => this.setState({username: text})}
                />
                <TextInput
                    style={{height: 25}}
                    placeholder="密码"
                    onChangeText={(text) => this.setState({password: text})}
                />
                <Button
                    title="添加"
                    onPress={()=>{
                        this.add_account_item();
                        this.props.navigation.goBack();
                    }}
                />
            </View>
        )
    }
}

class AccountItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'account_list': [],
            'key': '',
        };
    }


    static navigationOptions = {
        headerRight: (
            <Button
                title="+"
                onPress={() => {
                    this.props.navigation.navigate('AddAccountItem', {
                        key: this.state.key,
                    });
                }}
            />
        )
    }

    getAccountList() {
        var account_list = [];
        fetch('http://www.buxingxing.com/erlangshen/account/')
            .then((response) => response.json())
            .then((responseJson) => {
                for (let account of responseJson.data.account_list) {
                    var platform = CryptoJS.AES.decrypt(account.platform, this.state.key).toString(CryptoJS.enc.Utf8);
                    var username = CryptoJS.AES.decrypt(account.username, this.state.key).toString(CryptoJS.enc.Utf8);
                    var password = CryptoJS.AES.decrypt(account.password, this.state.key).toString(CryptoJS.enc.Utf8);
                    account_list.push({
                        'platform': platform,
                        'username': username,
                        'password': password,
                    })
                    this.setState({
                        account_list: account_list,
                    })
                }
            })
    }

    componentWillMount() {
        this.getAccountList();
        const {params} = this.props.navigation.state;
        const key = params ? params.key : '';
        this.setState({
            key: key,
        })
    }

    render() {
        for (let account of this.state.account_list) {
            console.log(account.platform);
            console.log(account.username);
            console.log(account.password);
        }
        return (
                <View>
                    <FlatList
                        data={this.state.account_list}
                        renderItem={({item}) =>
                            <View
                                style={{
                                    flex:1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Text>{item.platform}</Text>
                                <Text>{item.username}</Text>
                                <Text>{item.password}</Text>
                            </View>
                        }
                    />
                    <Button
                        title="+"
                        onPress={() => {
                            this.props.navigation.navigate('AddAccountItem', {
                                key: this.state.key,
                            });
                        }}
                    />
                </View>
        );
    }
}

class KeyInputScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'key': '',
            'account_list': [],
        };
    }
    render() {
        return (
            <View
                style={{
                    flex:1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>请输入密钥</Text>
                <TextInput
                    style={{
                        width: 120,
                        height: 25,
                        borderColor: 'gray',
                        borderWidth: 1,
                        margin: 3
                    }} placeholder="密钥"
                    onChangeText={(text) => this.setState({key: text})}
                />
                <Button title="进入"
                    onPress={() => {
                        if (this.state.key == '') {
                            Alert.alert('KEY', '请输入密钥');
                            return;
                        }
                        this.props.navigation.navigate('AccountItems', {
                            key: this.state.key,
                        });
                    }}
                />
            </View>
        );
    }
}

const RootStack = StackNavigator (
    {
        KeyInput: {
            screen: KeyInputScreen,
        },
        AccountItems: {
            screen: AccountItemsScreen,
        },
        AddAccountItem: {
            screen: AddAccountItemScreen,
        },
    },
    {
        initialRouteName: 'KeyInput',
    },
);

export default class App extends Component {
    render() {
        return <RootStack />;
    }
}
