using Application.Topstep;
using Application.WebCollection;
using FastEndpoints;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Api.Endpoints.Topstep.Accounts
{
    internal class Insert : Endpoint<IEnumerable<Insert.RequestDto>, IEnumerable<Insert.ResponseDto>, Insert.DtoMapper>
    {
        public required IAccountService AppService { get; init; }

        public override void Configure()
        {
            Post("/topstep/accounts");
            AllowAnonymous();
        }
        public override async Task HandleAsync(IEnumerable<RequestDto> request, CancellationToken ct)
        {
            IEnumerable<AccountDto> dtos = Map.ToEntities(request);
            if(dtos != null)
            {
                IEnumerable<AccountDto> result = await AppService.InsertAccounts(dtos);
                await SendCreatedAtAsync<Topstep.Accounts.Get>(null, Map.FromEntities(result));
            }
        }

        #region Internal Classes
        internal class RequestDto
        {
            public string Id { get; set; } = null!;

            public AccountTypeEnum AccountType { get; set; }

            public string? Name { get; set; }
        }

        public class RequestDtoValidator : Validator<IEnumerable<Insert.RequestDto>> { 
            public RequestDtoValidator()
            {
                RuleFor(a => a).NotEmpty();
            }
        }

        internal class ResponseDto
        {
            public string Id { get; set; } = null!;

            public AccountTypeEnum AccountType { get; set; }

            public string? Name { get; set; }
            public bool IsError {  get; set; }
            public string? ErrorMessage { get; set; }
        }
        internal class DtoMapper : Mapper<RequestDto, ResponseDto, WebTagDto>
        {
            public IEnumerable<AccountDto> ToEntities(IEnumerable<RequestDto> e)
            {
                return e.Select(x => new AccountDto { Id = x.Id, Name = x.Name, AccountType = x.AccountType });
            }

            public IEnumerable<ResponseDto> FromEntities(IEnumerable<AccountDto> e)
            {
                return e.Select(x => new ResponseDto { Id = x.Id, Name = x.Name, AccountType = x.AccountType, IsError = x.IsError, ErrorMessage = x.ErrorMessage });
            }
        }
        #endregion
    }
}
