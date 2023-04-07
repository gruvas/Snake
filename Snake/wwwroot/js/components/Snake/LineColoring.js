function lineColoring (element1, element2, userNumber) {
    const [number1] = element1.id.match(/\d+/)
    const [number2] = element2.id.match(/\d+/)

    const arrNumbers1 = number1.split("").map(digit => parseInt(digit));
    const arrNumbers2 = number2.split("").map(digit => parseInt(digit));

    if (arrNumbers1[0] == arrNumbers2[0]) {
        const type = "horizontal"

        if (arrNumbers1[1] < arrNumbers2[1]) {
            painting(number1, userNumber, type)
        } else {
            painting(number2, userNumber, type)
        }
    } else {
        const type = "vertical"

        if (arrNumbers1[0] > arrNumbers2[0]) {
            painting(number2, userNumber, type)
        } else {
            painting(number1, userNumber, type)
        }
    }
}

function painting(number, userNumber, type) {
    if (type == "horizontal") {
        const line = document.querySelector(`#line-horizontal${number}`)

        if (userNumber == 1) {
            line.style.backgroundColor = "#34c924";
        } else {
            line.style.backgroundColor = "#42aaff";
        }
    } else {
        const line = document.querySelector(`#line-vertical${number}`)

        if (userNumber == 1) {
            line.style.backgroundColor = "#34c924";
        } else {
            line.style.backgroundColor = "#42aaff";
        }
    }
}

export default lineColoring