import React from "react";
const LibrarySong = ({
	song,
	songs,
	setCurrentSong,
	id,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const songSelectHandler = async () => {
		await setCurrentSong(song);

		const newSongs = songs.map((song) => {
			if (song.id === id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});

		setSongs(newSongs);

		if (isPlaying) audioRef.current.play();
	};
	return (
		<div
			className={`library-song ${song.active ? "selected" : ""}`}
			onClick={songSelectHandler}
		>
			<img src={song.cover} alt={song.name} />
			<div className="library-song__info">
				<h3>{song.name}</h3>
				<h5>{song.artist}</h5>
			</div>
		</div>
	);
};

export default LibrarySong;
