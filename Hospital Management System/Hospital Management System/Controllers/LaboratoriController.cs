using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LaboratoriController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public LaboratoriController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Laboratori>>> Get()
        {
            return Ok(await _dataContext.Laboratoris.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Laboratori>> Get(string id)
        {
            var i = await _dataContext.Laboratoris.FindAsync(id);
            if (i == null)
                return BadRequest("Laboratori not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Laboratori>>> AddLaboratori(Laboratori i)
        {
            _dataContext.Laboratoris.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Laboratoris.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Laboratori>>> UpdateLaboratori(Laboratori request)
        {
            var dbLaboratori = await _dataContext.Laboratoris.FindAsync(request.NrAnalizes);
            if (dbLaboratori == null)
                return BadRequest("Laboratori not found!");

            dbLaboratori.NrAnalizes = request.NrAnalizes;
            dbLaboratori.IdUserLaboranti = request.IdUserLaboranti;
            dbLaboratori.IdPacienti = request.IdPacienti;
            dbLaboratori.Data = request.Data;
            dbLaboratori.Lloji = request.Lloji;


            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Laboratoris.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Laboratori>>> Delete(string id)
        {
            var dbLaboratori = await _dataContext.Laboratoris.FindAsync(id);
            if (dbLaboratori == null)
                return BadRequest("Laboratori not found!");

            _dataContext.Laboratoris.Remove(dbLaboratori);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Laboratoris.ToListAsync());
        }


    }
}