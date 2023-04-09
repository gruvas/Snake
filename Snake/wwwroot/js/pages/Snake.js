import clickDot from '/js/components/Snake/ClickDot.js'
import checkLocalStorageId from '/js/SignaIR/Snake/db/CheckLocalStorageId.js'
import removeSnake from '/js/SignaIR/Snake/db/RemoveSnake.js'
import simulation from '/js/SignaIR/Snake/db/Simulation.js'
import receivingMessages from '/js/SignaIR/Snake/messages/ReceivingMessages.js'


const dots = document.querySelectorAll('.dot')

checkLocalStorageId()
simulation()
receivingMessages()

dots.forEach((dot) => {
	dot.addEventListener('click', clickDot)
})

document.querySelector('#reset').addEventListener('click', async function () {
    removeSnake()
})