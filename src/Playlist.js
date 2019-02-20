import React, { Component } from "react";

const electron = window.require("electron");
const fs = electron.remote.require("fs");

class Playlist extends Component {
    state = {
        playlist: []
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
        const currentTrack = track.path;
        this.setState({ track: currentTrack });
    }

    render() {
        const renderPlaylist = this.state.playlist.map((track, index) => {
            console.log(track);
            return (
                <li
                    className="playlist__track"
                    key={index}
                    onClick={e => this.handleTrack(track)}
                >
                    <div className="playlist__track__index">{index + 1}.</div>
                    <div className="playlist__track__title">{track.title}</div>
                    <div className="playlist__track__artist">{track.artist}</div>
                    <div className="playlist__track__duration">4:15</div>
                </li>
            );
        });

        return (
            <div className="playlist__container__inner">
                <ul className="playlist">{renderPlaylist}</ul>
            </div>
        );
    }
}

export default Playlist;
