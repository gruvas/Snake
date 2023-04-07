async function removeSnake() {
	const snakeGameId = parseInt(localStorage.getItem('SnakeId'))

	let connection = new signalR.HubConnectionBuilder()
		.withUrl('/hubs')
		.configureLogging(signalR.LogLevel.Warning)
		.build()

	await connection
		.start()
		.then(async function () {
			await connection.invoke('RemoveSnake', snakeGameId)
		})
		.catch(function (err) {
			console.error(err.toString())
		})
		.finally(async () => {
			if (connection._connectionState === signalR.HubConnectionState.Connected) {
				await connection.stop()
			}
			localStorage.removeItem('SnakeId')

			location.reload()
		})
}

export default removeSnake
