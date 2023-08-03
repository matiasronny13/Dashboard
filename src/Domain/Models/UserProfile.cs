using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class UserProfile
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<RssGroup> RssGroups { get; set; } = new List<RssGroup>();
}
