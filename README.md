# Snake

Для старта приложения необходимо поменять в файле NotificationHub на строке 13 переменную string addressServer = "https://localhost:44349" и вставить в файле Program.cs на строке 13 строку подкючения к бд string connectionString = builder.Configuration["ConnectionString:NpgsqlConnectionString"].

В данном приложении возможно взаимодействие 2 пользователях в разных браузерах или если выложить на хостинг и создать не локальную бд, то возможна игра на разных устройствах. SignaIR в данном приложении отвечает за обращение к бд и отправку сообщений пользователям. Id игры хранится в локальном хранилище браузера, по этому игра в "онлайне" возможно только между 2 людьми (в одной сессии) так как я не стал сильно заморачиваться с SignaIR.
