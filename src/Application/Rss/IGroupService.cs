using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feeds
{
    public interface IGroupService
    {
        public Task<IEnumerable<RssGroup>> GetGroupsAsync();
    }
}
