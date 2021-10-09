/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RiPlayFill, RiPauseLine } from "react-icons/ri";

const Player = ({
	currentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
	songs,
	setCurrentSong,
	setSongs,
}) => {
	const activeLibraryHandler = (nextPrev) => {
		const newSongs = songs.map((song) => {
			if (song.id === nextPrev.id) {
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
	};

	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	};

	const playSongHandler = () => {
		setIsPlaying(!isPlaying);
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		} else if (direction === "skip-backward") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	document.body.onkeydown = function (e) {
		if (e.keyCode === 32) {
			playSongHandler();
		}
	};

	return (
		<div className="player">
			<div className="timeControl">
				<p>{getTime(songInfo.currentTime)}</p>

				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						type="range"
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						onChange={dragHandler}
					/>
					<div style={trackAnim} className="animate-track"></div>
				</div>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
			</div>
			<div className="playControl">
				<span
					className="controlIcon previous"
					onClick={() => skipTrackHandler("skip-backward")}
				>
					<MdSkipPrevious />
				</span>
				<span className="controlIcon play" onClick={playSongHandler}>
					{isPlaying ? <RiPauseLine /> : <RiPlayFill />}
				</span>
				<span
					className="controlIcon next"
					onClick={() => skipTrackHandler("skip-forward")}
				>
					<MdSkipNext />
				</span>
			</div>
		</div>
	);
};

export default Player;
