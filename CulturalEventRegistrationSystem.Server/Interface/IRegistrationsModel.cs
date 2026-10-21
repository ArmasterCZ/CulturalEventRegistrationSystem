namespace CulturalEventRegistrationSystem.Server.Interface
{
    public interface IRegistrationsModel
    {
        string Email { get; set; }
        string Id { get; set; }
        string Tel { get; set; }
        int TicketsReserved { get; set; }
    }
}