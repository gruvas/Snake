import changDot from '/js/components/Snake/changDot.js'
import lineColoring from '/js/components/Snake/LineColoring.js'
import addMove from '/js/SignaIR/Snake/AddMove.js'
import changeStartEnd from '/js/SignaIR/Snake/ChangeStartEnd.js'
import fieldValidation from '/js/SignaIR/Snake/FieldValidation.js'

let playerNumber = 1
let firstField, lastField
let moveNumber = 0
let startSelected = false
let gameOver = false
let rememberPreviousPoint
let snake, moves

// startId indicates where the game started from
// endId indicates which last field was selected
let start, end


let connection = new signalR.HubConnectionBuilder()
	.withUrl('/hubs')
	.configureLogging(signalR.LogLevel.Warning)
	.build()

const snakeGameId = parseInt(localStorage.getItem('SnakeId'))

if (snakeGameId) {
	await connection
		.start()
		.then(async function () {
			snake = await connection.invoke('getSnake', snakeGameId)
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

	if (snake) {
		snake = JSON.parse(snake)
		moves = JSON.parse(moves)

		moveNumber = moves.length
		gameOver = snake.GameOver

		if (snake.Start < 10) {
			start = 'dot0' + snake.Start

		} else {
			start = 'dot' + snake.Start
		}

		if (snake.Start < 10) {
			end = 'dot0' + snake.End

		} else {
			end = 'dot' + snake.End
		}
		
		if (gameOver) {
			alert(`Игра завершена победой игрока ${snake.Winner}. Нажмите на кнопку сбросить чтобы начать сначала.`)
		}
	}
}


async function clickDot() {
	if (gameOver) {
		alert('Игра завершена. Нажмите на кнопку сбросить чтобы начать сначала.')
		return
	}

	if (firstField == undefined) {
		if (this.id != start && this.id != end && moveNumber > 0) {
			alert(
				'Выбранный вами элемент не является началом или концом змеи. Пожалуйста, выберите другое поле.'
			)
			return
		}

		if (this.id == start && moveNumber > 0) {
			startSelected = true
		}

		firstField = this

		rememberPreviousPoint = this.getAttribute('src')
		this.setAttribute('src', '/img/dot_red.svg')
	} else {
		lastField = this

		if (firstField == lastField) {
			lastField.setAttribute('src', rememberPreviousPoint)
			firstField = undefined
			lastField = undefined
			return
		}

		fieldValidation(lastField, playerNumber).then((value) => (gameOver = value))

		addMove(playerNumber, firstField, lastField, moveNumber)

		lineColoring(firstField, lastField, playerNumber)

		await changDot(lastField, firstField, playerNumber, moveNumber, start).then(
			(value) => {
				start = value.start
				playerNumber = value.playerNumber
			}
		)

		if (startSelected) {
			start = lastField.id
			startSelected = false
			changeStartEnd(lastField, 'ChangeStart')
		} else {
			end = lastField.id

			changeStartEnd(lastField, 'ChangeEnd')
		}

		firstField = undefined
		lastField = undefined
		moveNumber++

		document.querySelector('#numberMoves').textContent = moveNumber
	}
}

export default clickDot
