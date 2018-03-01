import React, {Component} from 'react';
import {FlatList, ListView, Alert, Button, Text, TextInput, View} from 'react-native';
import {StackNavigator} from 'react-navigation';


class AccountItemsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'account_list': [],
        };
    }
    getAccountList() {
        fetch('http://www.buxingxing.com/erlangshen/account/list/')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    account_list: responseJson.data.account_list,
                })
            })
    }
    componentWillMount() {
        this.getAccountList();
    }
    render() {
        const {params} = this.props.navigation.state;
        const key = params ? params.key : '';
        return (
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
