using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DhomaController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public DhomaController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Dhoma>>> Get()
        {
            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dhoma>> Get(String id)
        {
            var dh = await _dataContext.Dhomas.FindAsync(id);
            if (dh == null)
                return BadRequest("Dhoma not found!");
            return Ok(dh);
        }


        [HttpPost]
        public async Task<ActionResult<List<Dhoma>>> AddDhoma(Dhoma dh)
        {
            _dataContext.Dhomas.Add(dh);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Dhoma>>> UpdateDhoma(Dhoma request)
        {
            var dbDhoma = await _dataContext.Dhomas.FindAsync(request.RoomNr);
            if (dbDhoma == null)
                return BadRequest("Dhoma not found!");

            dbDhoma.RoomNr = request.RoomNr;
            dbDhoma.NrPacientave = request.NrPacientave;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Dhoma>>> Delete(string id)
        {
            var dbDhoma = await _dataContext.Dhomas.FindAsync(id);
            if (dbDhoma == null)
                return BadRequest("Dhoma not found!");

            _dataContext.Dhomas.Remove(dbDhoma);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

    }
}
