import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDecks } from '../utils/helpers'
import { Entypo } from '@expo/vector-icons'

class DeckList extends Component{
state = {
	flashcards: [],
}
	
	
fetchDecks=()=>{
    getDecks().then(results => {
        this.setState({
            flashcards: Object.keys(results).map((key) => (results[key])),
            })
        })
    }

componentDidMount(){
    this.fetchDecks()
}

componentDidUpdate(){
	this.fetchDecks()
}
	
	
	
render(){
const { flashcards } = this.state
return(
    <ScrollView style = {styles.container}>
        {flashcards.map(flashcard => (
            <TouchableOpacity
                style={styles.flashcard}
                onPress={()=>this.props.navigation.navigate('IndividualDeck', {flashcard: flashcard.title, count: flashcard.questions.length})}
                key={flashcard.title}>
            <Text style = {styles.title}>{flashcard.title}</Text>
            <Text style = {styles.smallText}>{flashcard.questions.length} <Entypo name={'documents'} size={22}/></Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
    )
}

    
}

const styles = StyleSheet.create({
    flashcard: {
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
    },
    title:{
		fontSize: 30,
		fontFamily: 'Futura',
    },
	smallText:{
		fontSize: 22,
		padding: 8,
		color: 'grey',
		fontFamily: 'Futura',
	},
})

export default DeckList