import React from 'react';
import {StyleSheet, View, Text, Button, StatusBar, Image} from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default class ProfileScreen extends React.Component{

    constructor(){
        super();
        this.state = {user: '', canFollow: false, currentUser: '', cantFollow: [], followers: 0};
    }
    static navigationOptions = {
        title: 'Profile',
       };
       
    render(){
        return(
            <View>
            <View style={{marginBottom: 10}}>
            {(this.state.canFollow) ? <Button title="Follow" onPress={() => this.handleFollow()}></Button> : false}
           <Text>{this.state.user}</Text>
           <Text><Icon name="heart" size={15} color="#ff0000" /> {this.state.followers} </Text>
            </View>
            </View>
        );
        
    }

    handleFollow(){
        var cantFollow = this.state.cantFollow;
        var user = this.state.user;
        var currentUser = this.state.currentUser;
        var cantFollow = [];
        var followers = 0;

        // Gives a like.
        firebase.firestore().collection('posts').doc(user).get().then(doc => {
            firebase.firestore().collection('posts').doc(user).set({ followers: doc.data()['followers'] + 1}, {merge: true});
        });
        firebase.firestore().collection('posts').doc(currentUser).get().then(doc => {cantFollow = doc.data()['cantFollow']; cantFollow.push(user);
        firebase.firestore().collection('posts').doc(currentUser).set({cantFollow: cantFollow},{merge: true});});
        this.setState({canFollow: false});
        alert('עקבת בהצלחה!');
    }
    
    componentDidMount(){

        var canFollow = this.props.navigation.getParam('canFollow');
        var user = this.props.navigation.getParam('user');
        var currentUser = this.props.navigation.getParam('currentUser');
        var followers = '';

        firebase.firestore().collection('posts').doc(user).onSnapshot(doc => {
           this.setState({followers: doc.data()['followers']});
        });

        if (canFollow == true){
            firebase.firestore().collection('posts').doc(currentUser).onSnapshot(doc => {
                if (doc.data()['cantFollow'].length > 0){
                        for(var i in doc.data()['cantFollow']) {
                            if (doc.data()['cantFollow'][i] == user){
                                this.setState({canFollow: false});
                                break;
                            } else {
                                this.setState({canFollow: true});
                                continue;
                            }
                        }
                } else {
                    this.setState({canFollow: true});
                }
            })
        } 
    this.setState({user: user, currentUser: currentUser, followers: followers});

}

componentWillUnmount(){
    var unsubscribe = firebase.firestore().collection("posts")
.onSnapshot(function (){
  // Respond to data
  // ...
});

    // Later ...

    // Stop listening to changes
    unsubscribe();
}



        



    }




const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 3,
    },
    posts: {
        width: 10,
        marginHorizontal: 5,
    }
})