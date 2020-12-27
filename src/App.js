import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
	const [tweets, setTweets] = useState([]);
	const [query, setQuery] = useState("");

	useEffect(() => {
		// Create socket.io client.
		const socket = io("https://live-tweet-stream.herokuapp.com", {
			origins: [
				"https://live-tweet-stream.herokuapp.com",
				"https://tweet-streams.vercel.app/",
			],
		});

		// Connect to server.
		socket.on("connect", () => {
			console.log("Connected to server.");
		});

		// Listen for tweet emit.
		socket.on("tweet", (tweet) => {
			console.log("hit");
			setTweets((tweets) => [tweet, ...tweets]);
			// console.log(tweets);
		});

		return () => socket.disconnect();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Call server to start streaming tweets.
		fetch(`https://live-tweet-stream.herokuapp.com/start/${query}`);
		setQuery("");
		setTweets([]);
	};

	const handleStop = (e) => {
		e.preventDefault();

		// Call server to stop streaming tweets.
		fetch("https://live-tweet-stream.herokuapp.com/stop");
	};

	return (
		<div className="content">
			<nav className="nav">
				<h1 className="count">{tweets.length}</h1>
				<h1 className="title">Tweet Stream</h1>
			</nav>

			<div className="card large">
				<form onSubmit={handleSubmit} className="form">
					<label htmlFor="query">Enter a query</label>
					<input
						type="text"
						name="query"
						id="text"
						value={query}
						required
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button className="link" type="submit">
						Start Stream
					</button>
					<button className="link stop" onClick={handleStop}>
						Stop Stream
					</button>
				</form>
			</div>

			<div className="wrapper">
				{Array.from(new Set(tweets)).map((tweet, key) => (
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
