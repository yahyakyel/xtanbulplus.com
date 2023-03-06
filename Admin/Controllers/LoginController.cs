using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Admin.Controllers
{
    public class LoginController : Controller
    {
        XContext db = new XContext();

        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Logout()
        {
            Session["currentUser"] = null;
            Session.Abandon();
            return RedirectToAction("Index", "Login");
        }
        public JsonResult CheckLogin(Teams teams)
        {
            Teams currentUser = new Teams();
            currentUser = db.Teams.Where(x => x.Email == teams.Email && x.Password == teams.Password).SingleOrDefault();
            var jsonModel = new { FirstName = "", LastName = "", Control = "" };
            if (currentUser != null)
            {
                jsonModel = new
                {
                    FirstName = currentUser.FirstName,
                    LastName = currentUser.LastName,
                    Control = currentUser.UserType.ToString()
                };
                Session["currentUser"] = currentUser;
                FormsAuthentication.SetAuthCookie(currentUser.Email, false);
            }
            return Json(jsonModel, JsonRequestBehavior.AllowGet);

        }
    }
}