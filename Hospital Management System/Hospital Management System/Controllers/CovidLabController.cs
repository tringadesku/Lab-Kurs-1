using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Laborant,Mjek")]
    public class CovidLabController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public CovidLabController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<CovidLab>>> Get()
        {
            return Ok(await _dataContext.CovidLabs.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CovidLab>> Get(int id)
        {
            var i = await _dataContext.CovidLabs.FindAsync(id);
            if (i == null)
                return BadRequest("Covid Laboratori not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<CovidLab>>> AddCovidLab(CovidLab i)
        {
            _dataContext.CovidLabs.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.CovidLabs.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<CovidLab>>> UpdateCovidLab(CovidLab request)
        {
            var dbCovidLab = await _dataContext.CovidLabs.FindAsync(request.AnalizaId);
            if (dbCovidLab == null)
                return BadRequest("Covid Laboratori not found!");

            dbCovidLab.AnalizaId = request.AnalizaId;
            dbCovidLab.IdUserLaboranti = request.IdUserLaboranti;
            dbCovidLab.PacientiId = request.PacientiId;
            dbCovidLab.LlojiTestit = request.LlojiTestit;
            dbCovidLab.Mostra = request.Mostra;
            dbCovidLab.DataAnalizes = request.DataAnalizes;
            dbCovidLab.Rezultati = request.Rezultati;


            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.CovidLabs.ToListAsync());
        }
        [HttpDelete("{id}")]

        public async Task<ActionResult<List<CovidLab>>> Delete(int id)
        {
            var dbCovidLab = await _dataContext.CovidLabs.FindAsync(id);
            if (dbCovidLab == null)
                return BadRequest("Covid Laboratori not found!");

            _dataContext.CovidLabs.Remove(dbCovidLab);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.CovidLabs.ToListAsync());
        }


    }
}