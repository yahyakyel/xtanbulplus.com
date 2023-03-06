using Admin.Models;
using EGT;
using Entity;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Services.Description;
using System.Xml.Linq;

namespace Admin.Controllers
{
    [SessionFilter]
    public class AnnouncementController : Controller
    {
        XContext db = new XContext();
        // GET: Announcement
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddAnnouncement()
        {
            return View();
        }
        public ActionResult UserAnnouncement()
        {
            return View();
        }
        public JsonResult DeleteAnnouncement(int ID)
        {
            RealEstates realEstates = db.RealEstates.Find(ID);

            Photo photo = db.Photos.Find(realEstates.ID);
            realEstates.isDeleted = true;
            db.SaveChanges();
            string result = "İlan Başarılı Şekilde Silindi...";
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CheckAnnouncementPage(int id)
        {
            RealEstates realEstates = db.RealEstates.Find(id);
            return View(realEstates);
        }
        public ActionResult EditAnnouncementPage(int id)
        {
            RealEstates realEstates2 = db.RealEstates.Find(id);
            return View(realEstates2);
        }
        public JsonResult CitiesForAnnouncement()
        {
            object citiesList = Query.CitiesForAnnouncement();
            return Json(citiesList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAnnouncement()
        {
            Teams currentUser = Session["currentUser"] as Teams;
            int TeamsID = currentUser.ID;


            var list = new
            {
                data = from RealEstates in db.RealEstates.Where(q => q.UserID == TeamsID && q.isDeleted != true).Distinct()
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
                           Status = RealEstates.Status,
                           Image = from Photos in db.Photos.Where(q => q.RealEstateId == RealEstates.ID).Take(1)
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
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUserAnnouncement()
        {
            Teams currentUser = Session["currentUser"] as Teams;
            int TeamsID = currentUser.ID;


            var list = new
            {
                data = from RealEstates in db.RealEstates.Where(q => q.UserID != TeamsID && q.isDeleted != true).Distinct()
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
                           Status = RealEstates.Status,
                           AnnouncementUser = from Teams in db.Teams.Where(q => q.ID == RealEstates.UserID)
                                              select new
                                              {
                                                  UserName = Teams.FirstName + " " + Teams.LastName,
                                                  UserTitle = Teams.Title,
                                              },
                           Image = from Photos in db.Photos.Where(q => q.RealEstateId == RealEstates.ID).Take(1)
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
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckAnnouncement(int id)
        {
            object CheckAnnouncement = Query.CheckAnnouncement(id);
            return Json(CheckAnnouncement, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditAnnouncement(int id)
        {
            RealEstates realEstates = db.RealEstates.Find(id);
            Neighbourhood neighbourhood = db.Neighbourhoods.Where(q => q.NeighbourhoodKey == realEstates.NeighbourhoodID).FirstOrDefault();
            District district = db.Districts.Where(q => q.DistrictKey == neighbourhood.NeighbourhoodDistrictKey).FirstOrDefault();
            City city = db.Cities.Where(q => q.CityKey == district.DistrictCityKey).FirstOrDefault();

            var list = new
            {
                data = from RealEstates in db.RealEstates.Where(q => q.ID == id && q.isDeleted != true)
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
                           Status = RealEstates.Status,
                           NeighbourhoodID = from Neighbourhood in db.Neighbourhoods.Where(q => q.NeighbourhoodKey == realEstates.NeighbourhoodID)
                                             select new
                                             {
                                                 NeighbourhoodID = Neighbourhood.ID,
                                                 NeighbourhoodName = Neighbourhood.NeighbourhoodName,
                                                 NeighbourhoodKey = Neighbourhood.NeighbourhoodKey,

                                             },
                           CitiesID = from City in db.Cities.Where(q => q.CityKey == realEstates.CitiesID)
                                      select new
                                      {
                                          CityID = City.ID,
                                          CityKey = City.CityKey,
                                          CityName = City.CityName
                                      },
                           DistrictID = from District in db.Districts.Where(q => q.DistrictKey == realEstates.DistrictID)
                                        select new
                                        {
                                            DistrictID = District.ID,
                                            DistrictKey = District.DistrictKey,
                                            DistrictName = District.DistrictName,
                                        },
                       },
                NotCitiesID = from City in db.Cities.Where(q => q.ID != city.ID)
                              select new
                              {
                                  CityID = City.ID,
                                  CityKey = City.CityKey,
                                  CityName = City.CityName
                              },
                NotDistrictID = from District in db.Districts.Where(q => q.ID != district.ID && q.DistrictCityKey == city.CityKey)
                                select new
                                {
                                    DistrictID = District.ID,
                                    DistrictKey = District.DistrictKey,
                                    DistrictName = District.DistrictName,
                                },
                NotNeighbourhoodID = from Neighbourhood in db.Neighbourhoods.Where(q => q.ID != neighbourhood.ID && q.NeighbourhoodDistrictKey == neighbourhood.NeighbourhoodDistrictKey)
                                     select new
                                     {
                                         NeighbourhoodID = Neighbourhood.ID,
                                         NeighbourhoodName = Neighbourhood.NeighbourhoodName,
                                         NeighbourhoodKey = Neighbourhood.NeighbourhoodKey,


                                     }

            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EditAnnouncementImage(int id)
        {
            RealEstates realEstates = db.RealEstates.Find(id);

            var list = new
            {
                data = from Photos in db.Photos.Where(q => q.RealEstateId == realEstates.ID && realEstates.isDeleted != true)
                       select new
                       {
                           Photos = Photos.Name
                       }
            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckAnnouncementImage(int id)
        {
            RealEstates realEstates = db.RealEstates.Find(id);

            var list = new
            {
                data = from Photos in db.Photos.Where(q => q.RealEstateId == realEstates.ID && realEstates.isDeleted != true)
                       select new
                       {
                           Photos = Photos.Name
                       }
            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CategoriesForAnnouncement()
        {
            int id = 0;
            var list = new
            {
                data = from Category in db.Categories.Where(q => q.MainCategory == id)
                       select new
                       {
                           CategoryID = Category.ID,
                           CategoryName = Category.Name,

                       }
            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SubCategoriesForAnnouncement(int CategoryID)
        {
            var list = new
            {
                data = from SubCategories in db.Categories.Where(q => q.MainCategory == CategoryID)
                       select new
                       {
                           SubCategoriesID = SubCategories.ID,
                           SubCategoriesName = SubCategories.Name,

                       }
            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DistrictForCities(int CityKey)
        {
            object districtList = Query.DistrictForCities(CityKey);
            return Json(districtList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NeighbourhoodsForDistrict(int DistrictKey)
        {
            object neighbourhoodList = Query.NeighbourhoodsForDistrict(DistrictKey);
            return Json(neighbourhoodList, JsonRequestBehavior.AllowGet);
        }
        [ValidateInput(false)]
        public JsonResult SaveAnnouncement(RealEstatesModel realEstatesModel)
        {
            Teams currentUser = Session["currentUser"] as Teams;
            int TeamsID = currentUser.ID;
            RealEstates realEstates = new RealEstates()
            {
                UserID = TeamsID,
                AreaBrüt = realEstatesModel.AreaBrüt,
                AreaGross = realEstatesModel.AreaGross,
                Balcony = realEstatesModel.Balcony,
                BathroomsCount = realEstatesModel.BathroomsCount,
                BuildingAge = realEstatesModel.BuildingAge,
                CategoryID = realEstatesModel.CategoryID,
                Description = realEstatesModel.Description[0],
                East = realEstatesModel.East,
                West = realEstatesModel.West,
                North = realEstatesModel.North,
                South = realEstatesModel.South,
                FloorCount = realEstatesModel.FloorCount,
                FloorLocation = realEstatesModel.FloorLocation,
                Furnished = realEstatesModel.Furnished,
                Heating = realEstatesModel.Heating,
                InsideSite = realEstatesModel.InsideSite,
                LocationIFrameLink = realEstatesModel.LocationIFrameLink,
                NeighbourhoodID = realEstatesModel.NeighbourhoodID,
                CitiesID = realEstatesModel.CitiesID,
                DistrictID = realEstatesModel.DistrictID,
                Price = realEstatesModel.Price,
                RoomCount = realEstatesModel.RoomCount,
                SaloonCount = realEstatesModel.SaloonCount,
                SiteName = realEstatesModel.SiteName,
                Title = realEstatesModel.Title,
                UsingStatus = realEstatesModel.UsingStatus,

            };
            db.RealEstates.Add(realEstates);
            db.SaveChanges();


            int result = realEstates.ID;
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ImageUploaderForRealEstate(HttpPostedFileBase[] MultiImage, int RealEstateID, string[] imgArrayForRealEstateArr)
        {
            RealEstates realEstates = db.RealEstates.Find(RealEstateID);

            string Images = "/assets/media/logos/default.png";
            int count = 1;
            List<Photo> photos = db.Photos.Where(q => q.RealEstateId == RealEstateID).ToList();
            if (photos.Count > 0)
            {
                foreach (var item in imgArrayForRealEstateArr)
                {
                    Photo photo = db.Photos.Where(q => q.Name == item).FirstOrDefault();
                    photos.Remove(photo);
                }

                foreach (var item in photos)
                {
                    if (ImageDeleteRealEstate.DeleteSingleImage(item.Name) == "1")
                    {
                        Photo photo = db.Photos.Where(q => q.Name == item.Name).FirstOrDefault();
                        db.Photos.Remove(photo);
                        db.SaveChanges();
                    }
                }
            }

            if (db.Photos.Where(q => q.RealEstateId == realEstates.ID).Count() > 0)
            {
                string last = db.Photos.Where(q => q.RealEstateId == realEstates.ID).OrderByDescending(q => q.Name).FirstOrDefault().Name;
                last = last.Replace("~", string.Empty);
                string[] fileArr = last.Split('.');

                string extension = fileArr[fileArr.Length - 2];
                string[] fileArr2 = extension.Split('_');
                count = Convert.ToInt32(fileArr2[fileArr2.Length - 1]) + 1;
            }

            if (MultiImage != null)
            {
                foreach (var item in MultiImage)
                {
                    if (item != null)
                    {
                        Photo photo = new Photo()
                        {
                            Name = ImageUploaderRealEstate.UploadSingleImage("/assets/images/Photo/RealEstate_" + RealEstateID + "/", item, RealEstateID, count),
                            RealEstateId = RealEstateID
                        };
                        db.Photos.Add(photo);
                        db.SaveChanges();
                    }
                    count++;
                }
            }
           

            db.SaveChanges();
            string result = "İlan Başarılı Şekilde Eklendi...";
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [ValidateInput(false)]
        public JsonResult UpdateAnnouncement(RealEstatesModel realEstatesModel, int Id)
        {
            Teams currentUser = Session["currentUser"] as Teams;
            int TeamsID = currentUser.ID;
            RealEstates realEstates = db.RealEstates.Find(Id);
            realEstates.AreaBrüt = realEstatesModel.AreaBrüt;
            realEstates.AreaGross = realEstatesModel.AreaGross;
            realEstates.Balcony = realEstatesModel.Balcony;
            realEstates.BathroomsCount = realEstatesModel.BathroomsCount;
            realEstates.BuildingAge = realEstatesModel.BuildingAge;
            realEstates.CategoryID = realEstatesModel.CategoryID;
            realEstates.Description = realEstatesModel.Description[0];
            realEstates.East = realEstatesModel.East;
            realEstates.West = realEstatesModel.West;
            realEstates.North = realEstatesModel.North;
            realEstates.South = realEstatesModel.South;
            realEstates.FloorCount = realEstatesModel.FloorCount;
            realEstates.FloorLocation = realEstatesModel.FloorLocation;
            realEstates.Furnished = realEstatesModel.Furnished;
            realEstates.Heating = realEstatesModel.Heating;
            realEstates.InsideSite = realEstatesModel.InsideSite;
            realEstates.LocationIFrameLink = realEstatesModel.LocationIFrameLink;
            realEstates.NeighbourhoodID = realEstatesModel.NeighbourhoodID;
            realEstates.CitiesID = realEstatesModel.CitiesID;
            realEstates.DistrictID = realEstatesModel.DistrictID;
            realEstates.Price = realEstatesModel.Price;
            realEstates.RoomCount = realEstatesModel.RoomCount;
            realEstates.SaloonCount = realEstatesModel.SaloonCount;
            realEstates.SiteName = realEstatesModel.SiteName;
            realEstates.Title = realEstatesModel.Title;
            realEstates.UsingStatus = realEstatesModel.UsingStatus;

            db.SaveChanges();
            int result = Id;
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateStatusForAnnouncement(int UsersRequestID, int AnnouncementStatus)
        {
            string result = "";
            try
            {
                RealEstates realEstates = db.RealEstates.Where(q => q.ID == UsersRequestID).FirstOrDefault();


                if (AnnouncementStatus == 0)
                {
                    realEstates.Status = Status.Current;
                    db.SaveChanges();
                    result = "İlan Satılıyor Olarak Kaydedildi...";
                }
                else
                {
                    realEstates.Status = Status.Selling;
                    db.SaveChanges();
                    result = "İlan Satıldı Olarak Kaydedildi...";
                }
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}