using Application.User;
using AutoMapper;
using Domain.Entities;

namespace Application.Topstep
{
    public enum AccountTypeEnum
    {
        Practice,
        Combine,
        Funded,
        Live
    }
    public class AccountDto
    {
        public string Id { get; set; } = null!;

        public AccountTypeEnum AccountType { get; set; }

        public string? Name { get; set; }
    }
}
