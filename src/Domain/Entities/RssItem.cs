using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class RssItem
{
    public string Guid { get; set; } = null!;

    public long? RssId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTime? PubData { get; set; }

    public string? Link { get; set; }

    public DateTime CreatedAt { get; set; }
}
