using CulturalEventRegistrationSystem.Server.Interface;

namespace CulturalEventRegistrationSystem.Server.Utils
{
    public class IdGenerator : IIdGenerator
    {
        private readonly Random rng = new();

        /// <summary>
        /// generate registration Id
        /// (max 2_176_782_336 unique combinations)
        /// </summary>
        /// <returns></returns>
        public string Generate()
        {
            int length = 6;
            const string allowedChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            char[] buffer = new char[length];
            for (int i = 0; i < length; i++)
            {
                buffer[i] = allowedChars[rng.Next(allowedChars.Length)];
            }

            return new string(buffer);
        }
    }
}
