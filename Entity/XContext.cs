using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class XContext : DbContext
    {
        public XContext() : base("dbXTANBUL")
        {
            Database.Connection.ConnectionString = @"server=(localdb)\mssqllocaldb; database=dbXTANBUL;Integrated Security=true";
        }
        public DbSet<Teams> Teams { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Neighbourhood> Neighbourhoods { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<RealEstates> RealEstates { get; set; }
        public DbSet<MailUsers> MailUsers{ get; set; }
    }
}