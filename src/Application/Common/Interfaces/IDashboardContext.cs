using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Application.Common.Interfaces
{
    public interface IDashboardContext
    {
        DbSet<TopstepAccount> TopstepAccounts { get; set; }

        DbSet<TagKey> TagKeys { get; set; }

        DbSet<WebTag> WebTags { get; set; }

        ChangeTracker ChangeTracker { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        int SaveChanges();
    }
}
