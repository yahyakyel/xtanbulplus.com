using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Admin
{
    public class ImageDeleteRealEstate
    {
        //Hata Kodları:
        //0 => Dosya Bulunamadı Hatası
        //1 => Dosya Zaten Var Hatası
        //2 => Uzantı Hatası
        public static string DeleteSingleImage(string serverPath)
        {
            if (serverPath != "")
            {
                var filePath = HttpContext.Current.Server.MapPath(serverPath);
           
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                    return "1";
                }
                else
                {
                    return "0";
                }
            }
            else
            {
                return "0";
            }
        }
    }
}