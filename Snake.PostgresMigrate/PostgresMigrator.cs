using DbUp;

namespace Snake.PostgresMigrate
{
    public class PostgresMigrator
    {
        public static void Migrate(string connectionString)
        {
            AppContext.SetSwitch("Npgsql.Enable Legacy TimestampBehavior", true);
            var upgrader = DeployChanges.To
            .PostgresqlDatabase(connectionString)
            .JournalToPostgresqlTable("protection", "__SchemaVersions")
            .WithScriptsFromFileSystem(Path.Combine("../Snake.PostgresMigrate/Scripts"))
            .WithVariable("BODY", "$BODY$")
            .WithExecutionTimeout(TimeSpan.FromSeconds(60 * 5))
            .Build();
            var result = upgrader.PerformUpgrade();
            if (!result.Successful)
                throw new Exception("Migrate error: ", result.Error);
        }
    }
}