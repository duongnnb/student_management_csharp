using QLHocSinh.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLHocSinh.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        [CheckLogin]
        public ActionResult Index()
        {
            return View();
        }
    }
}