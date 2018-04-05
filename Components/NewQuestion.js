import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { addCardToDeck } from '../utils/helpers'
import { purple } from '../utils/constants'

class NewQuestion extends Component{
state = {
    front: '',
    back: ''
}
	
static navigationOptions=({navigation})=>({
    title:`Add to ${navigation.state.params.flashcard}`
})
	

render(){
    return(
        <View style = {styles.container}>
            <TextInput style = {styles.input}
				value = {this.state.front}
				placeholder = 'Front of Card'
                onChangeText = { (text) => {this.setState({front:text})}}
            />
            <TextInput style = {styles.input}
				value = {this.state.back}
				placeholder = 'Back of Card'
                onChangeText = { (text) => {this.setState({back:text})}}
            />
			
            <TouchableOpacity style = {styles.button}
                onPress = { () => {
                    addCardToDeck(this.props.navigation.state.params.flashcard, this.state.front, this.state.back)
                    this.props.navigation.navigate('IndividualDeck', {flashcard: this.props.navigation.state.params.flashcard, count: this.props.navigation.state.params.count+1})
                }}
                >
            <Text style = {styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
		)
    }
}


const styles=StyleSheet.create({
    container:{
		padding: 30,
        alignItems:'center',

    },
    input:{
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
		color: 'white', 
		fontSize: 20,
		fontFamily: 'Futura'
	}
})

export default NewQuestion