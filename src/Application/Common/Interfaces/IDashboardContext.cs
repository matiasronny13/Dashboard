﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IDashboardContext
    {
        DbSet<TopstepAccount> TopstepAccounts { get; set; }

        DbSet<TagKey> TagKeys { get; set; }

        DbSet<UserProfile> UserProfiles { get; set; }

        DbSet<WebTag> WebTags { get; set; }

        int SaveChanges();
    }
}
