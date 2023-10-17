using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Rss
{
    public long Id { get; set; }

    public long? FolderId { get; set; }

    public string? Title { get; set; }

    public string? Url { get; set; }

    public string? Description { get; set; }

    public DateTime? LastBuildDate { get; set; }

    public string? Schema { get; set; }

    public string? SchemaVersion { get; set; }

    public bool? IsDisabled { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
