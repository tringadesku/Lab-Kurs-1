using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Mjek")]
    public class PraktikantiController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public PraktikantiController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Praktikanti>>> Get()
        {
            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Praktikanti>> Get(int id)
        {
            var i = await _dataContext.Praktikantis.FindAsync(id);
            if (i == null)
                return BadRequest("Praktikanti not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<Praktikanti>>> AddPraktikanti(Praktikanti i)
        {
            _dataContext.Praktikantis.Add(i);
            await _dataContext.SaveChangesAsync();


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(i.IdPraktikanti),
                Activity = "created Praktikanti",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Praktikanti>>> UpdatePraktikanti(Praktikanti request)
        {
            var dbPraktikanti = await _dataContext.Praktikantis.FindAsync(request.IdPraktikanti);
            if (dbPraktikanti == null)
                return BadRequest("Praktikanti not found!");

            dbPraktikanti.IdPraktikanti = request.IdPraktikanti;
            dbPraktikanti.EmriPr = request.EmriPr;
            dbPraktikanti.MbiemriPr = request.MbiemriPr;
            dbPraktikanti.MjekuMbikqyres = request.MjekuMbikqyres;
            dbPraktikanti.DataFillimit = request.DataFillimit;
            dbPraktikanti.DataPerfundimit = request.DataPerfundimit;
            dbPraktikanti.Oret = request.Oret;
            dbPraktikanti.Aprovimi = request.Aprovimi;

            await _dataContext.SaveChangesAsync();


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbPraktikanti.IdPraktikanti),
                Activity = "edited Praktikanti",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Praktikanti>>> Delete(int id)
        {
            var dbPraktikanti = await _dataContext.Praktikantis.FindAsync(id);
            if (dbPraktikanti == null)
                return BadRequest("Praktikanti not found!");

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbPraktikanti.IdPraktikanti),
                Activity = "deleted Praktikanti",
                Ora = DateTime.Now
            };

            _dataContext.Praktikantis.Remove(dbPraktikanti);
            await _dataContext.SaveChangesAsync();

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Praktikantis.ToListAsync());
        }


    }



}
