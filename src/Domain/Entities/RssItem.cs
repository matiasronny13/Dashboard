using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class RssItem
{
    public Guid Id { get; set; }

    public int? RssFeedId { get; set; }

    public string? Title { get; set; }

    public string? Detail { get; set; }

    public bool IsRead { get; set; }

    public DateTime? PublishDate { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual RssFeed? RssFeed { get; set; }
}
