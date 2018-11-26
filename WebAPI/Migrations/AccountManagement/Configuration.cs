namespace WebAPI.Migrations.AccountManagement
{
    using Models.database;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WebAPI.DataAccess.AccountContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"Migrations\AccountManagement";
        }

        protected override void Seed(WebAPI.DataAccess.AccountContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            var dummyUsers = new User[]
            {
                new User()
                {
                    Username = "Dummy Account 1",
                    Firstname = "Tom",
                    Lastname = "Jerry",
                    Password = "987654321",
                    DateOfBirth = new DateTime(2000, 1, 1),
                    Email = "tom@dummy.com",
                    Phone = "123456789",
                    Mobile = "987654321"
                },
                 new User()
                {
                    Username = "Dummy Account 2",
                    Firstname = "James",
                    Lastname = "Doe",
                    Password = "987654321",
                    DateOfBirth = new DateTime(2001, 1, 1),
                    Email = "james@dummy.com",
                    Phone = "888555222",
                    Mobile = "159753468"
                }
            };
            context.Users.AddOrUpdate(dummyUsers);
        }
    }
}
