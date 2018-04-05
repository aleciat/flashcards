import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { getDeck } from '../utils/helpers'
import { purple } from '../utils/constants'


class IndividualDeck extends Component {
state = {
    individualDeck: [],
}
	
static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.flashcard} Deck`
})
    
getDeckInfo = () => {
    getDeck(this.props.navigation.state.params.flashcard).then((results)=>{
        this.setState({
            individualDeck: results
        })
    })
}

componentDidMount(){
    this.getDeckInfo()
}

render() {

return (
	<View>
    <View style={styles.page}>
        <Text style={styles.title}>{this.props.navigation.state.params.flashcard}</Text>
        <Text style={styles.smallText}> 
        {this.props.navigation.state.params.count} <Entypo name={'documents'} size={18}/></Text>
				
		<View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button}
                onPress={() => {this.props.navigation.navigate('NewQuestion', {flashcard: this.props.navigation.state.params.flashcard, count: this.props.navigation.state.params.count})}}>
            <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            
			<TouchableOpacity style={styles.button}
                onPress={() => this.props.navigation.navigate('QuizView', {flashcard: this.props.navigation.state.params.flashcard, count: this.props.navigation.state.params.count})}>
            <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity> 
		</View>
    </View>
	</View>
    )
}
}

const styles=StyleSheet.create({
    page:{
        flex:1,
        alignItems:'center',
    },
	buttonSection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
	},
    title:{
        fontSize: 44,
        textAlign: 'center',
        marginTop: 20,
		fontFamily: 'Futura',
		marginBottom: 10,
    },
	smallText:{
		fontFamily: 'Futura',
		color:'grey', 
		marginBottom: 25,
	},
    button:{
		height: 48,
		padding: 20,
		marginTop: 10,
		margin: 2,
        borderRadius: 12,
        justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: purple,
    },
	buttonText: {
		color: 'white', 
		fontSize: 20,
		fontFamily: 'Futura'
	}

})

export default IndividualDeck