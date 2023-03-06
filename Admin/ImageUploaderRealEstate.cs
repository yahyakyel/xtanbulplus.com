using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Admin
{
    public class ImageUploaderRealEstate
    {
        //Hata Kodları:
        //0 => Dosya Bulunamadı Hatası
        //1 => Dosya Zaten Var Hatası
        //2 => Uzantı Hatası
        public static string UploadSingleImage(string serverPath, HttpPostedFileBase file, int ID, int Count)
        {
            if (file != null)
            {
                serverPath = serverPath.Replace("~", string.Empty);
                string[] fileArr = file.FileName.Split('.');

                string extension = fileArr[fileArr.Length - 1];

                string fileName = "RealEstate_" + ID + "_" + Count + "." + extension;

                var filePath = HttpContext.Current.Server.MapPath(serverPath + fileName);

                string directory = Path.GetDirectoryName(filePath);
                if (Directory.Exists(directory))
                {
                    if (extension == "jpg" || extension == "JPG" || extension == "png" || extension == "PNG" || extension == "jpeg" || extension == "gif")
                    {
                        if (File.Exists(filePath))
                        {
                            return "1";
                        }
                        else
                        {
                            file.SaveAs(filePath);
                            return serverPath + fileName;
                        }
                    }
                    else
                    {
                        return "2";
                    }
                }
                else
                {
                    Directory.CreateDirectory(directory);
                    if (extension == "jpg" || extension == "JPG" || extension == "png" || extension == "PNG" || extension == "jpeg" || extension == "gif")
                    {
                        if (File.Exists(filePath))
                        {
                            return "1";
                        }
                        else
                        {
                            file.SaveAs(filePath);
                            return serverPath + fileName;
                        }
                    }
                    else
                    {
                        return "2";
                    }
                }
            }
            else
            {
                return "0";
            }
        }
    }
}