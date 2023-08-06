using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rss
{
    public interface IGroupsRepository
    {
        public List<RssGroup> GetAllGroups();
        public List<string> GetGroupById();
    }
}
