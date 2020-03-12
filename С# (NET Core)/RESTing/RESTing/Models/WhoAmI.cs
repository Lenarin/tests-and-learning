using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;

namespace RESTing.Models
{
    public class WhoAmI
    {
        public string IpAddress { get; set; }
        public string Language { get; set; }
        public string Software { get; set; }
    }
}
