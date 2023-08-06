using Application.Rss;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IDashboardContext
    {
        DbSet<RssFeed> RssFeeds { get; set; }

        DbSet<RssGroup> RssGroups { get; set; }

        DbSet<RssItem> RssItems { get; set; }

        DbSet<UserProfile> UserProfiles { get; set; }
    }
}
