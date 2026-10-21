using CulturalEventRegistrationSystem.Server.Interface;

namespace CulturalEventRegistrationSystem.Server.Models
{

    public class RegistrationsModel : IRegistrationsModel
    {
        public string? Id { get; set; }
        public string Email { get; set; }
        public string Tel { get; set; }
        public int TicketsReserved { get; set; }
    }
}
