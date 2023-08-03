using Application.Common.Interfaces;
using Domain.Models;
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
        private readonly IDashboardContext _db;
        public Groups(ILogger logger, IDashboardContext db) 
        {
            _logger = logger;
            _db = db;
        }
        public ICollection<RssGroup> GetGroups()
        {
            _logger.Information("This is get group");

            return _db.RssGroups.ToList();
        }
    }
}
