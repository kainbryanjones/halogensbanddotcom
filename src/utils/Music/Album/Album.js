export class Album {
    constructor(title, artist, artworkUrl, tracks) {
        this.title = title;
        this.artist = artist;
        this.artworkUrl = artworkUrl;
        this.tracks = tracks;
    }
}

export class Track {
    constructor(title, src, visualiserSpec, artworkUrl = null) {
        this.title = title;
        this.src = src;
        this.visualiserSpec = visualiserSpec;
        this.artworkUrl = artworkUrl;
    }
}

