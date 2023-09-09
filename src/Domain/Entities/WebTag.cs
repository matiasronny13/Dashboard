using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class WebTag
{
    public string Id { get; set; }

    public string? Url { get; set; }

    public int[]? Tags { get; set; }

    public DateTime? Created { get; set; }

    public DateTime? Updated { get; set; }
}
