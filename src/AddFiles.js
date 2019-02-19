// TODOS
// Handle empty playlist error on read


import React, { Component } from "react";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const { dialog } = window.require("electron").remote;

const id3 = require("id3js");
const coverArt = require("cover-art");

class AddFiles extends Component {

    browseFolders() {
        const folderPath = dialog.showOpenDialog({
            title: "Select a folder",
            properties: ["openDirectory"]
        });

        if (!folderPath || folderPath[0] === "undefined") {
            return;
        }
        this.addFiles(folderPath);
    }

    addFiles(folderPath) {
        fs.readdir(folderPath[0], (err, files) => {
            if (err) {
                console.log(err);
            }
            for (let file of files) {
                if (file.endsWith(".mp3")) {
                    this.getMetadata(folderPath, file)
                }
            }
        })
    }

    getMetadata(folderPath, file) {
        let filePath = `${folderPath}\\${file}`;
        id3(filePath, (err, metadata) => {
            if (err) {
                console.log(err);
            }
            if (metadata.artist !== null) {
                this.getImage(metadata, filePath)
            } else {
                this.noMetadata(file, filePath)
            }
        })
    }

    getImage(metadata, filePath) {
        if (metadata.artist !== null) {
            coverArt(
                metadata.artist,
                metadata.album,
                "large",
                (err, image) => {
                    if (err) {
                        return console.log(err);
                    }
                    this.createPlaylistObject(metadata, image, filePath)
                }
            );
        }
    }

    noMetadata(file, filePath) {
        const newFile = {
            title: file,
            artist: '',
            album: '',
            cover: '',
            path: filePath
        };
        this.addToPlaylist(newFile);
    }

    createPlaylistObject(metadata, image, filePath) {
        const newFile = {
            title: metadata.title,
            artist: metadata.artist,
            album: metadata.album,
            cover: image,
            path: filePath
        };
        this.addToPlaylist(newFile);
    }

    addToPlaylist(newFile) {

        if (!fs.existsSync("playlist.json")) {
            fs.writeFile("playlist.json", '[]', function (err) {
                if (err) throw err;
                console.log('Empty playlist created.');
            });
        }

        if (fs.existsSync("playlist.json")) {
            fs.readFile("playlist.json", "utf-8", (err, files) => {
                if (err) {
                    return console.log('Error reading playlist:', err);
                }

                const currentPlaylist = JSON.parse(files) || [];
                let newPlaylist = [...currentPlaylist, newFile];

                fs.writeFile("playlist.json", JSON.stringify(newPlaylist), (err) => {
                    if (err) {
                        return console.log('Error writing playlist: ', err);
                    }
                    console.log(`"${newFile.title}" added to playlist.`);
                });
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.browseFolders()}>Add Files</button>
            </div>
        );
    }
}

export default AddFiles;