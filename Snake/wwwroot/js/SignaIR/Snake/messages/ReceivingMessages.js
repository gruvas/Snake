import simulation from '/js/SignaIR/Snake/db/Simulation.js'

async function receivingMessages() {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl("/notification")
        .configureLogging(signalR.LogLevel.Warning)
        .build();

	connection.on("ReceiveNotification", function (message) {
		let numbers = message.match(/\d+/g);
		let letters = message.match(/[^\d\s]+/g);

		letters = letters.join(" ")

		if (message == 'Другой игрок сделал ход') {
			simulation()
		}

		if (letters == 'Созадна новая игра') {
			localStorage.setItem('SnakeId', numbers[0])
			alert('Другой игрок обновил игру')
			location.reload()
		}
	});

	await connection.start();
}

export default receivingMessages