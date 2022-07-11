using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiveStaffController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public ActiveStaffController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActiveStaff>>> Get()
        {
            return Ok(await _dataContext.ActiveStaffs.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<ActiveStaff>>> AddActiveStaff(ActiveStaff a)
        {
            _dataContext.ActiveStaffs.Add(a);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.ActiveStaffs.ToListAsync());
        }


        [HttpDelete("{UseriId}")]
        public async Task<ActionResult<List<ActiveStaff>>> Delete(String UseriId)
        {
            var staffUser = await _dataContext.ActiveStaffs.Where(a => a.UseriId == UseriId).FirstOrDefaultAsync();
            if (staffUser == null)
                return BadRequest("Staff User not found!");

            _dataContext.ActiveStaffs.Remove(staffUser);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.ActiveStaffs.ToListAsync());
        }

    }
}
