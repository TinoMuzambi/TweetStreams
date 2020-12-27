import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import Filter from "bad-words";

function App() {
	const [tweets, setTweets] = useState([]);
	const [query, setQuery] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	// const [canStart, setCanStart] = useState(true);
	const filter = new Filter();

	useEffect(() => {
		// Create socket.io client.
		const socket = io("https://live-tweet-stream.herokuapp.com", {
			origins: "https://live-tweet-stream.herokuapp.com",
		});

		// Connect to server.
		socket.on("connect", () => {
			console.log("Connected to server.");
		});

		// Listen for tweet emit.
		socket.on("tweet", (tweet) => {
			// console.log("hit");
			setIsFetching(false);
			setTweets((tweets) => [tweet, ...tweets]);
			// console.log(tweets);
		});

		return () => socket.disconnect();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsFetching(true);
		// setCanStart(false);

		// Call server to start streaming tweets.
		fetch(
			`https://live-tweet-stream.herokuapp.com/start/${query.toLowerCase()}`
		);
		setQuery("");
		setTweets([]);
	};

	// const handleStop = (e) => {
	// 	e.preventDefault();

	// 	// Call server to stop streaming tweets.
	// 	fetch("https://live-tweet-stream.herokuapp.com/stop");
	// 	setIsFetching(false);
	// 	setCanStart(true);
	// };

	return (
		<div className="content">
			<nav className="nav">
				<h1 className="count">{tweets.length} tweets</h1>
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
					{/* <button
						className="link stop"
						onClick={handleStop}
						disabled={canStart}
					>
						Stop Stream
					</button> */}
				</form>
			</div>

			<div className="wrapper">
				{isFetching ? (
					<AiOutlineReload className="icon" />
				) : (
					Array.from(new Set(tweets)).map((tweet, key) => (
						<div className="card" key={key}>
							<div className="author">
								<img
									src="/assets/twitter.png"
									alt="Twitter logo"
									className="twitter"
								/>
								<h3 className="author-title">
									@{filter.clean(tweet.includes.users[0].username)}
								</h3>
							</div>
							<p className="text">{filter.clean(tweet.data.text)}</p>
							<img src="/logo192.png" alt="tweet" className="tweet-image" />
							<a
								href={`https://twitter.com/${tweet.includes.users[0].username}/status/${tweet.data.id}`}
								className="link"
								target="__blank"
							>
								Go to Tweet
							</a>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default App;
