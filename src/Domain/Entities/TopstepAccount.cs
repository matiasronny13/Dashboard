namespace Domain.Entities;

public partial class TopstepAccount
{
    public string Id { get; set; } = null!;

    public int AccountType { get; set; }

    public string? Name { get; set; }

    public TimeOnly? CreatedAt { get; set; }
}
