using Newtonsoft.Json;
using QLHocSinh.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace QLHocSinh.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Report/

        //string path = @"Data Source=.\sqlexpress;Initial Catalog=QLHS;Integrated Security=True";
        string path =   WebConfigurationManager.AppSettings["Connect"];
        [CheckLogin]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ReportBySubject()
        {
            return View();
        }

        public ActionResult ReportBySemester()
        {
            return View();
        }
        public ActionResult GetReportBySubject(int semester, string subjectid, string Year)
        {
            using (var ctx = new QLHSEntities())
            {
                //var query = (from c in ctx.Classes
                //            join p in ctx.Points
                //            on c.ID equals p.ClassID
                //            group new { c, p } by new { c.ID, c.ClassName } into g
                //            select new
                //            {
                //                g.Key.ID,
                //                g.Key.ClassName,
                //                Total = g.Sum(px => px.p.Average >= 5 ? 1 : 0),
                //               // Count = g.Select(x => x.c.ID).Distinct().Count()
                //               c = g.Count()
                //            }).ToList();
                              

            }

            using (var con = new SqlConnection(path))
            {

                var cmd = new SqlCommand("ReportFolowSubject", con) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@Year1", Year.Split('-')[0]));
                cmd.Parameters.Add(new SqlParameter("@Year2", Year.Split('-')[1]));
                cmd.Parameters.Add(new SqlParameter("@Semester", semester));
                cmd.Parameters.Add(new SqlParameter("@SubjectID", subjectid));
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                var tb = new DataTable();
                sda.Fill(tb);
                string JSONresult;
                JSONresult = JsonConvert.SerializeObject(tb);
                return Json(JSONresult, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetReportBySemester(int semester, string Year)
        {
            using (var con = new SqlConnection(path))
            {
                var cmd = new SqlCommand("ReportFolowYear", con) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@Year1", Year.Split('-')[0]));
                cmd.Parameters.Add(new SqlParameter("@Year2", Year.Split('-')[1]));
                cmd.Parameters.Add(new SqlParameter("@Semester", semester));
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                var tb = new DataTable();
                sda.Fill(tb);
                string JSONresult;
                JSONresult = JsonConvert.SerializeObject(tb);
                return Json(JSONresult, JsonRequestBehavior.AllowGet);
            }
        }
    }
}