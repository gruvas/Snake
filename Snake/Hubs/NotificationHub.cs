using Microsoft.AspNetCore.SignalR;
using Snake.Domain.Models;

namespace Snake.Hubs
{
    public class NotificationHub : Hub
    {
        private static Dictionary<string, string> _connections = new Dictionary<string, string>();
        private static Dictionary<string, string> _snakeIds = new Dictionary<string, string>();
        private static List<string> _snakeIdsQueue = new List<string>();

        // Address of the server on which the application is running
        string addressServer = "https://localhost:44349";


        public async Task<int> CreateSnake()
        {
            var httpClient = new HttpClient();
            var response = await httpClient.PostAsync((addressServer + "/createSnake"), null);

            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            var snakeId = responseContent.Trim('"');

            return int.Parse(snakeId);
        }

        public async Task<dynamic> GetSnake(int id)
        {
            var httpClient = new HttpClient();

            var snake = new SnakeGame
            {
                Id = id
            };

            dynamic response = await httpClient.PostAsJsonAsync((addressServer + "/getSnake"), snake);
            response.EnsureSuccessStatusCode();

            dynamic responseContent = await response.Content.ReadAsStringAsync();

            return responseContent;
        }

        public async Task<bool> CheckSnakeExists(int snakeGameId)
        {
            var httpClient = new HttpClient();

            var snakeId = new SnakeGame
            {
                Id = snakeGameId,
            };

            var response = await httpClient.PostAsJsonAsync((addressServer + "/checkSnakeExists"), snakeId);

            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            bool responseBool = bool.Parse(responseContent);

            return responseBool;
        }
       
        public async Task<Task> AddMove(int snakeGameId, int playerNumber, int firstField, int lastField, int moveNumber)
        {
            var httpClient = new HttpClient();

            var move = new Move 
            {
                SnakeGameID = snakeGameId,
                PlayerNumber = playerNumber,
                FirstField = firstField,
                LastField = lastField,
                MoveNumber = moveNumber
            };

            await httpClient.PostAsJsonAsync(addressServer + "/addMove", move);

            return Task.CompletedTask;
        }

        public async Task<bool> FieldValidation(int snakeGameId, int lastField)
        {
            var httpClient = new HttpClient();

            var move = new Move
            {
                SnakeGameID = snakeGameId,
                LastField = lastField
            };

            var response = await httpClient.PostAsJsonAsync(addressServer + "/fieldValidation", move);


            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            bool responseBool = bool.Parse(responseContent);

            return responseBool;
        }

        public async Task<Task> EndGame(int id, int winner)
        {
            var httpClient = new HttpClient();

            var snake = new SnakeGame
            {
                Id = id,
                Winner = winner
            };

            await httpClient.PostAsJsonAsync((addressServer + "/endGame"), snake);

            return Task.CompletedTask;
        }
        
        public async Task<Task> ChangeStart(int id, int start)
        {
            var httpClient = new HttpClient();

            var snake = new SnakeGame
            {
                Id = id,
                Start = start
            };

            await httpClient.PostAsJsonAsync((addressServer + "/changeStart"), snake);

            return Task.CompletedTask;
        }
        
        public async Task<Task> ChangeEnd(int id, int end)
        {
            var httpClient = new HttpClient();

            var snake = new SnakeGame
            {
                Id = id,
                End = end
            };

            await httpClient.PostAsJsonAsync((addressServer + "/changeEnd"), snake);

            return Task.CompletedTask;
        }
        
        public async Task<Task> RemoveSnake(int id)
        {
            var httpClient = new HttpClient();

            var snake = new SnakeGame
            {
                Id = id
            };

            await httpClient.PostAsJsonAsync((addressServer + "/removeSnake"), snake);

            return Task.CompletedTask;
        }
        
        public async Task<dynamic> Simulation(int id)
        {
            var httpClient = new HttpClient();

            var snake = new SnakeGame
            {
                Id = id
            };

            dynamic response = await httpClient.PostAsJsonAsync((addressServer + "/simulation"), snake);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();

            return responseContent;
        }
    }
}
