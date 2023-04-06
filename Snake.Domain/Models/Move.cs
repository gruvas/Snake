namespace Snake.Domain.Models
{
    public class Move
    {
        public int? SnakeGameID { get; set; }
        public int? PlayerNumber { get; set; }
        public int? FirstField { get; set; }
        public int? LastField { get; set; }
        public int? MoveNumber { get; set; }
    }
}
