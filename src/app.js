import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Container from './components/Container';
import Banner from './components/Banner';
import images from './images';

class ClickyGame extends Component {
    state = {
        score: 0,
        highScore: 0,
        navMessage: 'Click an image to begin!',
        allCharacters: this.shuffleArray(),
        wasClicked: [],
        shake: true
    };

    clickEvent = this.checkClicked.bind(this);

    // used to shuffle the array of images when the DOM loads, and when an image is clicked
    shuffleArray() {
        const newArr = images.slice();
        const shuffleArr = [];

        while (newArr.length > 0) {
            shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
        }
        return shuffleArr;
    }

    checkClicked(clickedElem) {
        const prevState = this.state.wasClicked.slice();
        const shuffled = this.shuffleArray();
        let score = this.state.score;
        let highScore = this.state.highScore;

   
        if (!this.state.wasClicked.includes(clickedElem)) {
            if (score === highScore) {
                score++;
                highScore++;

            } else {
                score++;
            }

            prevState.push(clickedElem);
        }

        if (this.state.wasClicked.includes(clickedElem)) {
            let score = 0;
            return this.setState({
                score: score,
                highScore: highScore,
                navMsgColor: 'incorrect',
                navMessage: 'Incorrect guess!',
                allCharacters: shuffled,
                wasClicked: [],
                shake: true
            });
        }

        // if this runs, then the same element has not been clicked twice and the score is increased
        this.setState({
            score: score,
            highScore: highScore,
            navMsgColor: 'correct',
            navMessage: 'You Guessed Correctly!',
            allCharacters: shuffled,
            wasClicked: prevState,
            shake: false
        });

        return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
    }

    render() {
        const state = this.state;
        return (
            <div>
                <Navbar
                    score={state.score}
                    highScore={state.highScore}
                    navMessage={state.navMessage}
                    navMsgColor={state.navMsgColor}
                />
                <Banner />
                <Container
                    shake={state.shake}
                    characters={state.allCharacters}
                    clickEvent={this.clickEvent}
                />
            </div>
        );
    }
}

export default ClickyGame;