import React from "react";
import { RiPlayListFill } from "react-icons/ri";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
	return (
		<div className="nav">
			<h1>Nik</h1>
			<button onClick={() => setLibraryStatus(!libraryStatus)}>
				<RiPlayListFill />
			</button>
		</div>
	);
};

export default Nav;
