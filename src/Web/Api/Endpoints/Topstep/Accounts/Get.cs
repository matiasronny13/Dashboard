
using Application.Topstep;
using FastEndpoints;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Api.Endpoints.Topstep.Accounts
{
    internal class Get : EndpointWithoutRequest<IEnumerable<Get.ResponseDto>, Get.DtoMapper>
    {
        public required IAccountService AppService { get; init; }
        public override void Configure()
        {
            Get("/topstep/accounts");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CancellationToken ct)
        {
            var result = await AppService!.GetAccountsAsync();

            if (result != null)
            {
                await SendOkAsync(Map.FromEntity(result));
            }
            else
            {
                await SendNotFoundAsync(ct);
            }
        }

        #region Internal Classes
        internal class ResponseDto
        {
            public long Id { get; set; }

            [System.Text.Json.Serialization.JsonConverter(typeof(JsonStringEnumConverter))]
            public AccountTypeEnum AccountTypeName { get => AccountType; }

            public AccountTypeEnum AccountType { get; set; }

            public string? Name { get; set; }
        }
        internal class DtoMapper : ResponseMapper<IEnumerable<ResponseDto>, IEnumerable<AccountDto>>
        {
            public override IEnumerable<ResponseDto> FromEntity(IEnumerable<AccountDto> e)
            {
                return e.Select(a => new ResponseDto() {Id = a.Id, AccountType = a.AccountType, Name = a.Name});
            }
        }
        #endregion
    }
}
