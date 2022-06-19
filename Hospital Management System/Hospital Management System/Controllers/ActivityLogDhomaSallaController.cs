using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityLogDhomaSallaController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public ActivityLogDhomaSallaController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActivityLogDhomaSalla>>> Get()
        {
            return Ok(await _dataContext.ActivityLogDhomaSallas.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityLogDhomaSalla>> Get(string id)
        {
            var i = await _dataContext.ActivityLogDhomaSallas.FindAsync(id);
            if (i == null)
                return BadRequest("ActivityLogDhomaSalla not found!");
            return Ok(i);
        }

        [HttpPost]
        public async Task<ActionResult<List<ActivityLogDhomaSalla>>> AddActivityLogDhomaSalla(ActivityLogDhomaSalla i)
        {
            _dataContext.ActivityLogDhomaSallas.Add(i);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.ActivityLogDhomaSallas.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<ActivityLogDhomaSalla>>> UpdateActivityLogDhomaSalla(ActivityLogDhomaSalla request)
        {
            var dbActivityLogDhomaSalla = await _dataContext.ActivityLogDhomaSallas.FindAsync(request.Id);
            if (dbActivityLogDhomaSalla == null)
                return BadRequest("ActivityLogDhomaSalla not found!");

            dbActivityLogDhomaSalla.Id = request.Id;
            dbActivityLogDhomaSalla.IdUserAdmin = request.IdUserAdmin;
            dbActivityLogDhomaSalla.Activity = request.Activity;
            dbActivityLogDhomaSalla.Ora = request.Ora;
           
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.ActivityLogDhomaSallas.ToListAsync());
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ActivityLogDhomaSalla>>> Delete(string id)
        {
            var dbActivityLogDhomaSalla = await _dataContext.ActivityLogDhomaSallas.FindAsync(id);
            if (dbActivityLogDhomaSalla == null)
                return BadRequest("ActivityLogDhomaSalla not found!");

            _dataContext.ActivityLogDhomaSallas.Remove(dbActivityLogDhomaSalla);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.ActivityLogDhomaSallas.ToListAsync());
        }


    }
}