using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RESTing.Models;

namespace RESTing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeStampController : ControllerBase
    {
        [HttpGet]
        public TimeStamp Get()
        {
            var res = new TimeStamp();
            res.Unix = (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            res.UTC = DateTime.UtcNow;

            return res;
        }
    }
}