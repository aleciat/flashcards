import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './Components/DeckList'
import IndividualDeck from './Components/IndividualDeck'
import NewDeck from './Components/NewDeck'
import NewQuestion from './Components/NewQuestion'
import QuizView from './Components/QuizView'
import { purple, lightPurple, black } from './utils/constants'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'


const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Home',
			tabBarIcon: <FontAwesome name='home' size={25} color={'white'}/>
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
			tabBarLabel: 'Add',
			tabBarIcon: <FontAwesome name='plus' size={25} color={'white'}/>
        }
    },
	
},{
    tabBarOptions: {
		showIcon: true,
		style: {
			height: 75,
			shadowOffset: {
			width: 0,
			height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
		},
        activeBackgroundColor : lightPurple,
		inactiveBackgroundColor: purple,
		tabBarLabelColor: '#ffffff',
		labelStyle: {
			fontSize: 28,
			color: '#ffffff',
			fontFamily: 'Futura',
  },
    }
})

const Main = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            headerStyle: {
                backgroundColor: lightPurple,
            },
            title:'FlashCards'
        },
    },
    IndividualDeck: {
        screen: IndividualDeck,
        navigationOptions: {
            headerStyle: {
                backgroundColor: lightPurple
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            headerStyle: {
                backgroundColor: lightPurple
            }
        }
    },

    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            headerStyle: {
                backgroundColor: lightPurple
            }
        }
    }
})



export default class App extends Component {
	componentDidMount() {
		setLocalNotification()
	}
	
    render(){
        return (
            <View style={styles.container}>
                <Main/>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})