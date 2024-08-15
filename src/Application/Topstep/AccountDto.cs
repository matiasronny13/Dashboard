using Application.User;
using AutoMapper;
using Domain.Entities;

namespace Application.Topstep
{
    public enum AccountTypeEnum
    {
        Unknown = 0,
        Combine = 1,
        Practice = 4,
        Funded,
        Live
    }
    public class AccountDto
    {
        public string Id { get; set; } = null!;

        public AccountTypeEnum AccountType { get; set; }

        public string? Name { get; set; }
        public bool IsError { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
