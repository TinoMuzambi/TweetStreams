import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
	const [tweets, setTweets] = useState([]);
	const socket = io("http://localhost:5000", {
		origins: "http://localhost:5000",
	});

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to server.");
		});

		socket.on("tweet", (tweet) => {
			setTweets(...tweets, tweet);
			console.log(tweets);
		});
	}, []);

	return (
		<div className="content">
			<h1 className="title">Tweet Stream</h1>

			{tweets &&
				tweets.map((tweet, key) => (
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
						>
							Go to Tweet
						</a>
					</div>
				))}
		</div>
	);
}

export default App;
