import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { purple } from '../utils/constants'
import { saveDeckTitle } from '../utils/helpers'



class NewDeck extends Component{
state = {
    title: '',
}
	
render(){
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Add Deck</Text>
            <TextInput style = {styles.input}
				placeholder ='Deck Title'
                value = {this.state.title}
                onChangeText = {(entry) => {this.setState({title:entry})}}/>
            <TouchableOpacity style = {styles.button}
                onPress={() => { saveDeckTitle(this.state.title).then(() => {
                this.props.navigation.navigate('IndividualDeck', { flashcard: this.state.title, count: 0 })
                 })
             }}>
            <Text style = {styles.buttonText}>Submit</Text>
            </TouchableOpacity>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:2,
        flexDirection:'column',
        alignItems:'center',
        padding:20
    },
	title: {
		fontSize: 30,
		fontFamily: 'Futura',
	},
    input: {
		borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        padding: 20,
		borderWidth: 1,
		borderRadius: 2,
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
        width: 280,
        padding: 20
    },
    button: {
		backgroundColor: purple,
        padding: 15,
        paddingLeft: 40,
        paddingRight: 40,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
	buttonText: {
		color:'white',
		fontFamily: 'Futura',
		fontSize: 20,
	}
})

export default NewDeck