using QLHocSinh.Helper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLHocSinh.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Account/
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Register()
        {
            if (CurrentContext.IsLogged() == true)
            {
                return RedirectToAction("Index", "Home");
            }
            ViewBag.Message = "";
            ViewBag.Register = 1;
            return View();
        }
        public ActionResult Login()
        {
            if (CurrentContext.IsLogged() == true)
            {
                return RedirectToAction("Index", "Home");
            }

            ViewBag.Login = 1;
            return View();
        }

        [CheckLogin]
        public ActionResult Profile()
        {
            return View();
        }

        [CheckLogin]
        public ActionResult ChangePassword()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Register(string fname, string fusername, string fpassword, string fcpassword, string femail)
        {
            using (QLHSEntities dt = new QLHSEntities())
            {
                var u = dt.Users.Where(p => p.email == femail).FirstOrDefault();
                if (u != null)
                {
                    ViewBag.Message = "Email đã tồn tại trong hệ thống";
                    ViewBag.Register = 2;
                    return View();
                }

                User us = new User();
                
                us.FullName = fname;
                us.email = femail;
                us.username = fusername;
                us.password = StringUtils.MD5(fpassword); 
                dt.Users.Add(us);
                dt.SaveChanges();

                ViewBag.Message = "Tạo tài khoản mới thành công";
                ViewBag.Register = 3;
                return View();
            }

        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            //string path = @"Data Source=.\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";
            //var con = new SqlConnection(path);
            //var cmd = new SqlCommand("checklogin", con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.Add(new SqlParameter("@fusername", username));
            //cmd.Parameters.Add(new SqlParameter("@fpassword", password));
            //SqlDataAdapter da = new SqlDataAdapter();
            //da.SelectCommand = cmd;
            //DataTable dt = new DataTable();
            //da.Fill(dt);
            //con.Close();
            using (QLHSEntities dt = new QLHSEntities())
            {
                string EncryptPassword = StringUtils.MD5(password);
                User us = dt.Users
                        .Where(p => p.username == username && p.password == EncryptPassword)
                        .FirstOrDefault();

                if (us != null)
                {
                    Session["isLogin"] = 1;
                    Session["user"] = us;
                    Session["IdUser"] = us.id;
                    Session["username"] = us.username;
                    Session["role"] = us.Role;
                    return RedirectToAction("Index", "Home");
                }
            }

            ViewBag.Login = 2;
            return View();
        }
        public ActionResult Logout()
        {
            CurrentContext.Destroy();
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public ActionResult UpdateProfile(User user)
        {
            var result = new ArrayList();
            try
            {
                var a = CurrentContext.GetCurUser();
                var ctx = new QLHSEntities();
                var u = ctx.Users.Where(p => p.username == a.username).FirstOrDefault();
                u.FullName = user.FullName;
                u.address = user.address;
                u.birthday = user.birthday;
                u.gender = user.gender;
                u.phonenumber = user.phonenumber;
                u.email = user.email;
                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                result.Add(
                    new
                    {
                        value = -1,
                        message = "lỗi"
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult GetProfile()
        {
            var result = new ArrayList();
            try
            {
                var a = CurrentContext.GetCurUser();
                var ctx = new QLHSEntities();
                var u = ctx.Users.Where(p => p.username == a.username).FirstOrDefault();

                ctx.SaveChanges();

                return Json(u, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }

        }

        [CheckLogin]
        public ActionResult UpdateProfile(string password, string npassword)
        {
            var result = new ArrayList();
            try
            {
                string EncryptOldPassword = StringUtils.MD5(npassword);
                string EncryptNewPassword = StringUtils.MD5(npassword);
                var a = CurrentContext.GetCurUser();
                var ctx = new QLHSEntities();
                var u = ctx.Users.Where(p => p.username == a.username && p.password == EncryptOldPassword).FirstOrDefault();

                if (u == null)
                {
                    result.Add(
                    new
                    {
                        value = -1,
                        message = "Mật khẩu cũ chưa đúng"
                    });
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                u.password = EncryptNewPassword;
                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                result.Add(
                    new
                    {
                        value = -1,
                        message = "Lỗi " + e.ToString()
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
    }
}