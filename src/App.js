import React, { useState, useEffect } from "react";

import Card from "./components/Card.jsx";
import SearchIcon from "./search.svg";
import "./App.css";

const API = "http://www.omdbapi.com?apikey=8a45d944";

const App = () => {
	const [searchPhrase, setSearchPhrase] = useState("");
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		searchMovies("");
	}, []);

	const searchMovies = async (title) => {
		const response = await fetch(`${API}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	};

	return (
		<div className="app">
			<h1 className="logo">FilmBase</h1>
			<div className="search">
				<input
					value={searchPhrase}
					onChange={(e) => setSearchPhrase(e.target.value)}
					placeholder="Search for movies..."
				/>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => searchMovies(searchPhrase)}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<Card movie={movie} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No movies found. Try typing something e.g 'Batman'</h2>
				</div>
			)}
		</div>
	);
};

export default App;
