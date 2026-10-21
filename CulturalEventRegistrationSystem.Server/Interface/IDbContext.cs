using CulturalEventRegistrationSystem.Server.Models;

namespace CulturalEventRegistrationSystem.Server.Interface
{
    public interface IDbContext
    {
        Task<RegistrationsModel> Create(RegistrationsModel registration, int maxNumberOfReservations);
        Task<bool> Delete(string id);
        Task<RegistrationsModel?> Get(string id);
        Task<int> GetNumberOfReservedSeats(string? countExceptId);
        Task<bool> Update(RegistrationsModel registration, int maxNumberOfReservations);
    }
}