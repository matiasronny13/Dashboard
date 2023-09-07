namespace Domain.Entities;

public partial class Tag
{
    public long Id { get; set; }

    public string? Title { get; set; }

    public long? ParentId { get; set; }

    public DateTime? Created { get; set; }

    public DateTime? Updated { get; set; }
}
