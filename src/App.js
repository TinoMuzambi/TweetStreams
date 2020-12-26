import "./App.css";

function App() {
	return (
		<div className="content">
			<h1 className="title">Tweet Stream</h1>

			<div className="card">
				<img src="/assets/twitter.png" alt="Twitter logo" className="twitter" />
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
		</div>
	);
}

export default App;
