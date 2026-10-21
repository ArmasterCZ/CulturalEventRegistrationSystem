using CulturalEventRegistrationSystem.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace CulturalEventRegistrationSystem.Server.Interface
{
    public interface IRegistrationRepository
    {
        Task<RegistrationsModel> Create(RegistrationsModel model);
        Task<bool> Delete(string Id);
        Task<RegistrationsModel?> Get(string id);
        Task<bool> Update(RegistrationsModel model);
    }
}