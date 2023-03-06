namespace ClassLibrary1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialize : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        MainCategory = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CityLine = c.Int(nullable: false),
                        CityName = c.String(),
                        CityKey = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Districts",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        DistrictLine = c.Int(nullable: false),
                        DistrictName = c.String(),
                        DistrictKey = c.Int(nullable: false),
                        DistrictCityKey = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.MailUsers",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        Subject = c.String(),
                        CreatedTime = c.DateTime(nullable: false),
                        Message = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Neighbourhoods",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        NeighbourhoodLine = c.Int(nullable: false),
                        NeighbourhoodName = c.String(),
                        NeighbourhoodKey = c.Int(nullable: false),
                        NeighbourhoodDistrictKey = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Photos",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        RealEstateId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.RealEstates",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        NeighbourhoodID = c.Int(nullable: false),
                        CitiesID = c.Int(nullable: false),
                        DistrictID = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        CategoryID = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        AreaBrüt = c.Int(nullable: false),
                        AreaGross = c.Int(nullable: false),
                        RoomCount = c.Int(nullable: false),
                        SaloonCount = c.Int(nullable: false),
                        BuildingAge = c.Int(nullable: false),
                        FloorLocation = c.Int(nullable: false),
                        FloorCount = c.Int(nullable: false),
                        Heating = c.String(),
                        BathroomsCount = c.Int(nullable: false),
                        Balcony = c.Boolean(nullable: false),
                        Furnished = c.Boolean(nullable: false),
                        UsingStatus = c.String(),
                        InsideSite = c.Boolean(nullable: false),
                        SiteName = c.String(),
                        Description = c.String(),
                        West = c.Boolean(nullable: false),
                        East = c.Boolean(nullable: false),
                        South = c.Boolean(nullable: false),
                        North = c.Boolean(nullable: false),
                        LocationIFrameLink = c.String(),
                        isDeleted = c.Boolean(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Teams",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        PhoneNumber = c.String(),
                        Title = c.String(),
                        Image = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        UserType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Teams");
            DropTable("dbo.RealEstates");
            DropTable("dbo.Photos");
            DropTable("dbo.Neighbourhoods");
            DropTable("dbo.MailUsers");
            DropTable("dbo.Districts");
            DropTable("dbo.Cities");
            DropTable("dbo.Categories");
        }
    }
}
