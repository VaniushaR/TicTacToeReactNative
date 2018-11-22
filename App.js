import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button
} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  //state of beginning without marks on the game state
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 1,
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    };
  }
  //After render the game structure, initialize the score
  componentDidMount() {
    this.initializeGame();
  }

  //Function to initialize the player's score in 0 points
  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1
    });
  };

  //Function to render the icon selected
  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="cat" style={styles.exes} />;
      case -1:
        return <Icon name="cat" style={styles.circles} />;
      default:
        return <View />;
    }
  };

  //Function to mark the selected place pressed

  //Winner checker
  getWinner = () => {
    const winnerNumber = 3;
    const arr = this.state.gameState;
    let sum;
    //possible winner combination with rows
    for (let i = 0; i < winnerNumber; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //possible winner combination with cols
    for (i = 0; i < winnerNumber; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //possible combination with diagonal to the left \
    sum = arr[0][1] + arr[1][1] + arr[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    //possible combination with diagonal to the rigth /
    sum = arr[0][2] + arr[1][1] + arr[0][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    //There are no winners  Alert.alert('no one won!');
    return 0;
  };

  onTilePress = (row, col) => {
    console.log(row, col);
    // Conditional to don't allow change the first value of the form
    const value = this.state.gameState[row][col];
    if (value !== 0) {
      Alert.alert('Pulsa en una casilla libre!');
      return;
    }
    //TODO: Let to identify current player turn
    const currentPlayer = this.state.currentPlayer;
    const arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });
    //Change player
    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });
    //Winner alerts
    const winner = this.getWinner();
    if (winner === 1) {
      Alert.alert('Player 1 won!😸  Player 2 lost 😿');
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert('Player 2 won!😸  Player 2 lost 😿');
      this.initializeGame();
    }
  };

  onNewGamePress = () => {
    // Shows an alert asking if you want to reset the game
    Alert.alert('Are you sure?', 'Do you want to restart the game?', [
      {
        text: 'NO',
        onPress: () => console.log('Restart canceled'),
        style: 'cancel'
      },
      {
        text: 'YES',
        onPress: () => {
          this.initializeGame();
        }
      }
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/cats.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.gameArea}>
            <Text style={styles.header}>GATO GAME</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(0, 0);
                }}
                style={[
                  styles.lines,
                  { borderLeftWidth: 0, borderTopWidth: 0 }
                ]}
              >
                {this.renderIcon(0, 0)}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(0, 1);
                }}
                style={[styles.lines, { borderTopWidth: 0 }]}
              >
                {this.renderIcon(0, 1)}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(0, 2);
                }}
                style={[
                  styles.lines,
                  { borderTopWidth: 0, borderRightWidth: 0 }
                ]}
              >
                {this.renderIcon(0, 2)}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(1, 0);
                }}
                style={[styles.lines, { borderLeftWidth: 0 }]}
              >
                {this.renderIcon(1, 0)}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(1, 1);
                }}
                style={[styles.lines]}
              >
                {this.renderIcon(1, 1)}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(1, 2);
                }}
                style={[styles.lines, { borderRightWidth: 0 }]}
              >
                {this.renderIcon(1, 2)}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(2, 0);
                }}
                style={[
                  styles.lines,
                  { borderLeftWidth: 0, borderBottomWidth: 0 }
                ]}
              >
                {this.renderIcon(2, 0)}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(2, 1);
                }}
                style={[styles.lines, { borderBottomWidth: 0 }]}
              >
                {this.renderIcon(2, 1)}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onTilePress(2, 2);
                }}
                style={[
                  styles.lines,
                  { borderBottomWidth: 0, borderRightWidth: 0 }
                ]}
              >
                {this.renderIcon(2, 2)}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.footer}>
          <ScrollView style={styles.newGame}>
            <Button title="New Game" onPress={this.onNewGamePress} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: 410,
    backgroundColor: 'transparent',
    opacity: 990,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 50,
    fontFamily: 'Optima-Regular',
    color: 'gray',
    padding: 50
  },
  footer: {
    height: 70,
    padding: 10,
    justifyContent: 'flex-s'
  },
  lines: {
    borderWidth: 10,
    width: 100,
    height: 100
  },
  exes: {
    color: 'blue',
    fontSize: 80,
    flex: 1
  },
  circles: {
    color: 'fuchsia',
    fontSize: 80,
    flex: 1
  },
  newGame: {
    color: 'green',
    fontSize: 20,
    paddingTop: 5
  },
  exitGame: {
    alignItems: 'right'
  }
});
