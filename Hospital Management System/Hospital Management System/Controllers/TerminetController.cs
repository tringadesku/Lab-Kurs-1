﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TerminetController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public TerminetController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Terminet>>> Get()
        {
            return Ok(await _dataContext.Terminets.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Terminet>> Get(string id)
        {
            var i = await _dataContext.Terminets.FindAsync(id);
            if (i == null)
                return BadRequest("Termini not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Terminet>>> AddTerminet(Terminet i)
        {
            _dataContext.Terminets.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Terminets.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Terminet>>> UpdateTerminet(Terminet request)
        {
            var dbTerminet = await _dataContext.Terminets.FindAsync(request.IdTermini);
            if (dbTerminet == null)
                return BadRequest("Termini not found!");

            dbTerminet.IdTermini = request.IdTermini;
            dbTerminet.IdMjeku = request.IdMjeku;
            dbTerminet.IdPacienti = request.IdPacienti;
            dbTerminet.Data = request.Data;
            dbTerminet.Ora = request.Ora;
            dbTerminet.Lloji = request.Lloji;


            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Terminets.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Terminet>>> Delete(string id)
        {
            var dbTerminet = await _dataContext.Terminets.FindAsync(id);
            if (dbTerminet == null)
                return BadRequest("Termini not found!");

            _dataContext.Terminets.Remove(dbTerminet);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Terminets.ToListAsync());
        }


    }
}