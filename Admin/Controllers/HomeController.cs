using EGT;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Admin.Controllers
{
    [SessionFilter]
    public class HomeController : Controller
    {
        XContext db = new XContext();

        public ActionResult Index()
        {
            return View();
        }  
        public JsonResult TableControl()
        {
            Teams currentUser = Session["currentUser"] as Teams;
            int TeamsID = currentUser.ID;
            var list = new
            {
                data = db.RealEstates.Where(q=>q.isDeleted!=true).Count(),//Genel İlan Sayısı
                data2 = db.RealEstates.Where(q => q.UserID==TeamsID &&  q.isDeleted != true).Count(),//Sahip olunan İlan Sayısı
                data3 = db.Teams.Where(q => q.UserType==0).Count(),//Danışman Sayısı         
            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}