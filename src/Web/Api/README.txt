
## Updating database context
Run this command in from within infrastructure project folder
Set the Output to another folder as there is no way to modify DBContext without overwritting the whole file

dotnet-ef dbcontext scaffold "host=localhost;database=dashboard;user id=postgres;password=zzzzzzz" Npgsql.EntityFrameworkCore.PostgreSQL --force --context-namespace Infrastructure.Data --context-dir D:\Net\Dashboard\src\Infrastructure\Data --context DashboardContext --namespace Domain.Entities --output-dir D:\Net\Dashboard\src\Domain\Entities --no-onconfiguring -t <table name>


## Get user secret
1. cd /Web/Api folder
2. dotnet user-secrets list
