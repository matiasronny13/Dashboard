using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Models;
using Microsoft.Extensions.Options;
using Serilog;

namespace Application.Topstep
{
    public interface IAccountService {
        public Task<List<AccountDto>> GetAccountsAsync();
        public Task<IEnumerable<AccountDto>> InsertAccounts(IEnumerable<AccountDto> accounts);
    }

    public class AccountService: IAccountService
    {
        public required IDashboardContext db { get; init; }
        public required IMapper mapper { get; init; }
        public required IOptions<AppSettings> options { get; init; }
        public required ILogger logger { get; init; }

        public async Task<List<AccountDto>> GetAccountsAsync()
        {
            return await Task.FromResult(db.TopstepAccounts.ProjectTo<AccountDto>(mapper.ConfigurationProvider).OrderBy(a => a.AccountType).ThenByDescending(a => a.Id).ToList());
        }

        public async Task<IEnumerable<AccountDto>> InsertAccounts(IEnumerable<AccountDto> accounts)
        {
            List<AccountDto> result = new List<AccountDto>();
            long[] filterIds = accounts.Select(a => a.Id).ToArray();
            var existingAccounts = db.TopstepAccounts.Where(a => filterIds.Contains(a.Id));

            foreach (AccountDto account in accounts)
            {
                if(existingAccounts.Where(a => a.Id == account.Id).Count() == 0)
                {
                    TopstepAccount newAccount = mapper.Map<TopstepAccount>(account);
                    db.TopstepAccounts.Add(newAccount);
                }
                else
                {
                    account.IsError = true;
                    account.ErrorMessage = "Account Exists";
                }

                result.Add(account);
            }
            
            if(db.ChangeTracker.HasChanges()) db.SaveChanges();
            return await Task.FromResult(result);
        }
    }

    #region DTO
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
        public long Id { get; set; }

        public AccountTypeEnum AccountType { get; set; }

        public string? Name { get; set; }
        public bool IsError { get; set; }
        public string? ErrorMessage { get; set; }
    }
    #endregion
}
