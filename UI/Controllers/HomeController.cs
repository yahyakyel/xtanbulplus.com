using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Teams()
        {
            return View();
        }
        public ActionResult RealEstates()
        {
            return View();
        }
        public ActionResult RealEstateDetails(int Id)
        {
            XContext dbC = new XContext();
            RealEstates realEstates = dbC.RealEstates.Find(Id);
            return View(realEstates);
        }
        public JsonResult GetAllRealEstate()
        {
            object List = Query.GetAllRealEstate();
            return Json(List, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRealEstateList(int neighborhoodsCode)
        {
            object List = Query.GetRealEstateList(neighborhoodsCode);
            return Json(List, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRealEstateDetails(int EstateID)
        {
            object List = Query.GetRealEstateDetails(EstateID);
            return Json(List, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DistrictForCities(int citiesCode)
        {
            object List = Query.DistrictForCities(citiesCode);
            return Json(List, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NeighbourhoodsForDistrict(int DistrictKey)
        {
            object List = Query.NeighbourhoodsForDistrict(DistrictKey);
            return Json(List, JsonRequestBehavior.AllowGet);
        }
    }
}