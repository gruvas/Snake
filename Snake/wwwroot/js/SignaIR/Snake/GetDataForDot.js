async function getDataForDot() {
	let snake, moves, start, end, moveNumber, gameOver, playerNumber
	let connection = new signalR.HubConnectionBuilder()
		.withUrl('/hubs')
		.configureLogging(signalR.LogLevel.Warning)
		.build()

	const snakeGameId = parseInt(localStorage.getItem('SnakeId'))
	
	await connection
		.start()
		.then(async function () {
			snake = await connection.invoke('GetSnake', snakeGameId)
			moves = await connection.invoke('Simulation', snakeGameId)
		})
		.catch(function (err) {
			console.error(err.toString())
		})
		.finally(async () => {
			if (connection._connectionState === signalR.HubConnectionState.Connected) {
				await connection.stop()
			}
		})

	if (snakeGameId && moves) {
		snake = JSON.parse(snake)
		moves = JSON.parse(moves)

		moveNumber = moves.length
		gameOver = snake.GameOver

		start = snake.Start < 10 ? 'dot0' + snake.Start : 'dot' + snake.Start
		end = snake.End < 10 ? 'dot0' + snake.End : 'dot' + snake.End

		if (gameOver) {
			alert(`Игра завершена победой игрока ${snake.Winner}. Нажмите на кнопку сбросить чтобы начать сначала.`)
		}

		const playerNumber = moveNumber % 2 === 0 ? 1 : 2

		return ({ start, end, moveNumber, gameOver, playerNumber })
	}
}

export default getDataForDot