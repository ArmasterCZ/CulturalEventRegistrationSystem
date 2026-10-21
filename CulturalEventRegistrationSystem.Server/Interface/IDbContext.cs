using CulturalEventRegistrationSystem.Server.models;

namespace CulturalEventRegistrationSystem.Server.Interface
{
    public interface IDbContext
    {
        Task<RegistrationsModel> Create(RegistrationsModel registration);
        Task<bool> Delete(string id);
        Task<RegistrationsModel> Get(string id);
        Task<bool> Update(RegistrationsModel registration);
    }
}