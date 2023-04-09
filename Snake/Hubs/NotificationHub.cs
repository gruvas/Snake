using Microsoft.AspNetCore.SignalR;
using Snake.Domain.Models;

namespace Snake.Hubs
{
    public class NotificationHub : Hub
    {
         // Address of the server on which the application is running
        //string addressServer = "https://localhost:44349"; // Адрес сервера

        public async Task SendNotification(string message)
        {
            // Отправка сообщения всем клиентам, кроме отправителя
            await Clients.Others.SendAsync("ReceiveNotification", message);
        }
    }
}
