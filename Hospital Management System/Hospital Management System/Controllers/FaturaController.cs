using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Recepsionist")]
    public class FaturaController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public FaturaController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Fatura>>> Get()
        {
            return Ok(await _dataContext.Faturas.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fatura>> Get(int id)
        {
            var i = await _dataContext.Faturas.FindAsync(id);
            if (i == null)
                return BadRequest("Fatura not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Fatura>>> AddFatura(Fatura i)
        {
            _dataContext.Faturas.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Faturas.ToListAsync());


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = i.Pershkrimi,
                Activity = "created Fatura",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);
        }

        [HttpPut]
        public async Task<ActionResult<List<Fatura>>> UpdateFatura(Fatura request)
        {
            var dbFatura = await _dataContext.Faturas.FindAsync(request.IdFatura);
            if (dbFatura == null)
                return BadRequest("Fatura not found!");

            dbFatura.IdFatura = request.IdFatura;
            dbFatura.IdUserRecepsionisti = request.IdUserRecepsionisti;
            dbFatura.IdPacienti = request.IdPacienti;
            dbFatura.Pershkrimi = request.Pershkrimi;
            dbFatura.Data = request.Data;
            dbFatura.PagesaTotale = request.PagesaTotale;
            dbFatura.Statusi = request.Statusi;

            await _dataContext.SaveChangesAsync();

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbFatura.IdFatura),
                Activity = "edited Fatura",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Faturas.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Fatura>>> Delete(int id)
        {
            var dbFatura = await _dataContext.Faturas.FindAsync(id);
            if (dbFatura == null)
                return BadRequest("Fatura not found!");


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbFatura.IdFatura),
                Activity = "deleted Fatura",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);

            _dataContext.Faturas.Remove(dbFatura);
            await _dataContext.SaveChangesAsync();


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Faturas.ToListAsync());
        }


    }
}
