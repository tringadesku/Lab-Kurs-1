using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmbulancaController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public AmbulancaController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ambulanca>>> Get()
        {
            return Ok(await _dataContext.Ambulancas.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ambulanca>> Get(int id)
        {
            var i = await _dataContext.Ambulancas.FindAsync(id);
            if (i == null)
                return BadRequest("Ambulanca not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Ambulanca>>> AddAmbulanca(Ambulanca i)
        {
            _dataContext.Ambulancas.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Ambulancas.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Ambulanca>>> UpdateAmbulanca(Ambulanca request)
        {
            var dbAmbulanca = await _dataContext.Ambulancas.FindAsync(request.NrAuto);
            if (dbAmbulanca == null)
                return BadRequest("Ambulanca not found!");

            dbAmbulanca.NrAuto = request.NrAuto;
            dbAmbulanca.IdUserMjekuLider = request.IdUserMjekuLider;
            dbAmbulanca.Lokacioni = request.Lokacioni;
            dbAmbulanca.Statusi = request.Statusi;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Ambulancas.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Ambulanca>>> Delete(int id)
        {
            var dbAmbulanca = await _dataContext.Ambulancas.FindAsync(id);
            if (dbAmbulanca == null)
                return BadRequest("Ambulanca not found!");

            _dataContext.Ambulancas.Remove(dbAmbulanca);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Ambulancas.ToListAsync());
        }


    }



}
