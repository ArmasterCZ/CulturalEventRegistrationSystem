using CulturalEventRegistrationSystem.Server.db;
using CulturalEventRegistrationSystem.Server.Interface;
using CulturalEventRegistrationSystem.Server.Models;
using CulturalEventRegistrationSystem.Server.Repository;

namespace CulturalEventRegistrationSystem.Server.Utils
{
    public static class ServiceConfiguration
    {
        public static IServiceCollection AddDiConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IIdGenerator, IdGenerator>();
            services.AddScoped<IRegistrationsModel, RegistrationsModel>();
            services.AddScoped<IDbContext, SqlLite>();
            services.AddScoped<IRegistrationRepository, RegistrationRepository>();

            return services;
        }
    }
}
