using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KontrollaController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public KontrollaController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Kontrolla>>> Get()
        {
            return Ok(await _dataContext.Kontrollas.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kontrolla>> Get(int id)
        {
            var i = await _dataContext.Kontrollas.FindAsync(id);
            if (i == null)
                return BadRequest("Kontrolla not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Kontrolla>>> AddKontrolla(Kontrolla i)
        {
            _dataContext.Kontrollas.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Kontrollas.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Kontrolla>>> UpdateKontrolla(Kontrolla request)
        {
            var dbKontrolla = await _dataContext.Kontrollas.FindAsync(request.IdKontrolla);
            if (dbKontrolla == null)
                return BadRequest("Kontrolla not found!");

            dbKontrolla.IdUserMjeku = request.IdUserMjeku;
            dbKontrolla.IdPacienti = request.IdPacienti;
            dbKontrolla.IdKontrolla = request.IdKontrolla;
            dbKontrolla.Diagnoza = request.Diagnoza;
            dbKontrolla.Pershkrimi = request.Pershkrimi;
            dbKontrolla.Receta = request.Receta;


            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Kontrollas.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Kontrolla>>> Delete(int id)
        {
            var dbKontrolla = await _dataContext.Kontrollas.FindAsync(id);
            if (dbKontrolla == null)
                return BadRequest("Kontrolla not found!");

            _dataContext.Kontrollas.Remove(dbKontrolla);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Kontrollas.ToListAsync());
        }


    }
}