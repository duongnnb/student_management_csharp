using QLHocSinh.Helper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLHocSinh.Controllers
{
    public class RuleController : Controller
    {

        #region Age
        // GET: /Rule/
        [CheckLogin]
        public ActionResult Age()
        {
            return View();
        }
        [CheckLogin]
        public ActionResult StandardScore()
        {
            return View();
        }
        public ActionResult GetRuleAge()
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.RuleAges
                    .Where(r => r.Flag == "1")
                    .FirstOrDefault();

                result.Add(
                    new
                    {
                        ruleage = rx
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }
        public ActionResult GetRuleScore()
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.RuleStandardScores
                    .Where(r => r.Flag == "1")
                    .FirstOrDefault();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public ActionResult UpdateRuleAge(RuleAge ruleage)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.RuleAges
                    .Where(r => r.ID == ruleage.ID)
                    .FirstOrDefault();

                rx.MaxAge = ruleage.MaxAge;
                rx.MinAge = ruleage.MinAge;

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }
        public ActionResult updateRuleScore(RuleStandardScore r)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.RuleStandardScores
                    .Where(rxs => r.ID == r.ID)
                    .FirstOrDefault();

                rx.StandardScore = r.StandardScore;

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }
        
        #endregion

        #region TotalStudent
        public ActionResult TotalStudent()
        {
            return View();
        }
        public ActionResult GetRuleTotalStudent()
        {
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.Classes
                    .Where(r => r.Flag == 1)
                    .ToList();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetClassByID(int ID)
        {
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.Classes
                    .Where(r => r.ID == ID)
                    .FirstOrDefault();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateRuleTotalStudent(Class c)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.Classes
                    .Where(r => r.ID == c.ID)
                    .FirstOrDefault();

                rx.ClassName = c.ClassName;
                rx.MaxTotal = c.MaxTotal;

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult GetBlock()
        {
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.ClassLevels
                    .Where(p => 1 == 1)
                    .ToList();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetBlockByID(int ID)
        {
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.ClassLevels
                    .Where(p => p.ID == ID)
                    .FirstOrDefault();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateRuleTotalBlock(ClassLevel c)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.ClassLevels
                    .Where(r => r.ID == c.ID)
                    .FirstOrDefault();

                rx.MaxTotal = c.MaxTotal;

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        #endregion

        #region

        [CheckLogin]
        public ActionResult Subject()
        {
            return View();
        }
        public ActionResult GetSubject()
        {
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.Subjects
                    .Where(p => 1==1)
                    .ToList();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetSubjectByID(int ID)
        {
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.Subjects
                    .Where(p => p.ID==ID)
                    .FirstOrDefault();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult UpdateSubject(Subject s)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.Subjects
                    .Where(r => r.ID == s.ID)
                    .FirstOrDefault();

                rx.SubjectName = s.SubjectName;
                rx.Type = s.Type;
                rx.Period = s.Period;

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult GetMaxTotalSubject()
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.RuleSubjects
                    .Where(r => 1==1)
                    .FirstOrDefault();

                return Json(rx, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult UpdateSubjectTotal(int maxtotal)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var rx = ctx.RuleSubjects
                    .Where(r => 1==1)
                    .FirstOrDefault();

                rx.MaxTotal = maxtotal;

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        //public ActionResult AddNewStudent(Student s)
        //{
            
        //}

        #endregion

        #region Permission

        public ActionResult GetPermission()
        {
            var result = new ArrayList();
            var permission = CurrentContext.GetCurUser().flag;
            result.Add(
                   new
                   {
                       auth = permission
                   });
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}