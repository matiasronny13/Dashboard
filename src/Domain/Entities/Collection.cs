namespace Domain.Entities;

public partial class Collection
{
    public long Id { get; set; }

    public string? Url { get; set; }

    public int[]? Tags { get; set; }

    public DateTime? Created { get; set; }

    public DateTime? Updated { get; set; }
}
