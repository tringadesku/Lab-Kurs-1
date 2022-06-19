using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityLogUserController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public ActivityLogUserController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActivityLogUser>>> Get()
        {
            return Ok(await _dataContext.ActivityLogUsers.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityLogUser>> Get(string id)
        {
            var i = await _dataContext.ActivityLogUsers.FindAsync(id);
            if (i == null)
                return BadRequest("ActivityLogUser not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<ActivityLogUser>>> AddActivityLogUser(ActivityLogUser i)
        {
            _dataContext.ActivityLogUsers.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.ActivityLogUsers.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<ActivityLogUser>>> UpdateActivityLogUser(ActivityLogUser request)
        {
            var dbActivityLogUser = await _dataContext.ActivityLogUsers.FindAsync(request.Id);
            if (dbActivityLogUser == null)
                return BadRequest("ActivityLogUser not found!");

            dbActivityLogUser.Id = request.Id;
            dbActivityLogUser.IdUserAdmin = request.IdUserAdmin;
            dbActivityLogUser.Activity = request.Activity;
            dbActivityLogUser.Ora = request.Ora;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.ActivityLogUsers.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ActivityLogUser>>> Delete(string id)
        {
            var dbActivityLogUser = await _dataContext.ActivityLogUsers.FindAsync(id);
            if (dbActivityLogUser == null)
                return BadRequest("ActivityLogUser not found!");

            _dataContext.ActivityLogUsers.Remove(dbActivityLogUser);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.ActivityLogUsers.ToListAsync());
        }


    }
}