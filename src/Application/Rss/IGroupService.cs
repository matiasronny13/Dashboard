﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rss
{
    public interface IGroupService
    {
        public Task<IEnumerable<RssGroup>> GetGroupsAsync();
    }
}