namespace Domain.Entities;

public partial class RssGroup
{
    public int Id { get; set; }

    public int? UserProfileId { get; set; }

    public int? ParentId { get; set; }

    public string? Name { get; set; }

    public int SeqId { get; set; }

    public DateTime CreatedDate { get; set; }

    public virtual ICollection<RssFeed> RssFeeds { get; set; } = new List<RssFeed>();

    public virtual UserProfile? UserProfile { get; set; }
}
