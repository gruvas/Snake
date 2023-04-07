async function fieldValidation(lastField, playerNumber) {
	let valid
	const gameTitle = document.querySelector('.game-title')

	let connection = new signalR.HubConnectionBuilder()
		.withUrl('/hubs')
		.configureLogging(signalR.LogLevel.Warning)
		.build()

	await connection
		.start()
		.then(async function () {
			const snakeGameId = parseInt(localStorage.getItem('SnakeId'))
			let [lastFd] = lastField.id.match(/\d+/)
			lastFd = parseInt(lastFd)

			valid = await connection.invoke('FieldValidation', snakeGameId, lastFd)

			if (!valid) {
				let winner

				if (playerNumber == 1) {
					winner = 2
				} else {
					winner = 1
				}

				await connection.invoke('EndGame', snakeGameId, winner)

				alert(`Победу одержал ${winner} игрок`)
				gameTitle.textContent = `Победу одержал ${winner} игрок`
			}

			return
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


	return !valid
}

export default fieldValidation
