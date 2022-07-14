using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        public async Task<ActionResult<ActivityLogUser>> Get(int id)
        {
            var activity = await _dataContext.ActivityLogUsers.FindAsync(id);
            if (activity == null)
                return BadRequest("Activity not found!");
            return Ok(activity);
        }


        [HttpPost]
        public async Task<ActionResult<List<ActivityLogUser>>> AddActivity(ActivityLogUser activity)
        {
            _dataContext.ActivityLogUsers.Add(activity);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.ActivityLogUsers.ToListAsync());
        }


    }
}
