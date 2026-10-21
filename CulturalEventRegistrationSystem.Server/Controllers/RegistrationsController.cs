using CulturalEventRegistrationSystem.Server.Interface;
using CulturalEventRegistrationSystem.Server.models;
using Microsoft.AspNetCore.Mvc;

namespace CulturalEventRegistrationSystem.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class RegistrationsController : ControllerBase
    {
        IRegistrationRepository repository;

        public RegistrationsController(IRegistrationRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<RegistrationsModel>> Get(string id)
        {
            var result = await repository.Get(id);
            return result != null ? Ok(result) : NotFound();
        }

        /// <summary>
        /// Ignore Id in model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<RegistrationsModel>> Create(RegistrationsModel model)
        {
            return Ok(await repository.Create(model));
        }

        [HttpPut]
        public async Task<ActionResult<bool>> Update(RegistrationsModel model)
        {
            return (await repository.Update(model)) ? Ok() : NotFound();
        }

        [HttpDelete]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            return (await repository.Delete(id)) ? Ok() : NotFound();
        }

    }
}
