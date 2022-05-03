using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfuzionetController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public InfuzionetController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Infuzionet>>> Get()
        {
            return Ok(await _dataContext.Infuzionets.ToListAsync());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Infuzionet>> Get(int id)
        {
            var i = await _dataContext.Infuzionets.FindAsync(id);
            if (i == null)
                return BadRequest("Infuzioni not found!");
            return Ok(i);
        }


        [HttpPost]
        public async Task<ActionResult<List<Infuzionet>>> AddInfuzioni(Infuzionet i)
        {
            _dataContext.Infuzionets.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Infuzionets.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateHero(User request)
        {
            var dbUser = await _dataContext.Users.FindAsync(request.IdUser);
            if (dbUser == null)
                return BadRequest("User not found!");

            dbUser.IdUser = request.IdUser;
            dbUser.Emri = request.Emri;
            dbUser.Mbiemri = request.Mbiemri;
            dbUser.Pozita = request.Pozita;
            dbUser.Email = request.Email;
            dbUser.Password = request.Password;
            dbUser.Nrtelefonit = request.Nrtelefonit;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            var dbUser = await _dataContext.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found!");

            _dataContext.Users.Remove(dbUser);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Users.ToListAsync());
        }
    }
}
