using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public enum Status
    {
        Current,
        Selling
    }
    public class RealEstates : BaseEntity
    {
        public string Title { get; set; }
        public int NeighbourhoodID { get; set; }
        public int CitiesID { get; set; }
        public int DistrictID { get; set; }
        public double Price { get; set; }
        public int CategoryID { get; set; }
        public int UserID { get; set; }
        public int AreaBrüt { get; set; }
        public int AreaGross { get; set; }
        public int RoomCount { get; set; }
        public int SaloonCount { get; set; }
        public int BuildingAge { get; set; }
        public int FloorLocation { get; set; }
        public int FloorCount { get; set; }
        public string Heating { get; set; }
        public int BathroomsCount { get; set; }
        public bool Balcony { get; set; }
        public bool Furnished { get; set; }
        public string UsingStatus { get; set; } //Kullanım Durumu-Kiracı
        public bool InsideSite { get; set; }
        public string SiteName { get; set; }
        public string Description { get; set; }
        public bool West { get; set; }
        public bool East { get; set; }
        public bool South { get; set; }
        public bool North { get; set; }
        public string LocationIFrameLink { get; set; }
        public bool isDeleted { get; set; }
        public Status Status { get; set; }

    }
}
