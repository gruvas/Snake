async function newGameAnnouncement(snakeId) {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl("/notification")
        .configureLogging(signalR.LogLevel.Warning)
        .build();

    if (connection._connectionState === signalR.HubConnectionState.Connected) {
        await connection.invoke('SendNotification', ('Созадна новая игра ' + snakeId));
    } else {
        await connection.start().then(async () => {
            await connection.invoke('SendNotification', ('Созадна новая игра ' + snakeId));
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default newGameAnnouncement