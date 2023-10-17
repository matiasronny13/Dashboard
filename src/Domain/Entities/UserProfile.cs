using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class UserProfile
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public DateTime? CreatedDate { get; set; }
}
