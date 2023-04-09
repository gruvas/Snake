﻿import changDot from '/js/components/Snake/changDot.js'
import lineColoring from '/js/components/Snake/LineColoring.js'
import addMove from '/js/SignaIR/Snake/AddMove.js'
import changeStartEnd from '/js/SignaIR/Snake/ChangeStartEnd.js'
import fieldValidation from '/js/SignaIR/Snake/FieldValidation.js'
import getDataForDot from '/js/SignaIR/Snake/getDataForDot.js'

let playerNumber = 1
let firstField, lastField
let moveNumber = 0
let startSelected = false
let gameOver = false
let rememberPreviousDot

// startId indicates where the game started from
// endId indicates which last field was selected
let start, end


if (localStorage.getItem('SnakeId')) {
	getDataForDot().then(value => {
		start = value.start
		end = value.end
		moveNumber = value.moveNumber
		gameOver = value.gameOver
		playerNumber = value.playerNumber
	})
}

let connection = new signalR.HubConnectionBuilder()
	.withUrl("/notification")
	.configureLogging(signalR.LogLevel.Warning)
	.build();

receivingMessages()


async function receivingMessages() {

	connection.on("ReceiveNotification", function (message) {
		if (message == 'Другой игрок сделал ход') {
			getDataForDot().then(value => {
				start = value.start
				end = value.end
				moveNumber = value.moveNumber
				gameOver = value.gameOver
				playerNumber = value.playerNumber
			})
		}
	});

	await connection.start();
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

		rememberPreviousDot = this.getAttribute('src')
		this.setAttribute('src', '/img/dot_red.svg')
	} else {
		lastField = this

		if (firstField == lastField) {
			lastField.setAttribute('src', rememberPreviousDot)
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
