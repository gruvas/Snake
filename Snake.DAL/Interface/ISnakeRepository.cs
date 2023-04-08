namespace Snake.DAL.Interface
{
    public interface ISnakeRepository
    {
        int CreateSnake();
        dynamic GetSnake(int id);
        bool CheckSnakeExists(int snakeGameId);
        void AddMove(int snakeGameId, int playerNumber, int firstField, int lastField, int moveNumber);
        bool FieldValidation(int snakeGameId, int lastField);
        void EndGame(int snakeGame, int winner);
        void ChangeStart(int snakeGame, int start);
        void ChangeEnd(int snakeGame, int end);
        void RemoveSnake(int id);
        dynamic Simulation(int id);
    }
}
