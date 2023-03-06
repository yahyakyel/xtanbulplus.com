using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary1.Models
{
    public class EstateListModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Price { get; set; }
        public int AreaBrüt { get; set; }
        public string EstateRoom { get; set; }
        public string FloorLocation { get; set; }
        public int FloorCount { get; set; }
        public string Image { get; set; }
        public string Location { get; set; }
        public Entity.Status Status { get; set; }
    }
}
