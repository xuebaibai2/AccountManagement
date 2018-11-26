namespace WebAPI.Migrations.AccountManagement
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updte_User_ColumnType_DateOfBirth : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.User", "DateOfBirth", c => c.DateTime(storeType: "date"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.User", "DateOfBirth", c => c.DateTime());
        }
    }
}
