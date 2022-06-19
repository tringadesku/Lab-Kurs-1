using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Mjek")]
    public class PraktikantiController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public PraktikantiController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Praktikanti>>> Get()
        {
            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Praktikanti>> Get(int id)
        {
            var i = await _dataContext.Praktikantis.FindAsync(id);
            if (i == null)
                return BadRequest("Praktikanti not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Praktikanti>>> AddPraktikanti(Praktikanti i)
        {
            _dataContext.Praktikantis.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Praktikanti>>> UpdatePraktikanti(Praktikanti request)
        {
            var dbAmbulanca = await _dataContext.Praktikantis.FindAsync(request.IdPraktikanti);
            if (dbAmbulanca == null)
                return BadRequest("Praktikanti not found!");

            dbAmbulanca.IdPraktikanti = request.IdPraktikanti;
            dbAmbulanca.EmriPr = request.EmriPr;
            dbAmbulanca.MbiemriPr = request.MbiemriPr;
            dbAmbulanca.MjekuMbikqyres = request.MjekuMbikqyres;
            dbAmbulanca.DataFillimit = request.DataFillimit;
            dbAmbulanca.DataPerfundimit = request.DataPerfundimit;
            dbAmbulanca.Oret = request.Oret;
            dbAmbulanca.Aprovimi = request.Aprovimi;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Praktikanti>>> Delete(int id)
        {
            var dbPraktikanti = await _dataContext.Praktikantis.FindAsync(id);
            if (dbPraktikanti == null)
                return BadRequest("Praktikanti not found!");

            _dataContext.Praktikantis.Remove(dbPraktikanti);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }


    }



}
