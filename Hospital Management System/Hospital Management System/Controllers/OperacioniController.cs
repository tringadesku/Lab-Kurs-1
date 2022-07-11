using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Recepsionist,Mjek")]
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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = i.IdOperacioni,
                Activity = "created Operacioni",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = dbOperacioni.IdOperacioni,
                Activity = "edited Operacioni",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Operacionis.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Operacioni>>> Delete(string id)
        {
            var dbOperacioni = await _dataContext.Operacionis.FindAsync(id);
            if (dbOperacioni == null)
                return BadRequest("Operacioni not found!");


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = dbOperacioni.IdOperacioni,
                Activity = "deleted Operacioni",
                Ora = DateTime.Now
            };


            _dataContext.Operacionis.Remove(dbOperacioni);
            await _dataContext.SaveChangesAsync();

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Operacionis.ToListAsync());
        }


    }
}