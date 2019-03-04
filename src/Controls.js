import React, { Component } from "react";
import Playlist from './Playlist';

const electron = window.require("electron");
const fs = electron.remote.require("fs");

class Controls extends Component {
    state = {
        playing: false,
        track: ""
    };

    componentDidMount() {
        console.log(Playlist.props.track);
        // const curretTrack = Playlist.state.track;
        //     this.setState({ tack: curretTrack });
    }

    togglePlay() {
        // this.audio = null;
        // this.audio = new Audio(this.state.track);

        // this.setState({ play: !this.state.play });
        console.log(this.audio);
        if (this.state.play === false) {
            this.audio = new Audio(this.state.track);
        } else {
            this.state.play ? this.audio.play() : this.audio.pause();
        }

        // this.setState({ play: !this.state.play });
        // console.log(this.audio);
        // this.state.play ? this.audio.play() : this.audio.pause();
    }

    handleStop() {
        if (this.state.playing) {
            this.audio.pause();
            // this.audio.currentTime = 0;
            this.audio.src = this.state.track;
            console.log("Audio Stopped");
            this.setState({ playing: false });
        } else {
            console.log("Already stopped doooh");
        }
    }

    handlePlay() {
        if (!this.state.playing) {
            this.audio = new Audio(this.state.track);
            this.audio.play();
            console.log("Audio Play");
            this.setState({ playing: true });
            console.log(this.audio.currentTime);
            console.log(this.audio.duration);
        } else {
            this.audio.pause();
            this.audio.currentTime = 0;
            // this.audio.src = this.state.track;
            this.audio.play();
            console.log(" playing new doooh");
        }
    }

    // handlePlay() {
    //     // if (!this.state.playing) {
    //     //     this.audio = new Audio(this.state.track);
    //     //     this.audio.play();
    //     //     console.log('Audio Play');
    //     //     this.setState({ playing: true })
    //     // } else {
    //     //     console.log('Already playing doooh');
    //     // }
    //     if (!this.state.playing) {
    //         this.audio = new Audio(this.state.track);
    //         this.audio.play();
    //         console.log('Audio Play');
    //         this.setState({ playing: true })
    //     } else {
    //         this.audio.pause();
    //         // this.audio.currentTime = 0;
    //         // this.audio.src = this.state.track;
    //         this.audio = new Audio(this.state.track);
    //         this.audio.play();
    //         console.log(' playing new doooh');
    //     }

    // }
    render() {
        return (
            <div>

                {/* <button onClick={() => this.togglePlay()}>
                    {this.state.play ? "Play" : "Pause"}
                </button> */}

                <button onClick={() => this.handlePlay()}>Play</button>

                <button onClick={() => this.handleStop()}>Stopp</button>
            </div>
        );
    }
}

export default Controls;