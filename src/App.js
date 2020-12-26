import "./App.css";
import { io } from "socket.io-client";

function App() {
	const tweets = ["", "", "", "", "", "", ""];
	const socket = io();

	socket.on("connect", () => {
		console.log("Connected to server.");
	});
	return (
		<div className="content">
			<h1 className="title">Tweet Stream</h1>

			{tweets.map((tweet, key) => (
				<div className="card" key={key}>
					<div className="author">
						<img
							src="/assets/twitter.png"
							alt="Twitter logo"
							className="twitter"
						/>
						<h3 className="author-title">Author</h3>
					</div>
					<p className="text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
						doloribus repellat eveniet qui quia ex beatae temporibus dolores
						dolorum nemo.
					</p>
					<img src="/logo192.png" alt="tweet" className="tweet-image" />
					<a href="https://twitter.com" className="link">
						Go to Tweet
					</a>
				</div>
			))}
		</div>
	);
}

export default App;
