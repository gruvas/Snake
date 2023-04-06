async function createSnake() {
    let snakeId = localStorage.getItem('SnakeId');

    if (!snakeId) {
        try {
            const response = await fetch('/createSnake', { method: 'POST' });
            const data = await response.json();
            snakeId = data;

            localStorage.setItem('SnakeId', snakeId);
        } catch (error) {
            console.error(error);
        }
    }

    return snakeId
}

export default createSnake