namespace WebAPI.Migrations.AccountManagement
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updte_User_SetNull_DateOfBirth : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.User", "DateOfBirth", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.User", "DateOfBirth", c => c.DateTime(nullable: false));
        }
    }
}
