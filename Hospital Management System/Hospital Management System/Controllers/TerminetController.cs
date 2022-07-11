using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Recepsionist,Mjek")]
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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = i.IdTermini,
                Activity = "created Termini",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = dbTerminet.IdTermini,
                Activity = "edited Termini",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Terminets.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Terminet>>> Delete(string id)
        {
            var dbTerminet = await _dataContext.Terminets.FindAsync(id);
            if (dbTerminet == null)
                return BadRequest("Termini not found!");

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = dbTerminet.IdTermini,
                Activity = "deleted Termini",
                Ora = DateTime.Now
            };

            _dataContext.Terminets.Remove(dbTerminet);
            await _dataContext.SaveChangesAsync();

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Terminets.ToListAsync());
        }


    }
}