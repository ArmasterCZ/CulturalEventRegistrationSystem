using CulturalEventRegistrationSystem.Server.Interface;
using CulturalEventRegistrationSystem.Server.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CulturalEventRegistrationSystem.Server.Repository
{
    public class RegistrationRepository : IRegistrationRepository
    {
        private readonly IDbContext dbContext;
        private IIdGenerator idGenerator;

        public RegistrationRepository(IIdGenerator idGenerator, IDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.idGenerator = idGenerator;
        }

        public async Task<RegistrationsModel> Get(string id)
        {
            return await dbContext.Get(id);
        }

        public async Task<RegistrationsModel> Create(RegistrationsModel model)
        {
            // generate unique Id
            string id = idGenerator.Generate();
            while ((await Get(id)) != null)
            {
                id = idGenerator.Generate();
            }
            model.Id = id;

            return await dbContext.Create(model);
        }

        public async Task<bool> Update(RegistrationsModel model)
        {
            return await dbContext.Update(model);
        }

        public async Task<bool> Delete(string id)
        {
            return await dbContext.Delete(id);
        }
    }
}
