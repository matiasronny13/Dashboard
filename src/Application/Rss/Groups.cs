using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rss
{
    public class Groups : IGroups
    {
        private readonly ILogger _logger;
        public Groups(ILogger logger) 
        {
            _logger = logger;
        }
        public string GetGroup(int id)
        {
            _logger.Information("This is get group");
            throw new Exception("waaaaaaaaa");
        }
    }
}
