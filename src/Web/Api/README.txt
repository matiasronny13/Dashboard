
## Updating database context
dotnet ef dbcontext scaffold "host=localhost;database=dashboard;user id=postgres;password=zzzzzzz" Npgsql.EntityFrameworkCore.PostgreSQL -c DashboardContext -o Data -f -t collection


## Get user secret
1. cd /Web/Api folder
2. dotnet user-secrets list
