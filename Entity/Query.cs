using ClassLibrary1.Models;
using Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Entity
{
    public class Query
    {
        private static XContext db = new XContext();
        public static object AllUsers()
        {

            var List = new
            {
                data = from Teams in db.Teams.Where(q => q.UserType == UserType.User)
                       select new
                       {
                           ID = Teams.ID,
                           FirstName = Teams.FirstName,
                           LastName = Teams.LastName,
                           Phone = Teams.PhoneNumber,
                           Title = Teams.Title,
                           Image = Teams.Image ?? "/assets/media/default.jpg",
                           Email = Teams.Email,
                           Password = Teams.Password
                       }
            };
            return List;
        }

        public static List<HomeEstate> GetAllRealEstate()
        {
            XContext dbC = new XContext();


            List<RealEstates> realEstates = dbC.RealEstates.Where(q=>q.isDeleted!=true).AsNoTracking().Take(6).ToList();
            List<HomeEstate> homeEstates = new List<HomeEstate>(); ;

            foreach (var item in realEstates)
            {
                HomeEstate estate = new HomeEstate();
                int count = dbC.Photos.Where(q => q.RealEstateId == item.ID).Count();
                estate.ID = item.ID;
                estate.Title = item.Title;
                estate.AreaBrüt = item.AreaBrüt;
                estate.Price = item.Price;
                estate.FloorLocation = item.FloorLocation;
                estate.FloorCount = item.FloorCount;
                if (count > 0)
                    estate.Image = dbC.Photos.Where(q => q.RealEstateId == item.ID).First().Name;
                else
                    estate.Image = "default.jpg";
                estate.RoomCount = item.RoomCount;
                estate.SaloonCount = item.SaloonCount;
                estate.Status = item.Status;

                int nID = item.NeighbourhoodID;
                int dKEY = item.DistrictID;
                int cKEY = item.CitiesID;
                estate.LocationD = dbC.Districts.Where(q => q.DistrictKey == dKEY).FirstOrDefault().DistrictName;
                estate.LocationC = dbC.Cities.Where(s => s.CityKey == cKEY).FirstOrDefault().CityName;
                homeEstates.Add(estate);
            }

            return homeEstates;
        }
        public static List<ClassLibrary1.Models.Teams> GetAllTeamMember()
        {
            XContext dbC = new XContext();

            List<Teams> AllTeams = dbC.Teams.Where(q => q.UserType == UserType.User || q.UserType == UserType.Admin).AsNoTracking().Take(6).ToList();
            List<ClassLibrary1.Models.Teams> teams = new List<ClassLibrary1.Models.Teams>(); ;

            foreach (var item in AllTeams)
            {
                ClassLibrary1.Models.Teams teams1 = new ClassLibrary1.Models.Teams();
                teams1.Title = item.Title;
                teams1.PhoneNumber = item.PhoneNumber;
                teams1.FirstName = item.FirstName;
                teams1.LastName = item.LastName;
                teams1.Email = item.Email;
                teams1.Image = item.Image;
                teams.Add(teams1);
            }
            return teams;
        }

        public static object CitiesForAnnouncement()
        {
            var list = new
            {
                data = from City in db.Cities.OrderBy(q => q.CityName)
                       select new
                       {
                           ID = City.ID,
                           CityName = City.CityName,
                           CityKey = City.CityKey
                       }
            };

            return list;

        }
        public static object DistrictForCities(int CityKey)
        {
            var list = new
            {
                data = from District in db.Districts.Where(q => q.DistrictCityKey == CityKey).OrderBy(q => q.DistrictName)
                       select new
                       {
                           ID = District.ID,
                           DistrictName = District.DistrictName,
                           DistrictKey = District.DistrictKey

                       }
            };

            return list;

        }
        public static object NeighbourhoodsForDistrict(int DistrictKey)
        {
            var list = new
            {
                data = from Neighbourhood in db.Neighbourhoods.Where(q => q.NeighbourhoodDistrictKey == DistrictKey).OrderBy(q => q.NeighbourhoodName)
                       select new
                       {
                           ID = Neighbourhood.ID,
                           NeighbourhoodName = Neighbourhood.NeighbourhoodName,
                           NeighbourhoodKey = Neighbourhood.NeighbourhoodKey
                       }
            };

            return list;
        }
        public static object GetRealEstateList(int neighborhoodsCode)
        {
            XContext dbC = new XContext();
            string defaultImage = "/Assets/images/default.jpg";
            List<EstateListModel> artists = new List<EstateListModel>();

            if (neighborhoodsCode == 0)
            {
                var list = new
                {
                    data = from RealEstates in dbC.RealEstates.Where(q=>q.isDeleted!=true).Distinct().ToList()
                           select new
                           {
                               ID = RealEstates.ID,
                               Title = RealEstates.Title,
                               Image = dbC.Photos.Where(q => q.RealEstateId == RealEstates.ID).First().Name,
                               Location = dbC.Districts.Where(m => m.DistrictKey == dbC.Neighbourhoods.Where(q => q.NeighbourhoodKey == RealEstates.NeighbourhoodID).FirstOrDefault().NeighbourhoodDistrictKey).FirstOrDefault().DistrictName + "/" + dbC.Cities.Where(z => z.CityKey == dbC.Districts.Where(m => m.DistrictKey == dbC.Neighbourhoods.Where(q => q.NeighbourhoodKey == RealEstates.NeighbourhoodID).FirstOrDefault().NeighbourhoodDistrictKey).FirstOrDefault().DistrictCityKey).FirstOrDefault().CityName,
                               Price = RealEstates.Price.ToString("000,000") + " ₺",
                               FloorLocation = RealEstates.FloorLocation + ".KAT",
                               FloorCount = RealEstates.FloorCount,
                               EstateRoom = RealEstates.RoomCount + "+" + RealEstates.SaloonCount,
                               AreaBrüt = RealEstates.AreaBrüt

                           }
                };
                foreach (var item in list.data)
                {
                    EstateListModel newArtist = new EstateListModel();
                    newArtist.ID = item.ID;
                    newArtist.Title = item.Title;
                    newArtist.Location = item.Location;
                    newArtist.Price = item.Price;
                    newArtist.FloorLocation = item.FloorLocation;
                    newArtist.FloorCount = item.FloorCount;
                    newArtist.EstateRoom = item.EstateRoom;
                    newArtist.AreaBrüt = item.AreaBrüt;
                    bool a = File.Exists("https://www.xtanbulplus.com/" + item.Image);
                    HttpWebResponse response = null;
                    var request = (HttpWebRequest)WebRequest.Create("https://www.xtanbulplus.com/" + item.Image);
                    request.Method = "HEAD";
                    try
                    {
                        response = (HttpWebResponse)request.GetResponse();
                        newArtist.Image = item.Image;
                    }
                    catch (WebException ex)
                    {
                        newArtist.Image = defaultImage;
                    }
                    finally
                    {
                        if (response != null)
                        {
                            response.Close();
                        }
                    }

                    artists.Add(newArtist);
                }
            }
            else
            {
                var list = new
                {
                    data = from RealEstates in dbC.RealEstates.Where(q => q.NeighbourhoodID == neighborhoodsCode).Distinct().ToList()
                           select new
                           {
                               ID = RealEstates.ID,
                               Title = RealEstates.Title,
                               Image = dbC.Photos.Where(q => q.RealEstateId == RealEstates.ID).First().Name,
                               Location = dbC.Districts.Where(m => m.DistrictKey == dbC.Neighbourhoods.Where(q => q.NeighbourhoodKey == RealEstates.NeighbourhoodID).FirstOrDefault().NeighbourhoodDistrictKey).FirstOrDefault().DistrictName + "/" + dbC.Cities.Where(z => z.CityKey == dbC.Districts.Where(m => m.DistrictKey == dbC.Neighbourhoods.Where(q => q.NeighbourhoodKey == RealEstates.NeighbourhoodID).FirstOrDefault().NeighbourhoodDistrictKey).FirstOrDefault().DistrictCityKey).FirstOrDefault().CityName,
                               Price = RealEstates.Price.ToString("000,000") + " ₺",
                               FloorLocation = RealEstates.FloorLocation + ".KAT",
                               FloorCount = RealEstates.FloorCount,
                               EstateRoom = RealEstates.RoomCount + "+" + RealEstates.SaloonCount,
                               AreaBrüt = RealEstates.AreaBrüt
                           }
                };
                foreach (var item in list.data)
                {
                    EstateListModel newArtist = new EstateListModel();
                    newArtist.ID = item.ID;
                    newArtist.Title = item.Title;
                    newArtist.Location = item.Location;
                    newArtist.Price = item.Price;
                    newArtist.FloorLocation = item.FloorLocation;
                    newArtist.FloorCount = item.FloorCount;
                    newArtist.EstateRoom = item.EstateRoom;
                    newArtist.AreaBrüt = item.AreaBrüt;
                    bool a = File.Exists("https://www.xtanbulplus.com/" + item.Image);
                    HttpWebResponse response = null;
                    var request = (HttpWebRequest)WebRequest.Create("https://www.xtanbulplus.com/" + item.Image);
                    request.Method = "HEAD";
                    try
                    {
                        response = (HttpWebResponse)request.GetResponse();
                        newArtist.Image = item.Image;
                    }
                    catch (WebException ex)
                    {
                        newArtist.Image = defaultImage;
                    }
                    finally
                    {
                        if (response != null)
                        {
                            response.Close();
                        }
                    }

                    artists.Add(newArtist);
                }
            }

            var list2 = new
            {
                data = from RealEstates in artists.Distinct().ToList()
                       select new
                       {
                           ID = RealEstates.ID,
                           Title = RealEstates.Title,
                           Image = RealEstates.Image,
                           Location = RealEstates.Location,
                           Price = RealEstates.Price,
                           FloorLocation = RealEstates.FloorLocation,
                           FloorCount = RealEstates.FloorCount,
                           EstateRoom = RealEstates.EstateRoom,
                           AreaBrüt = RealEstates.AreaBrüt,
                           EstateURL = "/Home/RealEstateDetails?Id=" + RealEstates.ID
                       }
            };
            return list2;
        }
        public static object GetRealEstateDetails(int EstateID)
        {
            XContext dbC = new XContext();
            var list2 = new
            {
                data = from RealEstates in dbC.Photos.Where(q => q.RealEstateId == EstateID).ToList()
                       select new
                       {
                           ID = RealEstates.ID,
                           Image = RealEstates.Name,

                       },
                TeamMember = from RealEstate in db.RealEstates.Where(q => q.ID == EstateID)
                             join Teams in db.Teams
                             on RealEstate.UserID equals Teams.ID
                             select new
                             {
                                 ID = Teams.ID,
                                 FirstName = Teams.FirstName,
                                 LastName = Teams.LastName,
                                 PhoneNumber = Teams.PhoneNumber,
                                 Image = Teams.Image,
                             },
                CitiesID = from RealEstate in db.RealEstates.Where(q => q.ID == EstateID)
                           join City in db.Cities
                           on RealEstate.CitiesID equals City.CityKey
                           select new
                           {
                               CityID = City.ID,
                               CityKey = City.CityKey,
                               CityName = City.CityName
                           },
                NeighbourhoodID = from RealEstate in db.RealEstates.Where(q => q.ID == EstateID)
                                  join Neighbourhood in db.Neighbourhoods
                                  on RealEstate.NeighbourhoodID equals Neighbourhood.NeighbourhoodKey
                                  select new
                                  {
                                      NeighbourhoodID = Neighbourhood.ID,
                                      NeighbourhoodName = Neighbourhood.NeighbourhoodName,
                                      NeighbourhoodKey = Neighbourhood.NeighbourhoodKey,


                                  },
                DistrictID = from RealEstate in db.RealEstates.Where(q => q.ID == EstateID)
                             join District in db.Districts
                             on RealEstate.DistrictID equals District.DistrictKey
                             select new
                             {
                                 DistrictID = District.ID,
                                 DistrictKey = District.DistrictKey,
                                 DistrictName = District.DistrictName,
                             },
            };
            return list2;
        }
        public static object CheckAnnouncement(int id)
        {
            var list = new
            {
                data = from RealEstates in db.RealEstates.Where(q => q.ID == id && q.isDeleted != true).Distinct()
                       select new
                       {
                           ID = RealEstates.ID,
                           AreaBrüt = RealEstates.AreaBrüt,
                           AreaGross = RealEstates.AreaGross,
                           Balcony = RealEstates.Balcony,
                           BathroomsCount = RealEstates.BathroomsCount,
                           BuildingAge = RealEstates.BuildingAge,
                           CategoryID = RealEstates.CategoryID,
                           Description = RealEstates.Description,
                           East = RealEstates.East,
                           West = RealEstates.West,
                           North = RealEstates.North,
                           South = RealEstates.South,
                           FloorCount = RealEstates.FloorCount,
                           FloorLocation = RealEstates.FloorLocation,
                           Furnished = RealEstates.Furnished,
                           Heating = RealEstates.Heating,
                           InsideSite = RealEstates.InsideSite,
                           LocationIFrameLink = RealEstates.LocationIFrameLink,
                           Price = RealEstates.Price,
                           RoomCount = RealEstates.RoomCount,
                           SaloonCount = RealEstates.SaloonCount,
                           SiteName = RealEstates.SiteName,
                           Title = RealEstates.Title,
                           UsingStatus = RealEstates.UsingStatus,
                           Status= RealEstates.Status,
                           Image = from Photos in db.Photos.Where(q => q.RealEstateId == RealEstates.ID)
                                   select new
                                   {
                                       Data1 = Photos.Name
                                   },
                           NeighbourhoodID = from Neighbourhood in db.Neighbourhoods.Where(q => q.NeighbourhoodKey == RealEstates.NeighbourhoodID)
                                             select new
                                             {
                                                 NeighbourhoodID = Neighbourhood.ID,
                                                 NeighbourhoodName = Neighbourhood.NeighbourhoodName,
                                                 NeighbourhoodKey = Neighbourhood.NeighbourhoodKey,


                                             },
                           CitiesID = from City in db.Cities.Where(q => q.CityKey == RealEstates.CitiesID)
                                      select new
                                      {
                                          CityID = City.ID,
                                          CityKey = City.CityKey,
                                          CityName = City.CityName
                                      },
                           DistrictID = from District in db.Districts.Where(q => q.DistrictKey == RealEstates.DistrictID)
                                        select new
                                        {
                                            DistrictID = District.ID,
                                            DistrictKey = District.DistrictKey,
                                            DistrictName = District.DistrictName,
                                        },
                       },

            };
            return list;

        }
    }
}