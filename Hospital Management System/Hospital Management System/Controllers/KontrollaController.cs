using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Mjek")]
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
        public async Task<ActionResult<Kontrolla>> Get(string id)
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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = i.IdKontrolla,
                Activity = "created Kontrolla",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Kontrollas.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Kontrolla>>> UpdateKontrolla(Kontrolla request)
        {
            var dbKontrolla = await _dataContext.Kontrollas.FindAsync(request.IdKontrolla);
            if (dbKontrolla == null)
                return BadRequest("Kontrolla not found!");
           
            dbKontrolla.IdKontrolla = request.IdKontrolla;
            dbKontrolla.IdUserMjeku = request.IdUserMjeku;
            dbKontrolla.IdPacienti = request.IdPacienti;
            dbKontrolla.Diagnoza = request.Diagnoza;
            dbKontrolla.Pershkrimi = request.Pershkrimi;
            dbKontrolla.Receta = request.Receta;


            await _dataContext.SaveChangesAsync();


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = request.IdKontrolla,
                Activity = "edited Kontrolla",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Kontrollas.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Kontrolla>>> Delete(string id)
        {
            var dbKontrolla = await _dataContext.Kontrollas.FindAsync(id);
            if (dbKontrolla == null)
                return BadRequest("Kontrolla not found!");

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = dbKontrolla.IdKontrolla,
                Activity = "deleted Kontrolla",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);

            _dataContext.Kontrollas.Remove(dbKontrolla);
            await _dataContext.SaveChangesAsync();

            await ak.AddActivity(aktiviteti);
            return Ok(await _dataContext.Kontrollas.ToListAsync());
        }


    }
}