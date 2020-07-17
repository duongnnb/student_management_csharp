
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
    public class SubjectsController : Controller
    {
        //
        // GET: /Subjects/
        [CheckLogin]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult getSubjects()
        {
            using (var ctx = new QLHSEntities())
            {
                var list = ctx.Subjects.Where(p => p.Flag != -1).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);

            }

        }
        public ActionResult getListSubject()
        {
            using (var ctx = new QLHSEntities())
            {
                var list = ctx.Subjects.Where(p => p.Flag != -1).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateSubject(Subject s)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var subject = ctx.Subjects.Where(sub => sub.SubjectID == s.SubjectID).FirstOrDefault();

                subject.SubjectName = s.SubjectName;
                subject.Period = s.Period;
                subject.Type = s.Type;

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public bool checkTotalSubject()
        {
            var ctx = new QLHSEntities();
            var current_total = ctx.Subjects.Where(p => p.Flag != -1).ToList().Count;

            var max_total = ctx.RuleSubjects.Where(p => 1 == 1).FirstOrDefault().MaxTotal;

            if (current_total < max_total)
            {
                return true;
            }
            return false;
        }

        [HttpPost]
        public ActionResult AddSubject(Subject s)
        {
            var result = new ArrayList();
            if (!checkTotalSubject())
            {
                result.Add(
                    new
                    {
                        value = -1,
                        message = "Số lượng môn học đã đạt tối đa"
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            using (var ctx = new QLHSEntities())
            {
                ctx.Subjects.Add(s);

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteSubject(string id)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var s = ctx.Subjects.Where(ss => ss.SubjectID == id).FirstOrDefault();
                s.Flag = -1;
                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
    }
}