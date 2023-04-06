import lineColoring from '/js/components/LineColoring.js'
import createSnake from '/js/components/createSnake.js'

const dots = document.querySelectorAll('.dot');
const gameTitle = document.querySelector('.game-title');
let arr = []
let playerNumber = 1
let firstField, lastField
let moveNumber = 0
let startSelected = false
let gameOver = false
let wrongFieldsSelected = false

// startId indicates where the game started from
// endId indicates which last field was selected
let start, end




main()



async function main() {

    let connection = new signalR.HubConnectionBuilder()
        .withUrl("/hubs")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    if (localStorage.getItem('SnakeId')) {
        await connection.start().then(async function () {
            const found = await connection.invoke("CheckSnakeExists", parseInt(localStorage.getItem('SnakeId')));

            if (!found) {
                localStorage.removeItem('SnakeId');
                return;
            }
        }).catch(function (err) {
            console.error(err.toString());
        }).finally(async () => {
            if (connection._connectionState === signalR.HubConnectionState.Connected) {
                await connection.stop()
            }
        })
    }

    if (!localStorage.getItem('SnakeId')) {
        await connection.start().then(async function () {
            const snakeId = await connection.invoke("CreateSnake");
            localStorage.setItem('SnakeId', snakeId);
        }).catch(function (err) {
            console.error(err.toString());
        }).finally(async () => {
            if (connection._connectionState === signalR.HubConnectionState.Connected) {
                await connection.stop()
            }
        })
    }






    dots.forEach(dot => {
        dot.addEventListener('click', async function () {
            if (gameOver) {
                alert("Игра завершена. Нажмите на кнопку сбросить чтобы начать сначала.")
                return;
            }


            if (firstField == undefined) {

                if (this.id != start && this.id != end && moveNumber > 0) {
                    alert("Выбранный вами элемент не является началом или концом змеи. Пожалуйста, выберите другое поле.")
                    return;
                }

                if (this.id == start && moveNumber > 0) {
                    startSelected = true
                }

                firstField = this

                this.setAttribute('src', "/img/dot_red.svg")
            } else {
                const id = this.id;
                lastField = this

                if (firstField == lastField) {
                    lastField.setAttribute('src', "/img/dot.svg")
                    firstField = undefined
                    lastField = undefined
                    return;
                }



                await connection.start().then(async function () {
                    const snakeGameId = parseInt(localStorage.getItem('SnakeId'));
                    let [lastFd] = lastField.id.match(/\d+/)
                    lastFd = parseInt(lastFd)

                    console.log(gameOver)

                    let valid = await connection.invoke("FieldValidation", snakeGameId, lastFd);
                    gameOver = !valid

                    console.log(valid)
                    console.log(gameOver)


                    if (gameOver) {
                        let winner

                        if (playerNumber == 1) {
                            winner = 2
                        } else {
                            winner = 1
                        }

                        await connection.invoke("EndGame", snakeGameId, winner);

                        alert(`Победу одержал ${winner} игрок`)
                        gameTitle.textContent = `Победу одержал ${winner} игрок`
                    }


                    return false

                }).catch(function (err) {
                    console.error(err.toString());
                }).finally(async () => {
                    if (connection._connectionState === signalR.HubConnectionState.Connected) {
                        await connection.stop()
                    }
                })


                let [firstFd] = firstField.id.match(/\d+/)
                let [lastFd] = lastField.id.match(/\d+/)
                firstFd = parseInt(firstFd)
                lastFd = parseInt(lastFd)


                
                await connection.start().then(async function () {
                    const snakeGameId = parseInt(localStorage.getItem('SnakeId'));

                    await connection.invoke("AddMove", snakeGameId, playerNumber, firstFd, lastFd, moveNumber + 1);

                }).catch(function (err) {
                    console.error(err.toString());
                }).finally(async () => {
                    if (connection._connectionState === signalR.HubConnectionState.Connected) {
                        await connection.stop()
                    }
                })


                lineColoring(firstField, lastField, playerNumber)

                if (playerNumber == 1) {
                    lastField.setAttribute('src', "/img/dot_green.svg")

                    if (moveNumber != 0) {
                        firstField.setAttribute('src', "/img/dot_blue.svg")
                    } else {
                        arr.push(firstField.id)
                        start = firstField.id
                        firstField.setAttribute('src', "/img/dot_green.svg")

                        await connection.start().then(async function () {
                            const snakeGameId = parseInt(localStorage.getItem('SnakeId'));

                            await connection.invoke("ChangeStart", snakeGameId, firstFd);

                        }).catch(function (err) {
                            console.error(err.toString());
                        }).finally(async () => {
                            if (connection._connectionState === signalR.HubConnectionState.Connected) {
                                await connection.stop()
                            }
                        })
                    }

                    playerNumber = 2
                    gameTitle.textContent = `Ход игрока ${playerNumber}`

                } else {
                    lastField.setAttribute('src', "/img/dot_blue.svg")
                    firstField.setAttribute('src', "/img/dot_green.svg")

                    playerNumber = 1
                    gameTitle.textContent = `Ход игрока ${playerNumber}`
                }

                arr.push(id)

                if (startSelected) {
                    start = lastField.id
                    startSelected = false

                    await connection.start().then(async function () {
                        const snakeGameId = parseInt(localStorage.getItem('SnakeId'));

                        await connection.invoke("ChangeStart", snakeGameId, lastFd);

                    }).catch(function (err) {
                        console.error(err.toString());
                    }).finally(async () => {
                        if (connection._connectionState === signalR.HubConnectionState.Connected) {
                            await connection.stop()
                        }
                    })
                } else {
                    end = lastField.id

                    await connection.start().then(async function () {
                        const snakeGameId = parseInt(localStorage.getItem('SnakeId'));

                        await connection.invoke("ChangeEnd", snakeGameId, lastFd);

                    }).catch(function (err) {
                        console.error(err.toString());
                    }).finally(async () => {
                        if (connection._connectionState === signalR.HubConnectionState.Connected) {
                            await connection.stop()
                        }
                    })
                }

                firstField = undefined
                lastField = undefined
                moveNumber++

                document.querySelector('#numberMoves').textContent = moveNumber
            }
        });
    });

    document.querySelector('#reset').addEventListener('click', async function () {
        await connection.start().then(async function () {
            const snakeGameId = parseInt(localStorage.getItem('SnakeId'));

            await connection.invoke("RemoveSnake", snakeGameId);

        }).catch(function (err) {
            console.error(err.toString());
        }).finally(async () => {
            if (connection._connectionState === signalR.HubConnectionState.Connected) {
                await connection.stop()
            }

            localStorage.removeItem('SnakeId');
            location.reload();
        })
    })
}
