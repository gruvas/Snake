using Microsoft.AspNetCore.Mvc;
using Snake.Models;
using System.Diagnostics;

namespace Snake.Controllers
{
    public class SnakeController : Controller
    {
        private readonly ILogger<SnakeController> _logger;

        public SnakeController(ILogger<SnakeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}