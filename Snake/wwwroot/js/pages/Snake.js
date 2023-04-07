import clickDot from '/js/components/Snake/ClickDot.js'
import checkLocalStorageId from '/js/SignaIR/Snake/CheckLocalStorageId.js'
import removeSnake from '/js/SignaIR/Snake/RemoveSnake.js'
import simulation from '/js/SignaIR/Snake/Simulation.js'

const dots = document.querySelectorAll('.dot')

checkLocalStorageId()
simulation()

dots.forEach((dot) => {
	dot.addEventListener('click', clickDot)
})

document.querySelector('#reset').addEventListener('click', async function () {
	removeSnake()
})
