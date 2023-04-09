import newGameMessage from '/js/SignaIR/Snake/messages/NewGameMessage.js'

async function checkLocalStorageId() {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl('/hubs')
        .configureLogging(signalR.LogLevel.Warning)
        .build()
          
    if (localStorage.getItem('SnakeId')) {
        await connection
            .start()
            .then(async function () {
                const found = await connection.invoke(
                    'CheckSnakeExists',
                    parseInt(localStorage.getItem('SnakeId'))
                )

                if (!found) {
                    constsnakeId = await connection.invoke('CreateSnake')
                    localStorage.setItem('SnakeId', snakeId)
                }
            })
            .catch(function (err) {
                console.error(err.toString())
            })
    }

    if (!localStorage.getItem('SnakeId')) {
        await connection
            .start()
            .then(async function () {
                const snakeId = await connection.invoke('CreateSnake')
                localStorage.setItem('SnakeId', snakeId)

                newGameMessage(snakeId)
            })
            .catch(function (err) {
                console.error(err.toString())
            })
    }

    if (connection._connectionState === signalR.HubConnectionState.Connected) {
        await connection.stop()
    }
}

export default checkLocalStorageId
