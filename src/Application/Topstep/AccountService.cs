using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Models;
using Microsoft.Extensions.Options;
using Serilog;

namespace Application.Topstep
{
    public interface IAccountService {
        public Task<List<AccountDto>> GetAccountsAsync();
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
            return await Task.FromResult(_db.TopstepAccounts.ProjectTo<AccountDto>(_mapper.ConfigurationProvider).ToList());
        }
    }
}
