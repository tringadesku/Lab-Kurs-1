using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperacioniController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public OperacioniController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Operacioni>>> Get()
        {
            return Ok(await _dataContext.Operacionis.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Operacioni>> Get(string id)
        {
            var i = await _dataContext.Operacionis.FindAsync(id);
            if (i == null)
                return BadRequest("Operacioni not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Operacioni>>> AddOperacioni(Operacioni i)
        {
            _dataContext.Operacionis.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Operacionis.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Operacioni>>> UpdateOperacioni(Operacioni request)
        {
            var dbOperacioni = await _dataContext.Operacionis.FindAsync(request.IdOperacioni);
            if (dbOperacioni == null)
                return BadRequest("Operacioni not found!");

            dbOperacioni.IdOperacioni = request.IdOperacioni;
            dbOperacioni.IdUserMjekuKryesor = request.IdUserMjekuKryesor;
            dbOperacioni.IdPacienti = request.IdPacienti;
            dbOperacioni.SallaNr = request.SallaNr;
            dbOperacioni.Data = request.Data;
            dbOperacioni.Ora = request.Ora;


            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Operacionis.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Operacioni>>> Delete(string id)
        {
            var dbOperacioni = await _dataContext.Operacionis.FindAsync(id);
            if (dbOperacioni == null)
                return BadRequest("Operacioni not found!");

            _dataContext.Operacionis.Remove(dbOperacioni);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Operacionis.ToListAsync());
        }


    }
}