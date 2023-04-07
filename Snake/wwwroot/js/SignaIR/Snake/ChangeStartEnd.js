async function changeStartEnd(field, type) {
	const snakeGameId = parseInt(localStorage.getItem('SnakeId'))

	let connection = new signalR.HubConnectionBuilder()
		.withUrl("/hubs")
		.configureLogging(signalR.LogLevel.Warning)
		.build();

	let fieldNumbers = field.id.match(/\d+/)
	fieldNumbers = parseInt(fieldNumbers)

	if (type == 'ChangeStart') {
		await connection
			.start()
			.then(async function () {
				await connection.invoke('ChangeStart', snakeGameId, fieldNumbers)
			})
			.catch(function (err) {
				console.error(err.toString())
			})
			.finally(async () => {
				if (connection._connectionState === signalR.HubConnectionState.Connected) {
					await connection.stop()
				}
			})
	} else if (type == 'ChangeEnd') {
		await connection
			.start()
			.then(async function () {
				await connection.invoke('ChangeEnd', snakeGameId, fieldNumbers)
			})
			.catch(function (err) {
				console.error(err.toString())
			})
			.finally(async () => {
				if (connection._connectionState === signalR.HubConnectionState.Connected) {
					await connection.stop()
				}
			})
	}
}

export default changeStartEnd
