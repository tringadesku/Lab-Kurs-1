using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacientiController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public PacientiController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Pacienti>>> Get()
        {
            return Ok(await _dataContext.Pacientis.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dhoma>> Get(int id)
        {
            var p = await _dataContext.Pacientis.FindAsync(id);
            if (p == null)
                return BadRequest("Pacienti not found!");
            return Ok(p);
        }

        [HttpPost]
        public async Task<ActionResult<List<Pacienti>>> AddPacienti(Pacienti p)
        {
            _dataContext.Pacientis.Add(p);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Pacientis.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Pacienti>>> UpdatePacienti(Pacienti request)
        {
            var dbPacienti = await _dataContext.Pacientis.FindAsync(request.IdPacienti);
            if (dbPacienti == null)
                return BadRequest("Pacienti not found!");

            dbPacienti.IdPacienti = request.IdPacienti;
            dbPacienti.Emri = request.Emri;
            dbPacienti.Mbiemri = request.Mbiemri;
            dbPacienti.Ditelindja = request.Ditelindja;
            dbPacienti.Gjinia = request.Gjinia;
            dbPacienti.Shteti = request.Shteti;
            dbPacienti.Qyteti = request.Qyteti;
            dbPacienti.EmriRruges= request.EmriRruges;
            dbPacienti.TipiGjakut = request.TipiGjakut;
            dbPacienti.Alergji = request.Alergji;   
            dbPacienti.Nrtelefonit = request.Nrtelefonit;


            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Pacientis.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Pacienti>>> Delete(int id)
        {
            var dbPacienti = await _dataContext.Pacientis.FindAsync(id);
            if (dbPacienti == null)
                return BadRequest("Pacienti not found!");

            _dataContext.Pacientis.Remove(dbPacienti);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Pacientis.ToListAsync());
        }
    }
}
