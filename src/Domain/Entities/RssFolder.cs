using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class RssFolder
{
    public long Id { get; set; }

    public long? ParentId { get; set; }

    public string? Name { get; set; }

    public DateTime? CreatedAt { get; set; }
}
