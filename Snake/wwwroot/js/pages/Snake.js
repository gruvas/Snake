import lineColoring from '/js/components/LineColoring.js'

const dots = document.querySelectorAll('.dot');
const gameTitle = document.querySelector('.game-title');
let arr = []
let userNumber = 1
let element1, element2
let numberMoves = 0
let startSelected = false
let gameOver = false

// startId indicates where the game started from
// endId indicates which last field was selected
let startId, endId


dots.forEach(dot => {
    dot.addEventListener('click', function () {
        if (gameOver) {
            alert("Игра завершена. Нажмите на кнопку сбросить чтобы начать сначала.")
            return;
        }

        if (element1 == undefined) {

            if (this.id != startId && this.id != endId && numberMoves > 0) {
                alert("Выбранный вами элемент не является началом или концом змеи. Пожалуйста, выберите другое поле.")
                return;
            }

            if (this.id == startId && numberMoves > 0) {
                startSelected = true
            }

            element1 = this

            this.setAttribute('src', "/img/dot_red.svg")
        } else {
            const id = this.id;
            element2 = this

            if (arr.includes(id)) {
                gameOver = true
                alert(`Победу одержал ${userNumber} игрок`)
                gameTitle.textContent = `Победу одержал ${userNumber} игрок`
                return false
            }

            if (element1 == element2) {
                element1 = undefined
                element2 = undefined
                element2.setAttribute('src', "/img/dot.svg")
                return;
            }

            lineColoring(element1, element2, userNumber)

            if (userNumber == 1) {
                element2.setAttribute('src', "/img/dot_green.svg")

                if (numberMoves != 0) {
                    element1.setAttribute('src', "/img/dot_blue.svg")
                } else {
                    arr.push(element1.id)
                    startId = element1.id
                    element1.setAttribute('src', "/img/dot_green.svg")
                }

                userNumber = 2
                gameTitle.textContent = `Ход игрока ${userNumber}`

            } else {
                element2.setAttribute('src', "/img/dot_blue.svg")
                element1.setAttribute('src', "/img/dot_green.svg")

                userNumber = 1
                gameTitle.textContent = `Ход игрока ${userNumber}`
            }

            arr.push(id)

            if (startSelected) {
                startId = element2.id
                startSelected = false
            } else {
                endId = element2.id
            }

            element1 = undefined
            element2 = undefined
            numberMoves++

            document.querySelector('#numberMoves').textContent = numberMoves
        }
    });
});
