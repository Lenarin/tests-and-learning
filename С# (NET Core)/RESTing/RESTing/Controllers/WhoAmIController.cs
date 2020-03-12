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
    public class WhoAmIController : ControllerBase
    {
        [HttpGet]
        public WhoAmI Get()
        {
            var res = new WhoAmI();
            res.IpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            res.Language = Request.Headers["Accept-Language"].ToString();
            res.Software = Request.Headers["User-Agent"].ToString();

            return res;
        }
    }
}