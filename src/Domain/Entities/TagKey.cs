using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class TagKey
{
    public long Id { get; set; }

    public string? Title { get; set; }

    public long? ParentId { get; set; }

    public DateTime? Created { get; set; }

    public DateTime? Updated { get; set; }
}
