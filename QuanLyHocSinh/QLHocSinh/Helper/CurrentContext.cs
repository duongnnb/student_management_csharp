using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLHocSinh.Helper
{
    public class CurrentContext
    {
        public static bool IsLogged()
        {
            var flag = HttpContext.Current.Session["isLogin"];
            if (flag == null || (int)flag == 0)
            {
                if (HttpContext.Current.Request.Cookies["userID"] != null)
                {
                    string userIdCookie = Convert.ToString(HttpContext.Current.Request.Cookies["userID"].Value);
                    using (var ctx = new QLHSEntities())
                    {
                        var user = ctx.Users.Where(u => u.username == userIdCookie).FirstOrDefault();

                        HttpContext.Current.Session["isLogin"] = 1;
                        HttpContext.Current.Session["user"] = user;

                    }
                    return true;
                }
                return false;
            }
            return true;
        }

        public static User GetCurUser()
        {
            string id = ((User)HttpContext.Current.Session["user"]).username;
            using (var ctx = new QLHSEntities())
            {
                var user = ctx.Users.Where(u => u.username == id).FirstOrDefault();
                HttpContext.Current.Session["user"] = null;
                if (user != null)
                {
                    HttpContext.Current.Session["user"] = user;
                }
            }
            return (User)HttpContext.Current.Session["user"];
        }
        public static void Destroy()
        {
            HttpContext.Current.Session["isLogin"] = 0;
            HttpContext.Current.Session["user"] = null;
            HttpContext.Current.Session["tree"] = null;
            //HttpContext.Current.Response.Cookies["userID"].Expires = DateTime.Now.AddDays(-1);
        }
    }
}