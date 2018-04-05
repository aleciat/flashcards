import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { getDeck } from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'
import { purple, lightPurple, black } from '../utils/constants'


class QuizView extends Component {
state = {
    individualDeck: [{ questions:[] }],
    currentCard: 1,
    flipCard: false,
    correct: 0,
	showScore: false,
        }
    
	
static navigationOptions=({navigation})=>({
    title:`${navigation.state.params.flashcard} Quiz`
})
    
componentDidMount(){
    getDeck(this.props.navigation.state.params.flashcard).then((results)=>{
        this.setState({
            individualDeck: results
        })
    })
}

render(){
    const { currentCard, individualDeck } = this.state
	var qOrA;
	if (individualDeck[0].questions.length > 0 && !this.state.flipCard) {
	qOrA = individualDeck[0].questions[currentCard-1].question
	}
	if (individualDeck[0].questions.length > 0 && this.state.flipCard) {
	qOrA = individualDeck[0].questions[currentCard-1].answer
	}
	if (individualDeck[0].questions.length == 0) {
	qOrA = "No cards!"
}
	
	if (this.state.showScore) {
		return (
		<View>
		<Text style={styles.scoreMessage}>Great Job!</Text>
		<Text style={styles.scoreMessage2}> You scored {this.state.correct} out of {currentCard}</Text>
		<TouchableOpacity
			onPress = {() => {this.props.navigation.navigate('IndividualDeck', {flashcard: this.props.navigation.state.params.flashcard, count: this.props.navigation.state.params.count})}}>
			<Text style = {styles.backDeck}>Back to Deck</Text>
			</TouchableOpacity>
		</View>
		)
	}
	
	return (
        <View style={styles.container}>
            <Text style={styles.question}>{qOrA}</Text>
                    
			<TouchableOpacity style= {styles.answerButton}
                onPress= {() => {this.setState({flipCard: !this.state.flipCard})}}>
            <Text>Flip Card</Text>
            </TouchableOpacity>
			
			<View style={styles.buttonSection}>			
            <TouchableOpacity style={[styles.button, {backgroundColor: lightPurple}]}
                    onPress={() => {
                        if (individualDeck[0].questions.length > currentCard){
                            this.setState({
                                correct: this.state.correct + 1,
                                currentCard: this.state.currentCard + 1
                            })
                        }
                        else {
                            this.setState({
                                correct: this.state.correct + 1,
                                showScore: true
                            })
                        }
                    }}>
                <Text style={styles.buttonText}><Ionicons name="ios-happy-outline" size={35}/></Text>
                </TouchableOpacity>
				
                <TouchableOpacity
                    style={[styles.button,{backgroundColor: purple}]}
                    onPress={() => {
                        if (individualDeck[0].questions.length > currentCard) {
                            this.setState({
                                currentCard: this.state.currentCard + 1
                            })
                        }
                        else {
                            this.setState({
                                showScore: true
                            })
                        }
                    }}>
                <Text style={styles.buttonText}><Ionicons name="ios-sad-outline" size={35}/></Text>
                </TouchableOpacity>
			</View>
			<Text style={styles.smallText}>{currentCard + ' of ' + individualDeck[0].questions.length}</Text>
        </View>
        )
	}
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
		smallText:{
		fontFamily: 'Futura',
		color:'grey', 
		marginBottom: 15,
		marginTop: 10,
	},
    question:{
		fontFamily: 'Futura',
        fontSize: 25,
        padding: 15,
        textAlign: 'center',
		marginTop: 25,
		marginBottom: 25,
    },
	buttonSection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
	},
	answerButton:{
		borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        padding: 10,
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
		marginBottom: 20,
	},
    button:{
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    },
    buttonText:{
        color:'white',
		fontSize: 20,
		fontFamily: 'Futura'
    },
	scoreMessage: {
		fontFamily: 'Futura',
		fontSize: 45,
		color: purple,
		marginTop: 60,
		textAlign: 'center',
		padding: 40,
	},
	scoreMessage2: {
		fontFamily: 'Futura',
		color: 'grey',
		fontSize: 35,
		textAlign: 'center'
	},
	backDeck: {
		fontFamily: 'Futura',
		fontSize: 15,
		textAlign: 'center',
		marginTop: 20,
	}
})

export default QuizView