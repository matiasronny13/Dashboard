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

    public class AccountService : IAccountService
    {
        private readonly IDashboardContext _db;
        private readonly IMapper _mapper;
        private readonly AppSettings _options;
        private readonly ILogger _logger;
        public AccountService(IDashboardContext db, IMapper mapper, IOptions<AppSettings> options, ILogger logger)
        {
            _mapper = mapper;
            _db = db;
            _options = options.Value;
            _logger = logger;
        }
        public async Task<List<AccountDto>> GetAccountsAsync()
        {
            return await Task.FromResult(_db.TopstepAccounts.ProjectTo<AccountDto>(_mapper.ConfigurationProvider).OrderBy(a => a.AccountType).ThenByDescending(a => a.Id).ToList());
        }

        public async Task<IEnumerable<AccountDto>> InsertAccounts(IEnumerable<AccountDto> accounts)
        {
            List<AccountDto> result = new List<AccountDto>();
            long[] filterIds = accounts.Select(a => a.Id).ToArray();
            var existingAccounts = _db.TopstepAccounts.Where(a => filterIds.Contains(a.Id));

            foreach (AccountDto account in accounts)
            {
                if(existingAccounts.Where(a => a.Id == account.Id).Count() == 0)
                {
                    TopstepAccount newAccount = _mapper.Map<TopstepAccount>(account);
                    _db.TopstepAccounts.Add(newAccount);
                }
                else
                {
                    account.IsError = true;
                    account.ErrorMessage = "Account Exists";
                }

                result.Add(account);
            }
            
            if(_db.ChangeTracker.HasChanges()) _db.SaveChanges();
            return await Task.FromResult(result);
        }
    }
}
