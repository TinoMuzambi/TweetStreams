import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
	const [tweets, setTweets] = useState([]);
	const [query, setQuery] = useState("");

	useEffect(() => {
		const socket = io("http://localhost:5000", {
			origins: "http://localhost:5000",
		});
		socket.on("connect", () => {
			console.log("Connected to server.");
		});
		socket.on("tweet", (tweet) => {
			setTweets((tweets) => [tweet, ...tweets]);
			// console.log(tweets);
		});

		return () => socket.disconnect();
	}, []);

	return (
		<div className="content">
			<nav className="nav">
				<h1 className="count">{tweets.length}</h1>
				<h1 className="title">Tweet Stream</h1>
			</nav>

			<div className="card">
				<form action="" className="form">
					<label htmlFor="query">Enter a query</label>
					<input
						type="text"
						name="query"
						id="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button className="link" type="submit">
						Start Stream
					</button>
				</form>
			</div>

			<div className="wrapper">
				{tweets.map((tweet, key) => (
					<div className="card" key={key}>
						<div className="author">
							<img
								src="/assets/twitter.png"
								alt="Twitter logo"
								className="twitter"
							/>
							<h3 className="author-title">
								@{tweet.includes.users[0].username}
							</h3>
						</div>
						<p className="text">{tweet.data.text}</p>
						<img src="/logo192.png" alt="tweet" className="tweet-image" />
						<a
							href={`https://twitter.com/${tweet.includes.users[0].username}/status/${tweet.data.id}`}
							className="link"
							target="__blank"
						>
							Go to Tweet
						</a>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
