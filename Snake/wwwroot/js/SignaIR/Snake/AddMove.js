async function addMove(playerNumber, firstField, lastField, moveNumber) {
	let connection = new signalR.HubConnectionBuilder()
		.withUrl('/hubs')
		.configureLogging(signalR.LogLevel.Warning)
		.build()

	const snakeGameId = parseInt(localStorage.getItem('SnakeId'))

	let [firstFd] = firstField.id.match(/\d+/)
	let [lastFd] = lastField.id.match(/\d+/)
	firstFd = parseInt(firstFd)
	lastFd = parseInt(lastFd)

	await connection
		.start()
		.then(async function () {
			await connection.invoke(
				'AddMove',
				snakeGameId,
				playerNumber,
				firstFd,
				lastFd,
				moveNumber + 1
			)
		})
		.catch(function (err) {
			console.error(err.toString())
		})
		.finally(async () => {
			if (
				connection._connectionState === signalR.HubConnectionState.Connected
			) {
				await connection.stop()
			}
		})
}

export default addMove
