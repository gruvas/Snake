using Microsoft.AspNetCore.Mvc;
using Snake.DAL.Interface;
using Snake.Domain.Models;
using Snake.Models;
using System.Diagnostics;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace Snake.Controllers
{
    internal class MyData
    {
        public string test { get; set; }
    }
    public class SnakeController : Controller
    {
        private readonly ISnakeRepository _snakeRepository;

        public SnakeController(ISnakeRepository snakeRepository)
        {
            _snakeRepository = snakeRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        
        [HttpPost("createSnake")]
        public IActionResult CreateSnake()
        {           
            var newSnakeId = _snakeRepository.CreateSnake();

            return Ok(newSnakeId);
        }

        
        [HttpPost("checkSnakeExists")]
        public IActionResult CheckSnakeExists([FromBody] SnakeGame snakeGameId)
        {
            string snakeJson = JsonSerializer.Serialize(snakeGameId);
            SnakeGame parsedSnake = JsonSerializer.Deserialize<SnakeGame>(snakeJson);

            int id = parsedSnake.Id;

            var newSnakeId = _snakeRepository.CheckSnakeExists(id);

            return Ok(newSnakeId);
        }
        

        [HttpPost("addMove")]
        public IActionResult AddMove([FromBody] Move move)
        {
            string moveJson = JsonSerializer.Serialize(move);
            Move parsedMove = JsonSerializer.Deserialize<Move>(moveJson);

            int snakeGameId = (int)parsedMove.SnakeGameID;
            int playerNumber = (int)parsedMove.PlayerNumber;
            int firstField = (int)parsedMove.FirstField;
            int lastField = (int)parsedMove.LastField;
            int moveNumber = (int)parsedMove.MoveNumber;

            _snakeRepository.AddMove(snakeGameId, playerNumber, firstField, lastField, moveNumber);

            return Ok();
        }

        [HttpPost("fieldValidation")]
        public IActionResult FieldValidation([FromBody] Move move)
        {
            string moveJson = JsonSerializer.Serialize(move);
            Move parsedMove = JsonSerializer.Deserialize<Move>(moveJson);

            int snakeGameId = (int)parsedMove.SnakeGameID;
            int lastField = (int)parsedMove.LastField;

            bool valid = _snakeRepository.FieldValidation(snakeGameId, lastField);

            return Ok(valid);
        }

        [HttpPost("endGame")]
        public IActionResult EndGame([FromBody] SnakeGame snakeGame)
        {
            string snakeJson = JsonSerializer.Serialize(snakeGame);
            SnakeGame parsedSnake = JsonSerializer.Deserialize<SnakeGame>(snakeJson);

            int id = parsedSnake.Id;
            int winner = (int)parsedSnake.Winner;

            _snakeRepository.EndGame(id, winner);

            return Ok();
        }

        [HttpPost("changeStart")]
        public IActionResult ChangeStart([FromBody] SnakeGame snakeGame)
        {
            string snakeJson = JsonSerializer.Serialize(snakeGame);
            SnakeGame parsedSnake = JsonSerializer.Deserialize<SnakeGame>(snakeJson);

            int id = parsedSnake.Id;
            int start = (int)parsedSnake.Start;

            _snakeRepository.ChangeStart(id, start);

            return Ok();
        }

        [HttpPost("changeEnd")]
        public IActionResult ChangeEnd([FromBody] SnakeGame snakeGame)
        {
            string snakeJson = JsonSerializer.Serialize(snakeGame);
            SnakeGame parsedSnake = JsonSerializer.Deserialize<SnakeGame>(snakeJson);

            int id = parsedSnake.Id;
            int end = (int)parsedSnake.End;

            _snakeRepository.ChangeEnd(id, end);

            return Ok();
        }

        [HttpPost("removeSnake")]
        public IActionResult RemoveSnake([FromBody] SnakeGame snakeGame)
        {
            string snakeJson = JsonSerializer.Serialize(snakeGame);
            SnakeGame parsedSnake = JsonSerializer.Deserialize<SnakeGame>(snakeJson);

            int id = parsedSnake.Id;

            _snakeRepository.RemoveSnake(id);

            return Ok();
        }
    }
}