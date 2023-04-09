function lastFieldCheck(firstField, lastField) {
	firstField = firstField.id
	lastField = lastField.id


	firstField = firstField.match(/\d+/g)
	firstField = Array.from(firstField[0])

	lastField = lastField.match(/\d+/g)
	lastField = Array.from(lastField[0])

	if ((firstField[0] == lastField[0] || firstField[0] == parseInt(lastField[0]) - 1 || firstField[0] == parseInt(lastField[0]) + 1) &&
		(firstField[1] == lastField[1] || firstField[1] == parseInt(lastField[1]) - 1 || firstField[1] == parseInt(lastField[1]) + 1)) {
		return true
	}

	return false
}

export default lastFieldCheck