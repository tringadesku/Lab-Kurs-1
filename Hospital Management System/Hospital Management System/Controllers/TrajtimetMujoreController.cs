﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Recepsionist,Mjek")]
    public class TrajtimetMujoreController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public TrajtimetMujoreController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<TrajtimetMujore>>> Get()
        {
            return Ok(await _dataContext.TrajtimetMujores.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TrajtimetMujore>> Get(int id)
        {
            var i = await _dataContext.TrajtimetMujores.FindAsync(id);
            if (i == null)
                return BadRequest("Trajtimi not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<TrajtimetMujore>>> AddTrajtimetMujore(TrajtimetMujore i)
        {
            _dataContext.TrajtimetMujores.Add(i);
            await _dataContext.SaveChangesAsync();


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = i.Lloji,
                Activity = "created Trajtimi Mujor",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.TrajtimetMujores.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<TrajtimetMujore>>> UpdateTrajtimetMujore(TrajtimetMujore request)
        {
            var dbTrajtimetMujore = await _dataContext.TrajtimetMujores.FindAsync(request.NrT);
            if (dbTrajtimetMujore == null)
                return BadRequest("Trajtimi not found!");

            dbTrajtimetMujore.NrT = request.NrT;
            dbTrajtimetMujore.IdPacienti = request.IdPacienti;
            dbTrajtimetMujore.DataFillimit = request.DataFillimit;
            dbTrajtimetMujore.DataMbarimit = request.DataMbarimit;
            dbTrajtimetMujore.Lloji = request.Lloji;


            await _dataContext.SaveChangesAsync();


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbTrajtimetMujore.NrT),
                Activity = "edited Trajtimi Mujor",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.TrajtimetMujores.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<TrajtimetMujore>>> Delete(int id)
        {
            var dbTrajtimetMujore = await _dataContext.TrajtimetMujores.FindAsync(id);
            if (dbTrajtimetMujore == null)
                return BadRequest("Trajtimi not found!");


            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbTrajtimetMujore.NrT),
                Activity = "deleted Operacioni",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            _dataContext.TrajtimetMujores.Remove(dbTrajtimetMujore);
            await _dataContext.SaveChangesAsync();


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.TrajtimetMujores.ToListAsync());
        }


    }
}