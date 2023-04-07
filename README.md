# Snake

Для старта приложения необходимо поменять в файле NotificationHub на строке 13 переменную string addressServer = "https://localhost:44349" и вставить в файле Program.cs на строке 13 строку подкючения к бд string connectionString = builder.Configuration["ConnectionString:NpgsqlConnectionString"].
