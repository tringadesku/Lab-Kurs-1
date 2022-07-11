using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Laborant,Mjek")]
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
        public async Task<ActionResult<Laboratori>> Get(int id)
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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = i.Lloji,
                Activity = "created Analiza",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(request.NrAnalizes),
                Activity = "edited Analiza",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Laboratoris.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Laboratori>>> Delete(string id)
        {
            var dbLaboratori = await _dataContext.Laboratoris.FindAsync(id);
            if (dbLaboratori == null)
                return BadRequest("Laboratori not found!");


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbLaboratori.NrAnalizes),
                Activity = "deleted Analiza",
                Ora = DateTime.Now
            };

            _dataContext.Laboratoris.Remove(dbLaboratori);
            await _dataContext.SaveChangesAsync();

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Laboratoris.ToListAsync());
        }


    }
}