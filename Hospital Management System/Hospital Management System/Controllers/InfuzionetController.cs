using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Infermier,Mjek")]
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


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = i.Lloji,
                Activity = "created Infuzioni",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Infuzionets.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Infuzionet>>> UpdateInfuzionet(Infuzionet request)
        {
            var dbInfuzioni = await _dataContext.Infuzionets.FindAsync(request.Id);
            if (dbInfuzioni == null)
                return BadRequest("Infuzioni not found!");

            dbInfuzioni.Id = request.Id;
            dbInfuzioni.IdInfermieri = request.IdInfermieri;
            dbInfuzioni.IdPacienti = request.IdPacienti;
            dbInfuzioni.Lloji = request.Lloji;
            dbInfuzioni.Ora = request.Ora;

            await _dataContext.SaveChangesAsync();


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(request.Id),
                Activity = "edited Infuzioni",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Infuzionets.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Infuzionet>>> Delete(int id)
        {
            var dbInfuzioni = await _dataContext.Infuzionets.FindAsync(id);
            if (dbInfuzioni == null)
                return BadRequest("Infuzioni not found!");


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbInfuzioni.Id),
                Activity = "deleted Infuzioni",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);

            await ak.AddActivity(aktiviteti);

            _dataContext.Infuzionets.Remove(dbInfuzioni);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Infuzionets.ToListAsync());
        }
    }
}
