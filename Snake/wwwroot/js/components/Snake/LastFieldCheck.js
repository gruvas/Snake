function lastFieldCheck(firstField, lastField) {
	firstField = firstField.id
	lastField = lastField.id


	firstField = firstField.match(/\d+/g)
	firstField = Array.from(firstField[0])

	lastField = lastField.match(/\d+/g)
	lastField = Array.from(lastField[0])

	console.log(firstField, lastField)

	const dx = parseInt(lastField[0]) - firstField[0];
	const dy = parseInt(lastField[1]) - firstField[1];
	const isDiagonal = Math.abs(dx) === 1 && Math.abs(dy) === 1;
	const isAdjacent = (dx === 0 || dy === 0) && !isDiagonal;

	return isAdjacent;
}

export default lastFieldCheck