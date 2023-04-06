using System.Reflection;

namespace Snake.Domain.Models
{
    public class SnakeGame
    {
        public int Id { get; set; }
        public int? Start { get; set; }
        public int? End { get; set; }
        public bool? GameOver { get; set; }
        public int? Winner { get; set; }
        public List<Move>? Moves { get; set; }
    }
}
