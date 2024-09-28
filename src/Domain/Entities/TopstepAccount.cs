namespace Domain.Entities;

public partial class TopstepAccount
{
    public long Id { get; set; }

    public int AccountType { get; set; }

    public string? Name { get; set; }

    public TimeOnly? CreatedAt { get; set; }
}
