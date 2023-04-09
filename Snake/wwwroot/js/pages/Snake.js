import clickDot from '/js/components/Snake/ClickDot.js'
import checkLocalStorageId from '/js/SignaIR/Snake/CheckLocalStorageId.js'
import removeSnake from '/js/SignaIR/Snake/RemoveSnake.js'
import simulation from '/js/SignaIR/Snake/Simulation.js'

let connection = new signalR.HubConnectionBuilder()
	.withUrl("/notification")
	.configureLogging(signalR.LogLevel.Warning)
	.build();


const dots = document.querySelectorAll('.dot')

checkLocalStorageId()
simulation()

dots.forEach((dot) => {
	dot.addEventListener('click', clickDot)
})

document.querySelector('#reset').addEventListener('click', async function () {
    removeSnake()

	if (connection._connectionState === signalR.HubConnectionState.Connected) {
		await connection.invoke('SendNotification', "Другой игрок обновил игру");
	} else {
		await connection.start().then(async () => {
			await connection.invoke('SendNotification', "Другой игрок обновил игру");
		}).catch((error) => {
			console.error(error);
		});
	}
})


receivingMessages()

async function receivingMessages() {

	connection.on("ReceiveNotification", function (message) {
		let numbers = message.match(/\d+/g);
		let letters = message.match(/[^\d\s]+/g);

		letters = letters.join(" ")

		if (message == 'Другой игрок сделал ход') {
            simulation()
		}

		if (message == 'Другой игрок обновил игру') {
			removeSnake()
			alert('Другой игрок обновил игру')
		}

		if (letters == 'Созадна новая игра') {
			localStorage.setItem('SnakeId', numbers[0])
		}
    });

    await connection.start();
}