namespace Domain.Entities;

public partial class RssFeed
{
    public int Id { get; set; }

    public int? RssGroupId { get; set; }

    public string? Url { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual RssGroup? RssGroup { get; set; }

    public virtual ICollection<RssItem> RssItems { get; set; } = new List<RssItem>();
}
