import React from "react";

const Song = ({ currentSong, isPlaying }) => {
	return (
		<div className="song-container">
			<img
				className={isPlaying ? "rotateSong" : ""}
				src={currentSong.cover}
				alt={currentSong.name}
			/>
			<h2>{currentSong.name}</h2>
			<h5>{currentSong.artist}</h5>
		</div>
	);
};

export default Song;
