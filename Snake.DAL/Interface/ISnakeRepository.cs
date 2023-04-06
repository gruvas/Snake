using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake.DAL.Interface
{
    public interface ISnakeRepository
    {
        int CreateSnake();
        bool CheckSnakeExists(int snakeGameId);
        void AddMove(int snakeGameId, int playerNumber, int firstField, int lastField, int moveNumber);
        bool FieldValidation(int snakeGameId, int lastField);
        void EndGame(int snakeGame, int winner);
        void ChangeStart(int snakeGame, int start);
        void ChangeEnd(int snakeGame, int end);
        void RemoveSnake(int id);
    }
}
