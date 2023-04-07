import clickDot from '/js/components/Snake/ClickDot.js'
import checkLlocalStorageId from '/js/SignaIR/Snake/CheckLlocalStorageId.js'
import removeSnake from '/js/SignaIR/Snake/RemoveSnake.js'

const dots = document.querySelectorAll('.dot')

checkLlocalStorageId()

dots.forEach((dot) => {
	dot.addEventListener('click', clickDot)
})

document.querySelector('#reset').addEventListener('click', async function () {
	removeSnake()
})
