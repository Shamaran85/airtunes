import React, { Component } from "react";

const electron = window.require("electron");
const fs = electron.remote.require("fs");

class Playlist extends Component {
    state = {
        playlist: [],
        track: '',
        playing: false
    };

    componentDidMount() {
        this.onLoad();
    }

    onLoad() {
        if (fs.existsSync("playlist.json")) {
            fs.readFile("playlist.json", "utf-8", (err, files) => {
                if (err) {
                    return console.log('Error reading playlist:', err);
                }
                const playlistData = JSON.parse(files) || { playlist: [] };
                this.setState({ playlist: playlistData }, () => {
                    this.onUpdate();
                });
            });
        }
    }

    onUpdate() {
        if (fs.existsSync("playlist.json")) {
            fs.watch('playlist.json', (curr, prev) => {
                fs.readFile("playlist.json", "utf-8", (err, files) => {
                    if (err) {
                        alert(err);
                        return;
                    }
                    const playlistData = JSON.parse(files) || { playlist: [] };
                    this.setState({ playlist: playlistData });
                });
            });
        }
    }

    handleTrack(track) {
        const currentTrack = track;
        this.setState({ track: currentTrack });
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

    render() {
        console.log(this.state.track);

        const renderPlaylist = this.state.playlist.map((track, index) => {
            return (
                <li
                    className="playlist__track"
                    key={index}
                    onClick={e => this.handleTrack(track)}
                >
                    <div className="playlist__track__index">{index + 1}.</div>
                    <div className="playlist__track__title">{track.title}</div>
                    <div className="playlist__track__artist">{track.artist}</div>
                    <div className="playlist__track__duration">{track.length}</div>
                </li>
            );
        });

        return (
            <div>
                <div className="player__container">
                    <div className="player__container__left">
                        <img src={this.state.track.cover} />
                    </div>
                    <div className="player__container__right">
                        <h2>{this.state.track.artist} - {this.state.track.title}</h2>
                        <audio controls src={this.state.track.path} />
                    </div>
                </div>
                <div className="playlist__container">
                    <div className="playlist__container__inner">
                        <ul className="playlist">{renderPlaylist}</ul>
                    </div>
                </div>
            </div >
        );
    }
}

export default Playlist;
