using EGT;
using Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Windows.Forms;

namespace Admin.Controllers
{
    [SessionFilter]
    public class UsersController : Controller
    {
        XContext db = new XContext();

        // GET: Users
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetUsers()
        {
            object list = Query.AllUsers();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddUser(HttpPostedFileBase Image, string FirstName, string LastName, string Phone, string Title, string Email, string Password)
        {
            string Images = "/assets/media/default.jpg";
            if (Image != null)
            {
                Images = ImageUploader.UploadSingleImage("/assets/media/Teams/", Image);
            }
            Teams teams = new Teams()
            {
                FirstName = FirstName,
                LastName = LastName,
                PhoneNumber = Phone,
                Title = Title,
                Email = Email,
                Password = Password,
                Image = Images
            };
            db.Teams.Add(teams);
            db.SaveChanges();
            string result = "Kullanıcı Başarılı Şekilde Eklendi...";
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public JsonResult EditUser(int id)
        {
            var user = new
            {
                data = from Teams in db.Teams.Where(q => q.ID == id)

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
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateUser(HttpPostedFileBase Image, string FirstName, string LastName, string Phone, string Title, string Email, string Password, int ID)
        {
            string Images = "/assets/media/default.jpg";

            Teams teams = db.Teams.Find(ID);
            teams.Image = "TeamMember_" + teams.ID;
            teams.FirstName = FirstName;
            teams.LastName = LastName;
            teams.PhoneNumber = Phone;
            teams.Title = Title;
            teams.Email = Email;
            teams.Password = Password;
            if (teams.Image != null)
            {
                Images = ImageUploader.UploadSingleImage("/assets/media/Teams/", Image);
            }
            teams.Image= Images;
            db.SaveChanges();
            string result = "Kullanıcı Başarılı Şekilde Güncellendi...";
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteUser(int ID)
        {
            Teams teams = db.Teams.Find(ID);
            db.Teams.Remove(teams);
            db.SaveChanges();
            string result = "Kullanıcı Başarılı Şekilde Silindi...";
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}