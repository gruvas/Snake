using Dapper;
using Npgsql;
using Snake.DAL.Interface;
using Snake.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake.DAL.Repositories
{
    public class SnakeRepository : ISnakeRepository
    {
        string connectionString = "";

        public SnakeRepository(string connection)
        {
            connectionString = connection;
        }

        public int CreateSnake()
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string insertQuery = $"INSERT INTO public.snake_game DEFAULT VALUES RETURNING \"Id\"";
                return db.QueryFirstOrDefault<int>(insertQuery);
            }
        }

        public bool CheckSnakeExists(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string selectQuery = "SELECT COUNT(*) FROM public.snake_game WHERE \"Id\" = @id";
                int count = db.ExecuteScalar<int>(selectQuery, new { id });

                if (count > 0)
                {
                    return true;
                }

                return false;
            }
        }

        public void AddMove(int snakeGameId, int playerNumber, int firstField, int lastField, int moveNumber)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string insertQuery = $"INSERT INTO public.moves " +
                    $"(\"SnakeGameId\", \"PlayerNumber\", \"FirstField\", \"LastField\", \"MoveNumber\") " + 
                    $"VALUES (@snakeGameId, @playerNumber, @firstField, @lastField, @MoveNumber)";
                db.QueryFirstOrDefault<int>(insertQuery, new { snakeGameId, playerNumber, firstField, lastField, moveNumber });
            }
        }

        public bool FieldValidation(int snakeGameId, int lastField)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string checkQuery = $"SELECT COUNT(*) FROM public.moves " +
                              $"WHERE (\"FirstField\" = @lastField OR \"LastField\" = @lastField) " +
                              $"AND \"SnakeGameId\" = @snakeGameId";
                int count = db.ExecuteScalar<int>(checkQuery, new { lastField, snakeGameId });

                if (count > 0)
                {
                    return false;
                }

                return true;
            }
        }

        public void EndGame(int id, int winner)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string updateQuery = $"UPDATE public.snake_game " +
                    $"SET \"GameOver\" = true, \"Winner\" = @winner " +
                    $"WHERE \"Id\" = @id";
                db.Execute(updateQuery, new { id, winner });
            }
        }

        public void ChangeStart(int id, int start)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string updateQuery = $"UPDATE public.snake_game " +
                    $"SET \"Start\" = @start " +
                    $"WHERE \"Id\" = @id";
                db.Execute(updateQuery, new { id, start });
            }
        }

        public void ChangeEnd(int id, int end)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string updateQuery = $"UPDATE public.snake_game " +
                    $"SET \"End\" = @end " +
                    $"WHERE \"Id\" = @id";
                db.Execute(updateQuery, new { id, end });
            }
        }

        public void RemoveSnake(int id)
        {
            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                string deleteQuery = $"DELETE FROM public.snake_game " +
                    $"WHERE \"Id\" = @id";
                db.Execute(deleteQuery, new { id });
            }
        }
    }
}

