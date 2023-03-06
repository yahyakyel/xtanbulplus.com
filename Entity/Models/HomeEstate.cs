using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary1.Models
{
    public class HomeEstate
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public int AreaBrüt { get; set; }
        public int RoomCount { get; set; }
        public int SaloonCount { get; set; }
        public int FloorLocation { get; set; }
        public int FloorCount { get; set; }
        public string Image { get; set; }
        public string LocationD { get; set; }
        public string LocationC { get; set; }
        public Entity.Status Status { get; set; }
    }
}
