import lineColoring from '/js/components/Snake/LineColoring.js'
import changDot from '/js/components/Snake/ChangDot.js'

async function simulation() {
	let moves

	let connection = new signalR.HubConnectionBuilder()
		.withUrl('/hubs')
		.configureLogging(signalR.LogLevel.Warning)
		.build()

	const snakeGameId = parseInt(localStorage.getItem('SnakeId'))

	await connection
		.start()
		.then(async function () {
			moves = await connection.invoke('Simulation', snakeGameId)
			moves = JSON.parse(moves)
		})
		.catch(function (err) {
			console.error(err.toString())
		})
		.finally(async () => {
			if (connection._connectionState === signalR.HubConnectionState.Connected) {
				await connection.stop()
			}
		})
	
	moves.sort(function (a, b) {
		return a.MoveNumber - b.MoveNumber;
	});

	document.querySelector('#numberMoves').textContent = moves.length

	for (let i = 0; i < moves.length; i++) {
		let firstField, lastField
		if (moves[i].FirstField < 10) {
			firstField = document.querySelector('#dot' + 0 + moves[i].FirstField)
		} else {
			firstField = document.querySelector(`#dot${moves[i].FirstField}`)
		}

		if (moves[i].LastField < 10) {
			lastField = document.querySelector('#dot' + 0 + moves[i].LastField)
		} else {
			lastField = document.querySelector(`#dot${moves[i].LastField}`)
		}

		lineColoring(firstField, lastField, moves[i].PlayerNumber)

		changDot(firstField, lastField, moves[i].PlayerNumber, moves[i].MoveNumber - 1, 1, true)
	}
}

export default simulation
