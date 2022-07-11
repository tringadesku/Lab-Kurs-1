using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DhomaController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public DhomaController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Dhoma>>> Get()
        {
            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dhoma>> Get(String id)
        {
            var dh = await _dataContext.Dhomas.FindAsync(id);
            if (dh == null)
                return BadRequest("Dhoma not found!");
            return Ok(dh);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<Dhoma>>> AddDhoma(Dhoma dh)
        {
            _dataContext.Dhomas.Add(dh);
            await _dataContext.SaveChangesAsync();

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = dh.RoomNr,
                Activity = "created Room",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

        [HttpPut]
        [Authorize(Roles = "Admin,Infermier")]
        public async Task<ActionResult<List<Dhoma>>> UpdateDhoma(Dhoma request)
        {
            var dbDhoma = await _dataContext.Dhomas.FindAsync(request.RoomNr);
            if (dbDhoma == null)
                return BadRequest("Dhoma not found!");

            dbDhoma.RoomNr = request.RoomNr;
            dbDhoma.NrPacientave = request.NrPacientave;

            await _dataContext.SaveChangesAsync();

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;

            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = request.RoomNr,
                Activity = "edited Room",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<Dhoma>>> Delete(string id)
        {
            var dbDhoma = await _dataContext.Dhomas.FindAsync(id);
            if (dbDhoma == null)
                return BadRequest("Dhoma not found!");

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = dbDhoma.RoomNr,
                Activity = "deleted Room",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);

            _dataContext.Dhomas.Remove(dbDhoma);

            
            await _dataContext.SaveChangesAsync();
            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Dhomas.ToListAsync());
        }

    }
}
