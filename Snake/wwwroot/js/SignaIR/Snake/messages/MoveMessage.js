async function moveMessage() {
	let connectionNotification = new signalR.HubConnectionBuilder()
		.withUrl("/notification")
		.configureLogging(signalR.LogLevel.Warning)
		.build();

	if (connectionNotification._connectionState === signalR.HubConnectionState.Connected) {
		await connectionNotification.invoke('SendNotification', "Другой игрок сделал ход");
	} else {
		await connectionNotification.start().then(async () => {
			await connectionNotification.invoke('SendNotification', "Другой игрок сделал ход");
		}).catch((error) => {
			console.error(error);
		});
	}
}

export default moveMessage