
## Updating database context
dotnet ef dbcontext scaffold "host=localhost;database=dashboard;user id=postgres;password=zzzzzzz" Npgsql.EntityFrameworkCore.PostgreSQL --force --context-namespace Infrastructure.Data --context-dir D:\Net\Dashboard\src\Infrastructure\Data --context DashboardBaseContext --namespace Domain.Entities --output-dir D:\Net\Dashboard\src\Domain\Entities --no-onconfiguring
-t collection



## Get user secret
1. cd /Web/Api folder
2. dotnet user-secrets list
