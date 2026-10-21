using CulturalEventRegistrationSystem.Server.Interface;
using CulturalEventRegistrationSystem.Server.Models;
using InterpolatedSql.SqlBuilders;
using System.ComponentModel.DataAnnotations;
using System.Data.SQLite;
using System.Transactions;

namespace CulturalEventRegistrationSystem.Server.db
{
    public class SqlLite : IDbContext
    {
        private string connString = "Data Source=db/SqliteDatabase.sqlite;Version=3;";

        public async Task<RegistrationsModel> Create(RegistrationsModel registration, int maxNumberOfReservations)
        {
            using SQLiteConnection dbConnection = new(connString);
            dbConnection.Open();
            using TransactionScope transaction = new TransactionScope();

            var numberOfReservations = await GetNumberOfReservedSeats(null, dbConnection);
            if (numberOfReservations + registration.TicketsReserved> maxNumberOfReservations)
            {
                throw new ValidationException($"Počet volných míst na události je menší než požadovaný. Aktuálně zbývá {maxNumberOfReservations - numberOfReservations} míst.");
            }

            var query = new SqlBuilder(
                $"""
                INSERT INTO Registrations (Id, Email, Tel, TicketsReserved) 
                VALUES ({registration.Id},{registration.Email},{registration.Tel},{registration.TicketsReserved})
                """).Build();
            var command = new SQLiteCommand(query.Sql, dbConnection);
            var param = new Object[] { registration.Id, registration.Email, registration.Tel, registration.TicketsReserved};
            for (var i = 0; i < query.SqlParameters.Count; i++)
            {
                command.Parameters.Add(new SQLiteParameter($"p{i}", param[i]));
            }
            command.ExecuteNonQuery();
            transaction.Complete();
            dbConnection.Close();
            return registration;
        }

        public async Task<RegistrationsModel> Get(string id)
        {
            RegistrationsModel result = null;
            using SQLiteConnection dbConnection = new(connString);
            dbConnection.Open();
            using TransactionScope transaction = new TransactionScope();
            var query = new SqlBuilder($"SELECT Id, Email, Tel, TicketsReserved FROM Registrations WHERE Id = '{id}'").Build();
            var command = new SQLiteCommand(query.Sql, dbConnection);
            for (var i = 0; i < query.SqlParameters.Count; i++)
            {
                command.Parameters.Add(new SQLiteParameter($"p{i}", id));
            }
            SQLiteDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                //load data
                var outTicketsReserved = int.Parse(reader["TicketsReserved"].ToString());
                result = new RegistrationsModel()
                {
                    Id = reader["Id"].ToString(),
                    Tel = reader["Email"].ToString(),
                    Email = reader["Tel"].ToString(),
                    TicketsReserved = outTicketsReserved,
                };
            }
            dbConnection.Close();
            transaction.Complete();
            return result;
        }

        public async Task<bool> Update(RegistrationsModel registration, int maxNumberOfReservations)
        {
            using SQLiteConnection dbConnection = new(connString);
            dbConnection.Open();
            using TransactionScope transaction = new TransactionScope();

            //check
            var numberOfReservations = await GetNumberOfReservedSeats(registration.Id, dbConnection);
            if (numberOfReservations + registration.TicketsReserved > maxNumberOfReservations)
            {
                throw new ValidationException($"Počet volných míst na události je menší než požadovaný. Aktuálně zbývá {maxNumberOfReservations - numberOfReservations} míst.");
            }

            var query = new SqlBuilder(
                $"""
                UPDATE Registrations SET
                Email='{registration.Email}',
                Tel='{registration.Tel}',
                TicketsReserved='{registration.TicketsReserved}'
                WHERE Id='{registration.Id}'
                """).Build();
            var command = new SQLiteCommand(query.Sql, dbConnection);
            var param = new Object[] { registration.Email, registration.Tel, registration.TicketsReserved, registration.Id };
            for (var i = 0; i < query.SqlParameters.Count; i++)
            {
                command.Parameters.Add(new SQLiteParameter($"p{i}", param[i]));
            }
            command.ExecuteNonQuery();
            transaction.Complete();
            dbConnection.Close();
            return true;
        }

        public async Task<bool> Delete(string id)
        {
            using SQLiteConnection dbConnection = new(connString);
            dbConnection.Open();
            using TransactionScope transaction = new TransactionScope();
            var query = new SqlBuilder($"DELETE FROM Registrations WHERE Id = {id}").Build();
            var command = new SQLiteCommand(query.Sql, dbConnection);
            for(var i = 0; i < query.SqlParameters.Count; i++)
            {
                command.Parameters.Add(new SQLiteParameter($"p{i}", id));
            }
            command.ExecuteNonQuery();
            transaction.Complete();
            dbConnection.Close();
            return true;
        }

        public async Task<int> GetNumberOfReservedSeats(string countExceptId)
        {
            using SQLiteConnection dbConnection = new(connString);
            dbConnection.Open();
            int result = await GetNumberOfReservedSeats(countExceptId, dbConnection);
            dbConnection.Close();
            return result;
        }

        private async Task<int> GetNumberOfReservedSeats(string? countExceptId, SQLiteConnection dbConnection)
        {
            int? result = null;
            var query = new SqlBuilder($"SELECT SUM(TicketsReserved) TicketsSum from Registrations where Id != '{countExceptId}'").Build();
            var command = new SQLiteCommand(query.Sql, dbConnection);
            for (var i = 0; i < query.SqlParameters.Count; i++)
            {
                command.Parameters.Add(new SQLiteParameter($"p{i}", countExceptId));
            }
            SQLiteDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                //load data
                result = int.Parse(reader["TicketsSum"].ToString());
            }
            return result ?? 0;
        }

        //public async Task CreateDatabase()
        //{
        //    //create db file
        //    SQLiteConnection.CreateFile("SqliteDatabase.sqlite");

        //    //connect
        //    using (SQLiteConnection dbConnection = new SQLiteConnection(connString))
        //    {
        //        dbConnection.Open();

        //        //create table
        //        string query = $"""
        //            CREATE TABLE Registrations (
        //            Id TEXT(6) NOT NULL,
        //            Email TEXT,
        //            Tel TEXT,
        //            TicketsReserved INTEGER,
        //            CONSTRAINT Registration_PK PRIMARY KEY (Id))
        //        """;

        //        SQLiteCommand command = new SQLiteCommand(query, dbConnection);
        //        command.ExecuteNonQuery();
        //        dbConnection.Close();
        //    }
        //}

        //public async Task AddTestData()
        //{
        //    using SQLiteConnection dbConnection = new SQLiteConnection(connString);
        //    dbConnection.Open();

        //    //insert data
        //    string query = "INSERT INTO Registrations (Id,Email,Tel,TicketsReserved) VALUES ";
        //    query += "(\"BRL807\", \"someEmail@gmail.com\",\"459 318 864\", 2),";
        //    query += "(\"0DD23V\", \"myEmail@centrum.com\",\"492 447 261\", 4),";
        //    var command = new SQLiteCommand(query, dbConnection);
        //    command.ExecuteNonQuery();
        //    dbConnection.Close();
        //}
    }
}
