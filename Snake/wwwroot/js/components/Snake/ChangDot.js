import changeStartEnd from '/js/SignaIR/Snake/db/ChangeStartEnd.js'

async function changDot(
	lastField,
	firstField,
	playerNumber,
	moveNumber,
	start,
	simulation = false
) {
	const gameTitle = document.querySelector('.game-title')

	if (playerNumber == 1) {
		lastField.setAttribute('src', '/img/dot_green.svg')

		if (moveNumber != 0) {
			firstField.setAttribute('src', '/img/dot_blue.svg')
		} else {
			start = firstField.id
			firstField.setAttribute('src', '/img/dot_green.svg')

			if (!simulation) {
				changeStartEnd(firstField, 'ChangeStart')
			}
		}

		playerNumber = 2
	} else {
		lastField.setAttribute('src', '/img/dot_blue.svg')
		firstField.setAttribute('src', '/img/dot_green.svg')

		playerNumber = 1
		gameTitle.textContent = `Ход игрока ${playerNumber}`
	}

	gameTitle.textContent = `Ход игрока ${playerNumber}`

	let returnValue = {
		start,
		playerNumber,
	}

	return returnValue
}

export default changDot
