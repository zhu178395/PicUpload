using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PicForm.Models;

namespace PicForm.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _hostenv;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment hostenv)
        {
            _logger = logger;
            _hostenv = hostenv;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpPost]
        public IActionResult FileSave(string img)
        {
            string str_image = img;
            return Content(str_image);
        }
        public async Task<IActionResult> FileSave1()
        {
            var date = Request;
            var files = Request.Form.Files;
            long size = files.Sum(f => f.Length);
            string webRootPath = _hostenv.WebRootPath;
            string contentRootPath = _hostenv.ContentRootPath;
            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {

                    // string fileExt = GetFileExt(formFile.FileName); //文件扩展名，不含“.”
                    string fileExt = formFile.FileName.Split('.')[1];
                    long fileSize = formFile.Length; //获得文件大小，以字节为单位
                    string newFileName = System.Guid.NewGuid().ToString() + "." + fileExt; //随机生成新的文件名
                    var filePath = webRootPath + "/upload/" + newFileName;
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {

                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            return Ok(new { count = files.Count, size });
        }
        public async Task<IActionResult> FileSave2()
        {
            //var date = Request;
            var files = Request.Form.Files;
            long size = files.Sum(f => f.Length);
            string webRootPath = _hostenv.WebRootPath;
            string contentRootPath = _hostenv.ContentRootPath;
            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {

                   // string fileExt = GetFileExt(formFile.FileName); //文件扩展名，不含“.”
                   string fileExt=formFile.FileName.Split(',')[1];
                    long fileSize = formFile.Length; //获得文件大小，以字节为单位
                    string newFileName = System.Guid.NewGuid().ToString() + "." + fileExt; //随机生成新的文件名
                    var filePath = webRootPath + "/upload/" + newFileName;
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {

                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            return Ok(new { count = files.Count, size });
        }
        //[HttpPost]
        //public async Task<IActionResult> FileSave1(List<Microsoft.AspNetCore.Http.IFormFile> files)
        //{
        //   // var files1 = Request.Form.Files;
        //    long size = files.Sum(f => f.Length);
        //    string webRootPath = _hostenv.WebRootPath;
        //    string contentRootPath = _hostenv.ContentRootPath;
        //    foreach (var formFile in files)
        //    {
        //        if (formFile.Length > 0)
        //        {

        //            // string fileExt = GetFileExt(formFile.FileName); //文件扩展名，不含“.”
        //            string fileExt = formFile.FileName.Split('.')[1];
        //            long fileSize = formFile.Length; //获得文件大小，以字节为单位
        //            string newFileName = System.Guid.NewGuid().ToString() + "." + fileExt; //随机生成新的文件名
        //            var filePath = webRootPath + "/upload/" + newFileName;
        //            using (var stream = new FileStream(filePath, FileMode.Create))
        //            {

        //                await formFile.CopyToAsync(stream);
        //            }
        //        }
        //    }

        //    return Ok(new { count = files.Count, size });
        //}
    }
}
