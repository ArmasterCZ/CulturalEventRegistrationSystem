using CulturalEventRegistrationSystem.Server.Interface;
using CulturalEventRegistrationSystem.Server.Models;
using System.ComponentModel.DataAnnotations;

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
            var validation = await CheckRezervationCondition(model.TicketsReserved, null);
            if (validation?.ErrorMessage != null)
            {
                throw new ValidationException(validation.ErrorMessage);
            }

            // generate unique Id
            string id = idGenerator.Generate();
            while ((await Get(id)) != null)
            {
                id = idGenerator.Generate();
            }
            model.Id = id;

            return await dbContext.Create(model, maxNumberOfReservations);
        }

        public async Task<bool> Update(RegistrationsModel model)
        {
            //cannot update rezervation.TicketsReserved to 0 (need to be deleted)
            var validation = await CheckRezervationCondition(model.TicketsReserved, model.Id);
            if (validation?.ErrorMessage != null)
            {
                throw new ValidationException(validation.ErrorMessage);
            }

            return await dbContext.Update(model, maxNumberOfReservations);
        }

        public async Task<bool> Delete(string id)
        {
            return await dbContext.Delete(id);
        }

        private const int maxNumberOfReservations = 100;
        private async Task<ValidationResult> CheckRezervationCondition(int requiredSpace, string countExceptId)
        {
            if (requiredSpace < 1)
            {
                return new ValidationResult("Není možné rezervovat méně jak 1 místo.");
            }

            if (requiredSpace > 10)
            {
                return new ValidationResult("Není možné rezervovat více jak 10 míst.");
            }

            var numberOfReservations = await dbContext.GetNumberOfReservedSeats(countExceptId);
            if (numberOfReservations + requiredSpace > maxNumberOfReservations)
            {
                return new ValidationResult($"Počet volných míst na události je menší než požadovaný. Aktuálně zbývá {maxNumberOfReservations - numberOfReservations} míst.");
            }

            return ValidationResult.Success;
        }
    }
}
