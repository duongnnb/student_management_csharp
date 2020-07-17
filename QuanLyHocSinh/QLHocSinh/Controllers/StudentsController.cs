
using Newtonsoft.Json;
using QLHocSinh.Helper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace QLHocSinh.Controllers
{
    public class StudentsController : Controller
    {
        //string path = @"Data Source=.\SQLSERVER;Initial Catalog=QLHS;Integrated Security=True";
        string path = WebConfigurationManager.AppSettings["Connect"];
        public List<Dictionary<string, object>> GetTableRows(DataTable dtData)
        {
            List<Dictionary<string, object>>
            lstRows = new List<Dictionary<string, object>>();
            Dictionary<string, object> dictRow = null;

            foreach (DataRow dr in dtData.Rows)
            {
                dictRow = new Dictionary<string, object>();
                foreach (DataColumn col in dtData.Columns)
                {
                    dictRow.Add(col.ColumnName, dr[col]);
                }
                lstRows.Add(dictRow);
            }
            return lstRows;
        }
        //
        // GET: /Students/

        SqlDataAdapter _globalAdapt;
        [CheckLogin]
        public ActionResult Index()
        {
            return View();
        }
        //public ActionResult ViewDetail(string? ID)
        public ActionResult ViewDetail(string ID)
        {
            if (ID == null)
            {
                return RedirectToAction("Index", "Home");
            }
            using (var ctx = new QLHSEntities())
            {
                var s = ctx.Students.Where(p => p.StudentID == ID.ToString());
                if (s == null)
                {
                    return RedirectToAction("Index", "Home");
                }
                ViewBag.Id = ID;
                return View();
            }
        }
        [CheckLogin]
        public ActionResult AddStudent()
        {
            return View();
        }
        [CheckLogin]
        public ActionResult Score()
        {
            return View();
        }
        [CheckLogin]
        public ActionResult UpdateScore()
        {
            return View();
        }
        public ActionResult GetStudents()
        {
            using (var ctx = new QLHSEntities())
            {
                var list = ctx.Students.Where(p => p.State != -1).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }

            //string path = @"Data Source=.\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";
            //int i = 1;
            //var students = new List<Students>();
            //using (var con = new SqlConnection(path))
            //{
            //    var cmd = new SqlCommand("getStudents", con) { CommandType = CommandType.StoredProcedure };
            //    con.Open();
            //    var dr = cmd.ExecuteReader();
            //    while (dr.Read())
            //    {
            //        var student = new Students
            //        {
            //            STT = i,
            //            StudentID = dr[0].ToString(),
            //            FullName = dr[1].ToString(),
            //            BirthDay = Convert.ToDateTime(dr[2].ToString()),
            //            Gender = Convert.ToInt32(dr[3].ToString()),
            //            Email = dr[4].ToString(),
            //            PhoneNumber = dr[5].ToString(),
            //            Address = dr[6].ToString()
            //        };
            //        students.Add(student);
            //        i++;
            //    }
            //}
            //return Json(students, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getListStudents()
        {
            SqlConnection cnn = new SqlConnection(path);

            string sql = "Select * from Students";
            _globalAdapt = new SqlDataAdapter(sql, cnn);

            DataTable table = new DataTable();
            _globalAdapt.Fill(table);
            List<Dictionary<string, object>> ds;

            ds = GetTableRows(table);
            var json = Json(ds, JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;

        }
        public ActionResult GetPointTB(string StudentID)
        {
            using (var con = new SqlConnection(path))
            {

                var cmd = new SqlCommand("PointTB", con) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@StudentID", StudentID));
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                var tb = new DataTable();
                sda.Fill(tb);
                string JSONresult;
                JSONresult = JsonConvert.SerializeObject(tb);
                return Json(JSONresult, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetListPoint(string id)
        {
            using (var con = new SqlConnection(path))
            {

                var cmd = new SqlCommand("GetListPointStudent", con) { CommandType = CommandType.StoredProcedure };
                cmd.Parameters.Add(new SqlParameter("@StudentID", id));
                con.Open();
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                var tb = new DataTable();
                sda.Fill(tb);
                List<Dictionary<string, object>> ds;
                ds = GetTableRows(tb);
                var json = Json(ds, JsonRequestBehavior.AllowGet);
                json.MaxJsonLength = int.MaxValue;
                return json;
            }
        }
        public ActionResult getStudentByID(string id)
        {
            using (var ctx = new QLHSEntities())
            {
                var student = ctx.Students
                    .Join(ctx.Classes, s => s.Class, c => c.ID, (s, c) => new { s, c })
                    .Where(p => p.s.StudentID == id)
                    .FirstOrDefault();
                return Json(student, JsonRequestBehavior.AllowGet);
            }
            //var list = ctx.Students
            //           .Join(ctx.Classes
            //           , u => u.Class, uir => uir.ID, (u, uir) => new { u, uir })
            //           .Where(m => m.u.State != -1)
            //           .OrderBy(m => m.u.Class)
            //           .Select(m => new
            //           {
            //               StudentID = m.u.StudentID,
            //               FullName = m.u.FullName,
            //               Class = m.u.Class,
            //               ClassName = m.uir.ClassName,
            //               BirthDay = m.u.BirthDay,
            //               Gender = m.u.Gender,
            //               Address = m.u.Address,
            //               Email = m.u.Email,
            //               PhoneNumber = m.u.PhoneNumber,
            //           }).ToList();

            //string path = @"Data Source=.\SQLEXPRESS;Initial Catalog=QLHS;Integrated Security=True";

            //var students = new List<Students>();
            //using (var con = new SqlConnection(path))
            //{
            //    var cmd = new SqlCommand("getStudentByID", con);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    cmd.Parameters.Add(new SqlParameter("@id", id));
            //    con.Open();
            //    var dr = cmd.ExecuteReader();
            //    while (dr.Read())
            //    {
            //        var student = new Students
            //        {
            //            StudentID = dr[1].ToString(),
            //            FullName = dr[2].ToString(),
            //            BirthDay = Convert.ToDateTime(dr[3].ToString()),
            //            Gender = Convert.ToInt32(dr[4].ToString()),
            //            Email = dr[5].ToString(),
            //            PhoneNumber = dr[6].ToString(),
            //            Address = dr[7].ToString(),
            //            ClassLevel = Convert.ToInt32(dr[8].ToString()),
            //            Class = Convert.ToInt32(dr[9].ToString())
            //        };
            //        students.Add(student);
            //    }
            //}
            //return Json(students, JsonRequestBehavior.AllowGet);
        }
        public bool checkAge(int year)
        {
            var ctx = new QLHSEntities();
            var ruleage = ctx.RuleAges.Where(p => p.Flag == "1").FirstOrDefault();
            var date = DateTime.Now;
            var age = date.Year - year;

            if (ruleage.MinAge <= age && age <= ruleage.MaxAge)
            {
                return true;
            }
            return false;
        }

        public bool checkTotalClass(int classID, string studentID)
        {
            var ctx = new QLHSEntities();
            var student = ctx.Students.Where(p => p.StudentID == studentID).FirstOrDefault();
            if (student != null && student.Class == classID)
            {
                return true;
            }
            var classInfo = ctx.Classes.Where(p => p.ID == classID).FirstOrDefault();

            if (classInfo.Total < classInfo.MaxTotal)
            {
                return true;
            }
            return false;

        }

        [HttpPost]
        public ActionResult AddNewStudent(Student s)
        {
            var result = new ArrayList();
            if (!checkAge(s.BirthDay.Value.Year))
            {
                result.Add(
                    new
                    {
                        value = -1,
                        message = "Độ tuổi không thỏa quy định."
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            if (!checkTotalClass(s.Class.Value, s.StudentID))
            {
                result.Add(
                    new
                    {
                        value = -1,
                        message = "Lớp đã đạt sĩ số tối đa."
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

            using (var ctx = new QLHSEntities())
            {


                ctx.Students.Add(s);

                ctx.SaveChanges();
                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult GetStudentsByClass(int grade)
        {
            using (var ctx = new QLHSEntities())
            {
                var list = ctx.Students
                        .Join(ctx.Classes
                        , u => u.Class, uir => uir.ID, (u, uir) => new { u, uir })
                        .Where(m => m.u.State != -1 && m.u.Class==grade)
                        .OrderBy(m => m.u.Class)
                        .Select(m => new
                        {
                            StudentID = m.u.StudentID,
                            FullName = m.u.FullName,
                            Class = m.u.Class,
                            ClassName = m.uir.ClassName,
                            BirthDay = m.u.BirthDay,
                            Gender = m.u.Gender,
                            Address = m.u.Address,
                            Email = m.u.Email,
                            PhoneNumber = m.u.PhoneNumber,
                        }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateStudentPoint(Point p)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var pu = ctx.Points
                    .Where(u => u.StudentID == p.StudentID
                    && u.SubjectID == p.SubjectID
                    && u.Semester == p.Semester)
                    .FirstOrDefault();

                if (pu == null)
                {
                    var point = new Point();
                    point.StudentID = p.StudentID;
                    point.SubjectID = p.SubjectID;
                    point.Test15Minutes = p.Test15Minutes;
                    point.Test45Minutes = p.Test45Minutes;
                    point.TestSemester = p.TestSemester;
                    point.Semester = p.Semester;
                    ctx.Points.Add(point);
                    ctx.SaveChanges();
                    result.Add(
                    new
                    {
                        value = 1
                    });
                    return Json(result, JsonRequestBehavior.AllowGet);
                }


                pu.Test15Minutes = p.Test15Minutes;
                pu.Test45Minutes = p.Test45Minutes;
                pu.TestSemester = p.TestSemester;

                ctx.SaveChanges();

                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public ActionResult UpdateInfo(Student s)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var user = ctx.Students.Where(u => u.StudentID == s.StudentID).FirstOrDefault();
                user.FullName = s.FullName;
                user.BirthDay = s.BirthDay;
                user.Gender = s.Gender;
                user.Address = s.Address;
                user.Class = s.Class;

                ctx.SaveChanges();

                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            result.Add(
                    new
                    {
                        value = 0
                    });
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetTotalStudent()
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var countS = ctx.Students
                             .Where(o => 1 == 1)
                             .Count();

                var countC = ctx.Classes
                             .Where(o => 1 == 1)
                             .Count();

                var maxC = ctx.ClassLevels
                             .Where(t => 1 == 1)
                             .Select(i => i.MaxTotal).Sum();

                var countSub = ctx.Subjects
                             .Where(o => 1 == 1)
                             .Count();

                var maxSub = ctx.RuleSubjects
                            .Where(t => 1 == 1)
                           .FirstOrDefault();


                result.Add(
                    new
                    {
                        TotalStudent = countS,
                        TotalClass = countC,
                        TotalClassMax = maxC,
                        TotalSubject = countSub,
                        TotalSubjectMax = maxSub.MaxTotal

                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }



        //[HttpPost]
        public ActionResult DeleteStudent(string id)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var student = ctx.Students.Where(u => u.StudentID == id).FirstOrDefault();

                student.State = -1;

                ctx.SaveChanges();

                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeletePoint(string studentid, string subjectid)
        {
            var result = new ArrayList();
            using (var ctx = new QLHSEntities())
            {
                var s = ctx.Points.Where(ss => ss.StudentID == studentid && ss.SubjectID == subjectid).FirstOrDefault();
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
        [CheckLogin]
        public ActionResult Detail()
        {
            return View();
        }
        public ActionResult GetListStudent()
        {
            using (var ctx = new QLHSEntities())
            {
                var list = ctx.Students
                        .Join(ctx.Classes
                        , u => u.Class, uir => uir.ID, (u, uir) => new { u, uir })
                        .Where(m => m.u.State != -1)
                        .OrderBy(m => m.u.Class)
                        .Select(m => new
                        {
                            StudentID = m.u.StudentID,
                            FullName = m.u.FullName,
                            Class = m.u.Class,
                            ClassName = m.uir.ClassName,
                            BirthDay = m.u.BirthDay,
                            Gender = m.u.Gender,
                            Address = m.u.Address,
                            Email = m.u.Email,
                            PhoneNumber = m.u.PhoneNumber,
                        }).ToList();

                //var list = ctx.Students.Where(ss => ss.State!=-1).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult UpdateInfoStudent(Student s)
        {
            var result = new ArrayList();
            if (!checkAge(s.BirthDay.Value.Year))
            {
                result.Add(
                    new
                    {
                        value = -1,
                        message = "Độ tuổi không thỏa quy định."
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            if (!checkTotalClass(s.Class.Value, s.StudentID))
            {
                result.Add(
                    new
                    {
                        value = -1,
                        message = "Lớp đã đạt sĩ số tối đa."
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }


            using (var ctx = new QLHSEntities())
            {
                var user = ctx.Students.Where(u => u.StudentID == s.StudentID).FirstOrDefault();
                user.FullName = s.FullName;
                user.BirthDay = s.BirthDay;
                user.Gender = s.Gender;
                user.Address = s.Address;
                user.Class = s.Class;
                user.Email = s.Email;
                user.PhoneNumber = s.PhoneNumber;

                ctx.SaveChanges();

                result.Add(
                    new
                    {
                        value = 1
                    });
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetAllStudent()
        {
            using (var ctx = new QLHSEntities())
            {
                var list = ctx.Students.Where(p => p.State != -1).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
        }

        //[HttpPost]
        //public ActionResult testadd(Students stu)
        //{
        //    int a = 1;

        //    var b = new ArrayList()
        //{
        //    new { Value = 4, Display = "Emily" },
        //    new { Value = 5, Display = "Lauri" },
        //};
        //    return Json(b, JsonRequestBehavior.AllowGet);
        //}
    }
}